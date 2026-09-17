"""
WebMCP server for lanos-logic.com
Implements MCP Streamable HTTP transport (JSON-RPC 2.0)
"""

import json
import time
import threading
from collections import defaultdict
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------
DATA_FILE = Path(__file__).parent / "data.json"
with DATA_FILE.open() as f:
    _data = json.load(f)

SERVICES: list = _data["services"]
INDUSTRIES: list = _data["industries"]
TEAM: list = _data["teamMembers"]
COMPANY_STATS: list = _data["companyStats"]
BLOG_POSTS: list = _data["blogPosts"]
ALL_CASE_STUDIES: list = _data["allCaseStudies"]

MAKE_WEBHOOK = "https://hook.eu1.make.com/5nucde579kgh4uug9f5g37yde6ms64jx"
BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/EMs6NlYokvHW7xJWUimR"
SITE_URL = "https://lanos-logic.com"

COMPANY_INFO = {
    "name": "Lanos Logic",
    "tagline": "Strategic AI Solutions for Modern Businesses",
    "founded": "2019",
    "locations": ["Chicago, IL, USA", "United Kingdom"],
    "contact": {
        "email": "hello@lanos-logic.com",
        "phone": "+1 (518) 864 3528",
        "website": SITE_URL,
    },
    "tech_stack": [
        "Claude AI", "Make.com", "AirTable", "GoHighLevel",
        "Twilio", "VectorShift", "VAPI", "Flutter", "Stripe",
    ],
    "stats": COMPANY_STATS,
    "team": TEAM,
    "process": [
        {"step": 1, "title": "Analyze", "description": "Blueprint business processes using BPMN and documentation."},
        {"step": 2, "title": "Prepare", "description": "Refine and align processes with future-state BA planning."},
        {"step": 3, "title": "Implement", "description": "Deploy automations that deliver results immediately."},
    ],
}

# ---------------------------------------------------------------------------
# Rate limiter (in-memory, per-IP sliding window)
# ---------------------------------------------------------------------------
class RateLimiter:
    def __init__(self):
        self._lock = threading.Lock()
        # ip -> list of timestamps
        self._read_log: dict[str, list[float]] = defaultdict(list)
        self._inquiry_log: dict[str, list[float]] = defaultdict(list)

    def _prune(self, log: list[float], window: float) -> list[float]:
        cutoff = time.time() - window
        return [t for t in log if t > cutoff]

    def allow_read(self, ip: str) -> bool:
        """60 req/min per IP for read tools."""
        with self._lock:
            log = self._prune(self._read_log[ip], 60)
            if len(log) >= 60:
                return False
            log.append(time.time())
            self._read_log[ip] = log
            return True

    def allow_inquiry(self, ip: str) -> bool:
        """5 req/min per IP for submit_inquiry."""
        with self._lock:
            log = self._prune(self._inquiry_log[ip], 60)
            if len(log) >= 5:
                return False
            log.append(time.time())
            self._inquiry_log[ip] = log
            return True

limiter = RateLimiter()

