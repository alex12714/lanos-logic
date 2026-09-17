#!/usr/bin/env python3
"""Conformance checks for the Lanos Logic MCP server against the 2026-07-28
revision (modern era) and the initialize-handshake revisions (legacy era).

Run against a local server:
    uvicorn server:app --port 8899 &
    python3 conformance_test.py http://127.0.0.1:8899

Or against production:
    python3 conformance_test.py https://lanos-logic.com

Exits non-zero if any check fails. No dependencies beyond the stdlib.
"""
import json, sys, base64, urllib.request, urllib.error

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899"
MCP = BASE + "/mcp"
V = "2026-07-28"
passed, failed = [], []

def call(body, headers=None, method="POST"):
    data = json.dumps(body).encode() if body is not None else None
    h = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"}
    h.update(headers or {})
    req = urllib.request.Request(MCP, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            raw = r.read().decode()
            return r.status, (json.loads(raw) if raw.strip() else None), dict(r.headers)
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try: parsed = json.loads(raw) if raw.strip() else None
        except Exception: parsed = raw
        return e.code, parsed, dict(e.headers)

def modern(method, params=None, extra_headers=None, id_=1, omit=()):
    params = dict(params or {})
    params.setdefault("_meta", {})["io.modelcontextprotocol/protocolVersion"] = V
    body = {"jsonrpc": "2.0", "method": method, "params": params}
    if id_ is not None: body["id"] = id_
    h = {"MCP-Protocol-Version": V, "Mcp-Method": method}
    if method == "tools/call" and "name" in params: h["Mcp-Name"] = params["name"]
    for k in omit: h.pop(k, None)
    h.update(extra_headers or {})
    return call(body, h)

def check(name, cond, detail=""):
    (passed if cond else failed).append(name)
    print(("  PASS  " if cond else "  FAIL  ") + name + (("   -> " + str(detail)[:160]) if not cond else ""))

def errcode(b):
    return (b or {}).get("error", {}).get("code") if isinstance(b, dict) else None

print("== MODERN (2026-07-28) ==")
st, b, _ = modern("server/discover")
r = (b or {}).get("result", {})
check("server/discover returns 200", st == 200, (st, b))
check("  supportedVersions advertised", V in r.get("supportedVersions", []), r.get("supportedVersions"))
check("  capabilities.tools present", "tools" in r.get("capabilities", {}), r.get("capabilities"))
check("  _meta serverInfo present", "io.modelcontextprotocol/serverInfo" in r.get("_meta", {}), r.get("_meta"))
check("  instructions present", bool(r.get("instructions")))

st, b, _ = modern("tools/list")
check("tools/list 200 with 7 tools", st == 200 and len((b or {}).get("result", {}).get("tools", [])) == 7, (st, errcode(b)))

st, b, _ = modern("tools/call", {"name": "list_industries", "arguments": {}})
check("tools/call 200", st == 200 and "content" in (b or {}).get("result", {}), (st, b))

st, b, _ = modern("tools/list", omit=("MCP-Protocol-Version",))
check("missing MCP-Protocol-Version -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))

st, b, _ = modern("tools/list", extra_headers={"MCP-Protocol-Version": "2025-06-18"})
check("header/body version mismatch -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))

body = {"jsonrpc": "2.0", "id": 1, "method": "tools/list",
        "params": {"_meta": {"io.modelcontextprotocol/protocolVersion": "1900-01-01"}}}
st, b, _ = call(body, {"MCP-Protocol-Version": "1900-01-01", "Mcp-Method": "tools/list"})
d = (b or {}).get("error", {}).get("data", {})
check("unsupported version -> 400 -32022", st == 400 and errcode(b) == -32022, (st, errcode(b)))
check("  error.data.supported listed", isinstance(d.get("supported"), list) and V in d["supported"], d)
check("  error.data.requested echoed", d.get("requested") == "1900-01-01", d)

st, b, _ = modern("tools/list", omit=("Mcp-Method",))
check("missing Mcp-Method -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))
st, b, _ = modern("tools/list", extra_headers={"Mcp-Method": "tools/call"})
check("Mcp-Method mismatch -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))

st, b, _ = modern("tools/call", {"name": "list_services", "arguments": {}}, omit=("Mcp-Name",))
check("missing Mcp-Name -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))
st, b, _ = modern("tools/call", {"name": "list_services", "arguments": {}}, extra_headers={"Mcp-Name": "other_tool"})
check("Mcp-Name mismatch -> 400 HeaderMismatch", st == 400 and errcode(b) == -32020, (st, errcode(b)))

enc = "=?base64?" + base64.b64encode("list_services".encode()).decode() + "?="
st, b, _ = modern("tools/call", {"name": "list_services", "arguments": {}}, extra_headers={"Mcp-Name": enc})
check("Mcp-Name base64 sentinel decoded", st == 200, (st, errcode(b)))

st, b, _ = modern("no/such/method")
check("unknown method -> 404 -32601", st == 404 and errcode(b) == -32601, (st, errcode(b)))

st, b, _ = modern("tools/list", id_=None)
check("notification -> 202 no body", st == 202 and not b, (st, b))

print("== LEGACY (initialize handshake) ==")
for want in ("2025-06-18", "2024-11-05", "2025-03-26"):
    st, b, _ = call({"jsonrpc": "2.0", "id": 1, "method": "initialize",
                     "params": {"protocolVersion": want, "capabilities": {}, "clientInfo": {"name": "t", "version": "1"}}})
    got = (b or {}).get("result", {}).get("protocolVersion")
    check(f"initialize({want}) echoes it back", st == 200 and got == want, (st, got))

st, b, _ = call({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "1999-01-01"}})
got = (b or {}).get("result", {}).get("protocolVersion")
check("initialize(unknown) -> preferred legacy version", st == 200 and got == "2025-06-18", (st, got))

st, b, _ = call({"jsonrpc": "2.0", "id": 2, "method": "tools/list"})
check("legacy tools/list (no headers) 200", st == 200 and len((b or {}).get("result", {}).get("tools", [])) == 7, (st, errcode(b)))

st, b, _ = call({"jsonrpc": "2.0", "id": 3, "method": "tools/call",
                 "params": {"name": "get_company_info", "arguments": {}}})
check("legacy tools/call 200", st == 200 and "content" in (b or {}).get("result", {}), (st, errcode(b)))

st, b, _ = call({"jsonrpc": "2.0", "method": "notifications/initialized"})
check("notifications/initialized -> 202", st == 202, (st, b))

st, b, _ = call({"jsonrpc": "2.0", "id": 9, "method": "bogus/method"})
check("legacy unknown method -> 404 -32601", st == 404 and errcode(b) == -32601, (st, errcode(b)))

print("== TRANSPORT ==")
st, b, h = call(None, method="GET")
check("GET /mcp -> 405", st == 405, (st,))
check("  Allow: POST advertised", (h.get("Allow") or h.get("allow")) == "POST", h.get("Allow"))
st, b, _ = call(None, method="DELETE")
check("DELETE /mcp -> 405", st == 405, (st,))
st, b, _ = call([{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}])
check("JSON-RPC batch rejected -> 400", st == 400 and errcode(b) == -32600, (st, errcode(b)))

req = urllib.request.Request(MCP, data=b"{not json", headers={"Content-Type": "application/json"}, method="POST")
try:
    urllib.request.urlopen(req, timeout=10); st = 200
except urllib.error.HTTPError as e:
    st, bb = e.code, json.loads(e.read().decode())
check("malformed JSON -> 400 -32700", st == 400 and errcode(bb) == -32700, (st,))

st, b, _ = call({"jsonrpc": "2.0", "id": 1, "method": "tools/list"}, {"Mcp-Session-Id": "abc", "Last-Event-ID": "5"})
check("stale session/resume headers ignored", st == 200, (st,))

print(f"\n{len(passed)} passed, {len(failed)} failed")
if failed:
    print("FAILED: " + "; ".join(failed)); sys.exit(1)
