#!/usr/bin/env node
/**
 * smoke-agent-surface.mjs
 *
 * Standalone validation / smoke test for the lanos-logic.com "agent surface":
 * the discovery files (.well-known/*), OpenAPI spec, llms.txt feeds, and the
 * live MCP server (JSON-RPC 2.0 at /mcp).
 *
 * Pure Node 20+ (global fetch, no npm deps). ESM.
 *
 * Usage:
 *   node frontend/scripts/smoke-agent-surface.mjs
 *   BASE_URL=https://staging.lanos-logic.com node frontend/scripts/smoke-agent-surface.mjs
 *
 * Exit code 0 only if every check passes; non-zero otherwise.
 */

const BASE_URL = (process.env.BASE_URL || "https://lanos-logic.com").replace(/\/+$/, "");
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 15000);

// Read-only MCP tools we will actually invoke (submit_inquiry is intentionally
// NOT called — it creates a lead and is rate-limited).
const READONLY_TOOLS = [
  "list_services",
  "get_service",
  "list_case_studies",
  "get_case_study",
  "list_industries",
  "get_company_info",
];
const ACTION_TOOLS = ["submit_inquiry"]; // advertised-only, never invoked

// Fallback real IDs (from mcp-server/data.json) if dynamic discovery fails.
const FALLBACK_SERVICE_ID = "ai-agents";
const FALLBACK_CASE_STUDY_ID = "medical-equipment-testing-automated-crm-pdf-certificates";

// ---------------------------------------------------------------------------
// Result tracking
// ---------------------------------------------------------------------------
const results = [];
function record(name, pass, detail = "") {
  results.push({ name, pass: !!pass, detail });
  const tag = pass ? "PASS" : "FAIL";
  console.log(`[${tag}] ${name}${detail ? ` — ${detail}` : ""}`);
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------
async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function getText(path) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const res = await fetchWithTimeout(url, { headers: { Accept: "*/*" } });
  const body = await res.text();
  return { status: res.status, body };
}

async function getJson(path) {
  const { status, body } = await getText(path);
  let json = null;
  let parseError = null;
  try {
    json = JSON.parse(body);
  } catch (e) {
    parseError = e.message;
  }
  return { status, body, json, parseError };
}

// ---------------------------------------------------------------------------
// Check 1: .well-known discovery JSON files
// ---------------------------------------------------------------------------
async function checkWellKnownFile(path, requiredFields) {
  try {
    const { status, json, parseError } = await getJson(path);
    if (status !== 200) return record(path, false, `HTTP ${status}`);
    if (parseError) return record(path, false, `invalid JSON: ${parseError}`);
    const missing = requiredFields.filter((f) => deepGet(json, f) === undefined);
    if (missing.length) return record(path, false, `missing fields: ${missing.join(", ")}`);
    record(path, true, `200, fields ok (${requiredFields.join(",")})`);
    return json;
  } catch (e) {
    record(path, false, `request error: ${e.message}`);
    return null;
  }
}