# ---------------------------------------------------------------------------
# MCP Tool definitions
# ---------------------------------------------------------------------------
TOOLS = [
    {
        "name": "list_services",
        "description": "List all AI automation services offered by Lanos Logic with descriptions and key features.",
        "inputSchema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_service",
        "description": "Get detailed information about a specific Lanos Logic service including benefits and features.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "service_id": {
                    "type": "string",
                    "description": "Service ID (e.g. 'ai-agents', 'vector-database-solutions', 'voice-ai-agents')",
                }
            },
            "required": ["service_id"],
        },
    },
    {
        "name": "list_case_studies",
        "description": (
            "Browse Lanos Logic case studies. Filter by industry category, platform, country, or type. "
            "Returns up to 20 results sorted by hours saved."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "description": "Filter by industry category (e.g. 'Healthcare', 'Legal', 'Marketing', 'SaaS', 'E-commerce')",
                },
                "platform": {
                    "type": "string",
                    "description": "Filter by platform used (e.g. 'AirTable', 'Make.com', 'Twilio', 'VectorShift')",
                },
                "country": {
                    "type": "string",
                    "description": "Filter by client country (e.g. 'United States', 'United Kingdom', 'Latvia')",
                },
                "type": {
                    "type": "string",
                    "enum": ["Low-Code", "AI"],
                    "description": "Filter by implementation type",
                },
                "limit": {
                    "type": "integer",
                    "description": "Max results to return (default 10, max 20)",
                    "default": 10,
                },
            },
            "required": [],
        },
    },
    {
        "name": "get_case_study",
        "description": "Get full details of a specific case study including results, platforms used, and solution description.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "case_study_id": {
                    "type": "string",
                    "description": "Case study ID from list_case_studies results",
                }
            },
            "required": ["case_study_id"],
        },
    },
    {
        "name": "list_industries",
        "description": "List all industries Lanos Logic serves with descriptions and key outcomes for each.",
        "inputSchema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_company_info",
        "description": (
            "Get Lanos Logic company information: team members, contact details, technology stack, "
            "company stats, and engagement process."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "section": {
                    "type": "string",
                    "enum": ["all", "team", "contact", "stats", "tech_stack", "process"],
                    "description": "Which section to return (default: all)",
                    "default": "all",
                }
            },
            "required": [],
        },
    },
    {
        "name": "submit_inquiry",
        "description": (
            "Submit a contact inquiry to Lanos Logic. Use this when a user wants to get in touch, "
            "request a consultation, or ask about services. Requires name, email, and message."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Full name"},
                "email": {"type": "string", "description": "Email address"},
                "company": {"type": "string", "description": "Company name (optional)"},
                "service": {"type": "string", "description": "Service of interest (optional)"},
                "message": {"type": "string", "description": "Message or inquiry details"},
            },
            "required": ["name", "email", "message"],
        },
    },
]

# ---------------------------------------------------------------------------
# Tool handlers
# ---------------------------------------------------------------------------
def handle_list_services(_args: dict) -> dict:
    results = [
        {
            "id": s["id"],
            "name": s["name"],
            "description": s["shortDescription"],
            "features": s.get("features", []),
            "url": f"{SITE_URL}/services/{s['id']}",
        }
        for s in SERVICES
    ]
    return {"services": results, "total": len(results)}


def handle_get_service(args: dict) -> dict:
    sid = args.get("service_id", "").strip()
    for s in SERVICES:
        if s["id"] == sid:
            return {
                "id": s["id"],
                "name": s["name"],
                "description": s["shortDescription"],
                "features": s.get("features", []),
                "benefits": s.get("benefits", []),
                "url": f"{SITE_URL}/services/{s['id']}",
            }
    return {"error": f"Service '{sid}' not found. Use list_services to see available IDs."}


def handle_list_case_studies(args: dict) -> dict:
    category = (args.get("category") or "").lower()
    platform = (args.get("platform") or "").lower()
    country = (args.get("country") or "").lower()
    type_filter = (args.get("type") or "").lower()
    limit = min(int(args.get("limit") or 10), 20)

    results = []
    for cs in ALL_CASE_STUDIES:
        if category and category not in (cs.get("category") or "").lower():
            continue
        if platform and not any(platform in (p or "").lower() for p in cs.get("platforms") or []):
            continue
        if country and country not in (cs.get("country") or "").lower():
            continue
        if type_filter and type_filter not in (cs.get("type") or "").lower():
            continue
        results.append({
            "id": cs["id"],
            "title": cs["title"],
            "category": cs.get("category"),
            "country": cs.get("country"),
            "year": cs.get("year"),
            "type": cs.get("type"),
            "description": cs.get("description"),
            "stats": cs.get("stats", []),
            "tags": cs.get("tags", []),
            "platforms": cs.get("platforms", []),
            "monthly_hours_saved": cs.get("monthlyHoursSaved"),
            "url": cs.get("href"),
        })

    # Sort by monthly hours saved (descending), nulls last
    results.sort(key=lambda x: x.get("monthly_hours_saved") or 0, reverse=True)
    results = results[:limit]
    return {"case_studies": results, "total": len(results), "filtered": bool(category or platform or country or type_filter)}


def handle_get_case_study(args: dict) -> dict:
    csid = args.get("case_study_id", "").strip()
    for cs in ALL_CASE_STUDIES:
        if cs["id"] == csid:
            return {
                "id": cs["id"],
                "title": cs["title"],
                "category": cs.get("category"),
                "vertical": cs.get("vertical"),
                "type": cs.get("type"),
                "description": cs.get("description"),
                "solution": cs.get("textContent"),
                "stats": cs.get("stats", []),
                "tags": cs.get("tags", []),
                "platforms": cs.get("platforms", []),
                "country": cs.get("country"),
                "year": cs.get("year"),
                "days_to_complete": cs.get("daysToComplete"),
                "monthly_hours_saved": cs.get("monthlyHoursSaved"),
                "url": cs.get("href"),
            }
    return {"error": f"Case study '{csid}' not found. Use list_case_studies to browse available IDs."}


def handle_list_industries(_args: dict) -> dict:
    results = [
        {
            "id": i["id"],
            "name": i["name"],
            "description": i["description"],
            "key_outcomes": i.get("stats", []),
            "url": f"{SITE_URL}{i['href']}",
        }
        for i in INDUSTRIES
    ]
    return {"industries": results, "total": len(results)}


def handle_get_company_info(args: dict) -> dict:
    section = (args.get("section") or "all").lower()
    info = COMPANY_INFO
    if section == "all":
        return info
    if section == "team":
        return {"team": info["team"]}
    if section == "contact":
        return {"contact": info["contact"], "locations": info["locations"]}
    if section == "stats":
        return {"stats": info["stats"], "founded": info["founded"]}
    if section == "tech_stack":
        return {"tech_stack": info["tech_stack"]}
    if section == "process":
        return {"process": info["process"]}
    return info


async def handle_submit_inquiry(args: dict, client_ip: str) -> dict:
    if not limiter.allow_inquiry(client_ip):
        return {"error": "Rate limit exceeded. Max 5 inquiries per minute per IP. Please try again shortly."}

    name = (args.get("name") or "").strip()
    email = (args.get("email") or "").strip()
    message = (args.get("message") or "").strip()

    if not name or not email or not message:
        return {"error": "name, email, and message are required fields."}
    if "@" not in email or "." not in email:
        return {"error": "Invalid email address."}
    if len(message) < 10:
        return {"error": "Message is too short. Please provide more detail."}

    payload = {
        "type": "contact_form",
        "name": name,
        "email": email,
        "company": (args.get("company") or "").strip(),
        "service": (args.get("service") or "").strip(),
        "message": message,
        "source": "lanos-logic-mcp",
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(MAKE_WEBHOOK, json=payload)
            resp.raise_for_status()
        return {
            "success": True,
            "message": (
                f"Your inquiry has been submitted successfully. "
                f"The Lanos Logic team will contact you at {email} within 24 hours. "
                f"You can also book a discovery call directly at {BOOKING_URL}"
            ),
        }
    except Exception as exc:
        return {"error": f"Failed to submit inquiry: {exc}. Please email hello@lanos-logic.com directly."}


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(title="Lanos Logic MCP Server", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

# ---------------------------------------------------------------------------
# Protocol versions
#
# This is a "dual-era" server in the sense of the 2026-07-28 spec: it serves
# both modern clients (which declare their protocol version in per-request
# `_meta` and the MCP-Protocol-Version header) and legacy clients (which open
# with an `initialize` handshake). Serving both matters commercially — the
# connectors shipping in ChatGPT and Claude today are largely still on the
# 2025-x handshake, and dropping them to look current would be a bad trade.
#
# A request is modern if it carries io.modelcontextprotocol/protocolVersion in
# params._meta, or is server/discover. Everything else is treated as legacy.
# ---------------------------------------------------------------------------
MODERN_VERSION = "2026-07-28"
LEGACY_PREFERRED = "2025-06-18"
SUPPORTED_VERSIONS = [
    "2026-07-28",  # modern: per-request metadata, server/discover
    "2025-11-25",
    "2025-06-18",
    "2025-03-26",  # Streamable HTTP introduced
    "2024-11-05",  # HTTP+SSE era; kept so existing integrations keep working
]
SERVER_INFO = {"name": "lanos-logic-mcp", "version": "1.0.0"}

META_VERSION_KEY = "io.modelcontextprotocol/protocolVersion"
META_SERVER_INFO_KEY = "io.modelcontextprotocol/serverInfo"

# Error codes from the MCP-reserved sub-range.
ERR_HEADER_MISMATCH = -32020
ERR_UNSUPPORTED_PROTOCOL_VERSION = -32022
ERR_METHOD_NOT_FOUND = -32601

SERVER_INSTRUCTIONS = (
    "Lanos Logic is an AI automation company (Chicago IL + UK). Use these tools to "
    "browse its services, real client case studies, and the industries it serves, "
    "or to submit a contact inquiry. Every figure returned by these tools is "
    "attached to a named engagement."
)

# Sessions were removed in 2026-07-28 and were always optional before it. This
# server is stateless: it never mints Mcp-Session-Id, and per the spec it
# ignores Mcp-Session-Id and Last-Event-ID if an older client sends them.


def _decode_header_value(value: str) -> str:
    """Decode the Base64 sentinel form `=?base64?<b64>?=` used for header values
    that cannot be represented as plain ASCII. Returns the value unchanged when
    it is not in sentinel form."""
    if value.startswith("=?base64?") and value.endswith("?="):
        import base64
        try:
            return base64.b64decode(value[len("=?base64?"):-len("?=")]).decode("utf-8")
        except Exception:
            return value
    return value


def mcp_error(id_: Any, code: int, message: str) -> dict:
    return {"jsonrpc": "2.0", "id": id_, "error": {"code": code, "message": message}}


def mcp_result(id_: Any, result: Any) -> dict:
    return {"jsonrpc": "2.0", "id": id_, "result": result}


@app.get("/mcp")
async def mcp_get():
    """The 2026-07-28 revision removed the GET stream endpoint, and this server
    never supported server-initiated streams anyway, so GET is 405 per spec.
    The body still carries the discovery details, which costs nothing and is
    friendlier than an empty error to anyone poking at the endpoint by hand."""
    return JSONResponse(
        {
            "name": SERVER_INFO["name"],
            "version": SERVER_INFO["version"],
            "supportedVersions": SUPPORTED_VERSIONS,
            "tools": len(TOOLS),
            "hint": "POST JSON-RPC to this endpoint; call server/discover for capabilities.",
        },
        status_code=405,
        headers={"Allow": "POST"},
    )


@app.delete("/mcp")
async def mcp_delete():
    """DELETE terminated a session in the 2025-x revisions. This server is
    stateless and mints no sessions, so there is nothing to terminate."""
    return JSONResponse(
        {"error": "This server is stateless; there is no session to delete."},
        status_code=405,
        headers={"Allow": "POST"},
    )


def _tool_dispatch(tool_name: str, args: dict, client_ip: str):
    """Returns (result, error_message). Shared by both eras."""
    if tool_name == "list_services":
        return handle_list_services(args), None
    if tool_name == "get_service":
        return handle_get_service(args), None
    if tool_name == "list_case_studies":
        return handle_list_case_studies(args), None
    if tool_name == "get_case_study":
        return handle_get_case_study(args), None
    if tool_name == "list_industries":
        return handle_list_industries(args), None
    if tool_name == "get_company_info":
        return handle_get_company_info(args), None
    return None, f"Unknown tool: {tool_name}"


def _tool_content(result: Any) -> dict:
    return {"content": [{"type": "text", "text": json.dumps(result, ensure_ascii=False)}]}


@app.post("/mcp")
async def mcp_post(request: Request):
    client_ip = (
        request.headers.get("X-Real-IP")
        or request.headers.get("X-Forwarded-For", "unknown").split(",")[0].strip()
    )

    try:
        body = await request.json()
    except Exception:
        return JSONResponse(mcp_error(None, -32700, "Parse error"), status_code=400)

    # JSON-RPC batching was removed in 2025-06-18. Reject arrays explicitly
    # rather than letting `.get` raise and surface as a 500.
    if isinstance(body, list):
        return JSONResponse(
            mcp_error(None, -32600, "Batch requests are not supported by this protocol revision"),
            status_code=400,
        )
    if not isinstance(body, dict):
        return JSONResponse(mcp_error(None, -32600, "Invalid Request"), status_code=400)

    method = body.get("method", "")
    req_id = body.get("id")
    is_notification = "id" not in body
    params = body.get("params") or {}
    meta = params.get("_meta") or {}

    declared_version = meta.get(META_VERSION_KEY)
    header_version = request.headers.get("mcp-protocol-version")

    # --- era selection -----------------------------------------------------
    # Per-request metadata (or server/discover, which only exists in the modern
    # era) means modern. An `initialize` opening means legacy.
    is_modern = declared_version is not None or method == "server/discover"

    if is_modern:
        return await _handle_modern(
            request, body, method, req_id, is_notification, params, meta,
            declared_version, header_version, client_ip,
        )
    return await _handle_legacy(body, method, req_id, is_notification, params, client_ip)


async def _handle_modern(request, body, method, req_id, is_notification, params, meta,
                         declared_version, header_version, client_ip):
    """Protocol revision 2026-07-28: per-request version, mirrored headers,
    mandatory server/discover, no sessions."""

    def header_mismatch(msg: str):
        return JSONResponse(mcp_error(req_id, ERR_HEADER_MISMATCH, f"Header mismatch: {msg}"),
                            status_code=400)

    # 1. MCP-Protocol-Version must be present and must match the body.
    if not header_version:
        return header_mismatch("required header MCP-Protocol-Version is missing")
    if declared_version is None:
        return header_mismatch(
            f"MCP-Protocol-Version header '{header_version}' has no matching "
            f"{META_VERSION_KEY} in params._meta"
        )
    if header_version != declared_version:
        return header_mismatch(
            f"MCP-Protocol-Version header '{header_version}' does not match body value "
            f"'{declared_version}'"
        )

    # 2. Version must be one we implement. Checked before the remaining header
    #    rules so the client gets the actionable error it can retry on.
    if declared_version not in SUPPORTED_VERSIONS:
        return JSONResponse(
            {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": ERR_UNSUPPORTED_PROTOCOL_VERSION,
                    "message": "Unsupported protocol version",
                    "data": {"supported": SUPPORTED_VERSIONS, "requested": declared_version},
                },
            },
            status_code=400,
        )

    # 3. Mcp-Method mirrors `method`.
    header_method = request.headers.get("mcp-method")
    if not header_method:
        return header_mismatch("required header Mcp-Method is missing")
    if header_method != method:
        return header_mismatch(
            f"Mcp-Method header '{header_method}' does not match body method '{method}'"
        )

    # 4. Mcp-Name mirrors params.name / params.uri where the method has one.
    name_source = None
    if method == "tools/call":
        name_source = params.get("name")
    elif method == "resources/read":
        name_source = params.get("uri")
    elif method == "prompts/get":
        name_source = params.get("name")
    if name_source is not None:
        header_name = request.headers.get("mcp-name")
        if not header_name:
            return header_mismatch("required header Mcp-Name is missing")
        if _decode_header_value(header_name) != name_source:
            return header_mismatch(
                f"Mcp-Name header does not match body value '{name_source}'"
            )

    # --- server/discover: mandatory in this revision ------------------------
    if method == "server/discover":
        if is_notification:
            return Response(status_code=202)
        return JSONResponse(mcp_result(req_id, {
            "resultType": "complete",
            "supportedVersions": SUPPORTED_VERSIONS,
            "capabilities": {"tools": {}},
            "instructions": SERVER_INSTRUCTIONS,
            "ttlMs": 3600000,
            "cacheScope": "public",
            "_meta": {META_SERVER_INFO_KEY: SERVER_INFO},
        }))

    if method == "tools/list":
        if not limiter.allow_read(client_ip):
            return JSONResponse(mcp_error(req_id, -32000, "Rate limit exceeded (60 req/min)"),
                                status_code=429)
        if is_notification:
            return Response(status_code=202)
        return JSONResponse(mcp_result(req_id, {"tools": TOOLS}))

    if method == "tools/call":
        tool_name = params.get("name", "")
        args = params.get("arguments") or {}
        if tool_name != "submit_inquiry" and not limiter.allow_read(client_ip):
            return JSONResponse(mcp_error(req_id, -32000, "Rate limit exceeded (60 req/min)"),
                                status_code=429)
        if tool_name == "submit_inquiry":
            result = await handle_submit_inquiry(args, client_ip)
        else:
            result, err = _tool_dispatch(tool_name, args, client_ip)
            if err:
                return JSONResponse(mcp_error(req_id, ERR_METHOD_NOT_FOUND, err), status_code=404)
        if is_notification:
            return Response(status_code=202)
        return JSONResponse(mcp_result(req_id, _tool_content(result)))

    # A notification the server accepts but has nothing to answer.
    if is_notification:
        return Response(status_code=202)

    # Unknown method: 404 with -32601, which is what distinguishes a modern
    # server from a legacy one that simply does not host this endpoint.
    return JSONResponse(mcp_error(req_id, ERR_METHOD_NOT_FOUND, f"Method not found: {method}"),
                        status_code=404)


async def _handle_legacy(body, method, req_id, is_notification, params, client_ip):
    """Handshake-based revisions (2025-11-25 and earlier). Kept so the clients
    that are actually deployed today continue to work unchanged."""

    if method == "initialize":
        requested = params.get("protocolVersion")
        # Echo the client's version when we implement it, otherwise answer with
        # the legacy revision we prefer and let the client decide.
        negotiated = requested if requested in SUPPORTED_VERSIONS else LEGACY_PREFERRED
        return JSONResponse(mcp_result(req_id, {
            "protocolVersion": negotiated,
            "capabilities": {"tools": {}},
            "serverInfo": SERVER_INFO,
            "instructions": SERVER_INSTRUCTIONS,
        }))

    if method == "tools/list":
        if not limiter.allow_read(client_ip):
            return JSONResponse(mcp_error(req_id, -32000, "Rate limit exceeded (60 req/min)"),
                                status_code=429)
        return JSONResponse(mcp_result(req_id, {"tools": TOOLS}))

    if method == "tools/call":
        tool_name = params.get("name", "")
        args = params.get("arguments") or {}
        if tool_name != "submit_inquiry" and not limiter.allow_read(client_ip):
            return JSONResponse(mcp_error(req_id, -32000, "Rate limit exceeded (60 req/min)"),
                                status_code=429)
        if tool_name == "submit_inquiry":
            result = await handle_submit_inquiry(args, client_ip)
        else:
            result, err = _tool_dispatch(tool_name, args, client_ip)
            if err:
                return JSONResponse(mcp_error(req_id, ERR_METHOD_NOT_FOUND, err))
        return JSONResponse(mcp_result(req_id, _tool_content(result)))

    # Notifications carry no id and get 202 with no body.
    if is_notification or method.startswith("notifications/"):
        return Response(status_code=202)

    return JSONResponse(mcp_error(req_id, ERR_METHOD_NOT_FOUND, f"Method not found: {method}"),
                        status_code=404)


@app.get("/health")
async def health():
    return {"status": "ok", "services": len(SERVICES), "case_studies": len(ALL_CASE_STUDIES)}

# ---------------------------------------------------------------------------
# REST API — OpenAPI-compatible thin wrappers (for GPT Actions / OpenAPI agents)
# ---------------------------------------------------------------------------
from fastapi import Query
from pydantic import BaseModel


def _client_ip(request: Request) -> str:
    return (
        request.headers.get("X-Real-IP")
        or request.headers.get("X-Forwarded-For", "unknown").split(",")[0].strip()
    )


@app.get("/tools/services", tags=["Services"],
         summary="List all AI automation services")
async def rest_list_services(request: Request):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_list_services({}))