// dot-path getter, e.g. "endpoints.mcp" or "api.url"
function deepGet(obj, dotPath) {
  return dotPath.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

// ---------------------------------------------------------------------------
// Check 2: openapi.yaml structural sanity (no yaml dep — marker checks)
// ---------------------------------------------------------------------------
async function checkOpenApi() {
  try {
    const { status, body } = await getText("/openapi.yaml");
    if (status !== 200) return record("/openapi.yaml", false, `HTTP ${status}`);
    const markers = ["openapi:", "info:", "paths:", "/tools/", "components:"];
    const missing = markers.filter((m) => !body.includes(m));
    if (missing.length) return record("/openapi.yaml", false, `missing markers: ${missing.join(", ")}`);
    record("/openapi.yaml", true, `200, ${body.length}B, markers ok`);
  } catch (e) {
    record("/openapi.yaml", false, `request error: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// Check 3: llms.txt feeds
// ---------------------------------------------------------------------------
async function checkLlmsFeed(path) {
  try {
    const { status, body } = await getText(path);
    if (status !== 200) return record(path, false, `HTTP ${status}`);
    if (!body || body.trim().length === 0) return record(path, false, "empty body");
    record(path, true, `200, ${body.length}B`);
  } catch (e) {
    record(path, false, `request error: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// MCP JSON-RPC helper
// ---------------------------------------------------------------------------
let rpcId = 0;
async function mcpCall(method, params) {
  const res = await fetchWithTimeout(`${BASE_URL}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++rpcId, method, params }),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* leave null */
  }
  return { status: res.status, json, text };
}

// tools/call results wrap a JSON string inside result.content[0].text
function parseToolResult(rpc) {
  if (!rpc.json || rpc.json.error) {
    return { ok: false, error: rpc.json?.error?.message || `HTTP ${rpc.status}` };
  }
  const content = rpc.json.result?.content;
  if (!Array.isArray(content) || !content[0]?.text) {
    return { ok: false, error: "no content[].text in result" };
  }
  let payload;
  try {
    payload = JSON.parse(content[0].text);
  } catch (e) {
    return { ok: false, error: `content text not JSON: ${e.message}` };
  }
  if (payload && typeof payload === "object" && payload.error) {
    return { ok: false, error: String(payload.error), payload };
  }
  return { ok: true, payload };
}

// ---------------------------------------------------------------------------
// Drift sources: featureList (JSON-LD) + ai-plugin description prose
// ---------------------------------------------------------------------------
function extractFeatureList(indexHtml) {
  // WebApplication JSON-LD lists tool names in "featureList":[...]
  const m = indexHtml.match(/"featureList"\s*:\s*(\[[^\]]*\])/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function toolsMentionedInProse(text, candidateNames) {
  return candidateNames.filter((n) => new RegExp(`\\b${n}\\b`).test(text || ""));
}

function setEq(a, b) {
  const sa = new Set(a);
  const sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const x of sa) if (!sb.has(x)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\nAgent-surface smoke test → ${BASE_URL}\n${"=".repeat(60)}`);

  // 1. discovery files
  const agentJson = await checkWellKnownFile("/.well-known/agent.json", [
    "name",
    "url",
    "skills",
    "endpoints.mcp",
  ]);
  const aiPlugin = await checkWellKnownFile("/.well-known/ai-plugin.json", [
    "schema_version",
    "name_for_model",
    "description_for_model",
    "api.url",
  ]);
  await checkWellKnownFile("/.well-known/mcp.json", ["url", "name", "version"]);

  // 2. openapi
  await checkOpenApi();

  // 3. llms feeds
  await checkLlmsFeed("/llms.txt");
  await checkLlmsFeed("/llms-full.txt");

  // 4. tools/list + drift check
  let liveTools = [];
  try {
    const rpc = await mcpCall("tools/list", {});
    if (rpc.status !== 200 || !rpc.json?.result?.tools) {
      record("MCP tools/list", false, `HTTP ${rpc.status} / no tools array`);
    } else {
      liveTools = rpc.json.result.tools.map((t) => t.name).sort();
      record("MCP tools/list", true, `${liveTools.length} tools: ${liveTools.join(", ")}`);
    }
  } catch (e) {
    record("MCP tools/list", false, `request error: ${e.message}`);
  }

  // Declared set: WebApplication JSON-LD featureList in index.html
  let featureList = null;
  try {
    const { status, body } = await getText("/index.html");
    if (status !== 200) {
      record("featureList (JSON-LD)", false, `index.html HTTP ${status}`);
    } else {
      featureList = extractFeatureList(body);
      if (!featureList) record("featureList (JSON-LD)", false, "featureList not found in index.html");
      else record("featureList (JSON-LD)", true, `${featureList.length}: ${[...featureList].sort().join(", ")}`);
    }
  } catch (e) {
    record("featureList (JSON-LD)", false, `request error: ${e.message}`);
  }

  // Drift: live tools/list vs declared featureList
  if (liveTools.length && featureList) {
    const declared = [...featureList].sort();
    if (setEq(liveTools, declared)) {
      record("Drift: tools/list ↔ featureList", true, "identical sets");
    } else {
      const onlyLive = liveTools.filter((t) => !declared.includes(t));
      const onlyDecl = declared.filter((t) => !liveTools.includes(t));
      record(
        "Drift: tools/list ↔ featureList",
        false,
        `mismatch — only live: [${onlyLive.join(",")}] only featureList: [${onlyDecl.join(",")}]`
      );
    }
  } else {
    record("Drift: tools/list ↔ featureList", false, "skipped — missing live tools or featureList");
  }

  // Drift: ai-plugin description_for_model must mention every live tool
  if (liveTools.length && aiPlugin?.description_for_model) {
    const mentioned = toolsMentionedInProse(aiPlugin.description_for_model, liveTools);
    const missing = liveTools.filter((t) => !mentioned.includes(t));
    if (missing.length === 0) {
      record("Drift: tools/list ↔ ai-plugin prose", true, "all tools mentioned");
    } else {
      record("Drift: tools/list ↔ ai-plugin prose", false, `not mentioned: ${missing.join(", ")}`);
    }
  } else {
    record("Drift: tools/list ↔ ai-plugin prose", false, "skipped — missing live tools or ai-plugin");
  }

  // submit_inquiry advertised but NOT called
  for (const t of ACTION_TOOLS) {
    if (liveTools.includes(t)) record(`Advertised (not called): ${t}`, true, "present in tools/list");
    else record(`Advertised (not called): ${t}`, false, "missing from tools/list");
  }

  // 5. tools/call for each read-only tool with valid minimal args
  // Discover real IDs dynamically where possible (more robust than hardcoding).
  let serviceId = FALLBACK_SERVICE_ID;
  let caseStudyId = FALLBACK_CASE_STUDY_ID;

  const callArgs = {
    list_services: {},
    get_service: () => ({ service_id: serviceId }),
    list_case_studies: { limit: 5 },
    get_case_study: () => ({ case_study_id: caseStudyId }),
    list_industries: {},
    get_company_info: { section: "all" },
  };

  // Sanity assertions: result payload looks plausible per tool.
  const plausible = {
    list_services: (p) => Array.isArray(p.services) && p.services.length > 0,
    get_service: (p) => p.id === serviceId && typeof p.name === "string",
    list_case_studies: (p) => Array.isArray(p.case_studies) && p.case_studies.length > 0,
    get_case_study: (p) => p.id === caseStudyId && typeof p.title === "string",
    list_industries: (p) => Array.isArray(p.industries) && p.industries.length > 0,
    get_company_info: (p) => typeof p.name === "string" && !!p.contact,
  };

  for (const tool of READONLY_TOOLS) {
    if (liveTools.length && !liveTools.includes(tool)) {
      record(`tools/call ${tool}`, false, "not advertised in tools/list");
      continue;
    }
    try {
      // Resolve real IDs from list calls before the dependent get calls.
      const args = typeof callArgs[tool] === "function" ? callArgs[tool]() : callArgs[tool];
      const rpc = await mcpCall("tools/call", { name: tool, arguments: args });
      const parsed = parseToolResult(rpc);
      if (!parsed.ok) {
        record(`tools/call ${tool}`, false, parsed.error);
        continue;
      }
      const p = parsed.payload;

      // Capture real IDs for dependent get_* calls.
      if (tool === "list_services" && p.services?.[0]?.id) serviceId = p.services[0].id;
      if (tool === "list_case_studies" && p.case_studies?.[0]?.id) caseStudyId = p.case_studies[0].id;

      const ok = plausible[tool] ? plausible[tool](p) : true;
      if (!ok) {
        record(`tools/call ${tool}`, false, `implausible payload: ${JSON.stringify(p).slice(0, 120)}`);
      } else {
        const summary = summarize(tool, p);
        record(`tools/call ${tool}`, true, summary);
      }
    } catch (e) {
      record(`tools/call ${tool}`, false, `request error: ${e.message}`);
    }
  }

  // ---- summary table ----
  printSummary();

  const failed = results.filter((r) => !r.pass).length;
  process.exit(failed === 0 ? 0 : 1);
}

function summarize(tool, p) {
  switch (tool) {
    case "list_services":
      return `${p.total ?? p.services.length} services`;
    case "get_service":
      return `${p.id} (${(p.features || []).length} features)`;
    case "list_case_studies":
      return `${p.case_studies.length} case studies (id=${p.case_studies[0]?.id})`;
    case "get_case_study":
      return `${p.id}`;
    case "list_industries":
      return `${p.total ?? p.industries.length} industries`;
    case "get_company_info":
      return `${p.name}, ${(p.tech_stack || []).length} tech, ${(p.team || []).length} team`;
    default:
      return "ok";
  }
}

function printSummary() {
  const pass = results.filter((r) => r.pass).length;
  const total = results.length;
  const nameW = Math.max(...results.map((r) => r.name.length), 6);
  console.log(`\n${"=".repeat(60)}\nSUMMARY  (${pass}/${total} passed)\n${"-".repeat(60)}`);
  console.log(`${"RESULT".padEnd(6)}  ${"CHECK".padEnd(nameW)}  DETAIL`);
  for (const r of results) {
    console.log(`${(r.pass ? "PASS" : "FAIL").padEnd(6)}  ${r.name.padEnd(nameW)}  ${r.detail}`);
  }
  console.log("=".repeat(60));
}

main().catch((e) => {
  console.error(`\nFATAL: ${e.stack || e.message}`);
  process.exit(2);
});