@app.get("/tools/services/{service_id}", tags=["Services"],
         summary="Get details for a specific service")
async def rest_get_service(service_id: str, request: Request):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_get_service({"service_id": service_id}))


@app.get("/tools/case-studies", tags=["Case Studies"],
         summary="Browse case studies with optional filters")
async def rest_list_case_studies(
    request: Request,
    category: str = Query(None, description="Industry category filter"),
    platform: str = Query(None, description="Platform/tool filter"),
    country: str = Query(None, description="Country filter"),
    limit: int = Query(10, ge=1, le=20, description="Max results"),
):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_list_case_studies({
        "category": category, "platform": platform,
        "country": country, "limit": limit,
    }))


@app.get("/tools/case-studies/{case_study_id}", tags=["Case Studies"],
         summary="Get full details of a specific case study")
async def rest_get_case_study(case_study_id: str, request: Request):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_get_case_study({"case_study_id": case_study_id}))


@app.get("/tools/industries", tags=["Industries"],
         summary="List all industries served")
async def rest_list_industries(request: Request):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_list_industries({}))


@app.get("/tools/company", tags=["Company"],
         summary="Get company information")
async def rest_get_company(
    request: Request,
    section: str = Query("all", description="all | team | contact | stats | tech_stack | process"),
):
    if not limiter.allow_read(_client_ip(request)):
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return JSONResponse(handle_get_company_info({"section": section}))


class InquiryBody(BaseModel):
    name: str
    email: str
    message: str
    company: str = ""
    service: str = ""


@app.post("/tools/inquiry", tags=["Actions"],
          summary="Submit a contact inquiry to Lanos Logic")
async def rest_submit_inquiry(body: InquiryBody, request: Request):
    result = await handle_submit_inquiry(body.model_dump(), _client_ip(request))
    code = 200 if result.get("success") else (429 if "Rate limit" in result.get("error", "") else 400)
    return JSONResponse(result, status_code=code)
