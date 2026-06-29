# Agent Surface

The "agent surface" is the set of machine-readable endpoints that let AI agents
(ChatGPT, Claude, Perplexity, Gemini, GPT Actions, MCP clients, etc.) discover and
use lanos-logic.com programmatically. This doc lists those endpoints and explains
how to run the smoke test that validates them.

## Endpoints

| Endpoint | Purpose |
|---|---|
| `/.well-known/agent.json` | A2A-style agent card: name, skills, capabilities, and endpoint map (`mcp`, `rest`, `openapi`). |
| `/.well-known/ai-plugin.json` | OpenAI plugin manifest: `name_for_model`, `description_for_model` (includes the canonical tool list in prose), and the OpenAPI URL. |
| `/.well-known/mcp.json` | Lightweight MCP pointer: server `url`, `name`, `version`, `description`, `contact`. |
| `/openapi.yaml` | OpenAPI 3.1 spec of the REST mirror (`/tools/*`) for GPT Actions / OpenAPI agents. |
| `/llms.txt` | Short LLM-oriented site summary (the emerging `llms.txt` standard). |
| `/llms-full.txt` | Expanded LLM site content feed. |
| `/mcp` | Live MCP server, JSON-RPC 2.0, protocol `2024-11-05`. `GET` = discovery; `POST` = `initialize` / `tools/list` / `tools/call`. |
| `/tools/*` | REST mirror of the MCP tools (same handlers), described by `/openapi.yaml`. |
| WebApplication JSON-LD in `/index.html` | `featureList` lists the canonical MCP tool names — used as the drift baseline. |

### MCP tools (7)

Read-only: `list_services`, `get_service`, `list_case_studies`, `get_case_study`,
`list_industries`, `get_company_info`.

Action (rate-limited, creates a lead): `submit_inquiry`.

## Smoke test

`frontend/scripts/smoke-agent-surface.mjs` is a standalone Node 20+ script (ESM,
global `fetch`, **no npm dependencies**). It validates the live surface and exits
non-zero on any failure.

### Run it

```bash
# default target: https://lanos-logic.com
node frontend/scripts/smoke-agent-surface.mjs

# point at another environment
BASE_URL=https://staging.lanos-logic.com node frontend/scripts/smoke-agent-surface.mjs

# optional per-request timeout (ms, default 15000)
TIMEOUT_MS=20000 node frontend/scripts/smoke-agent-surface.mjs
```

### What it checks

1. `/.well-known/agent.json`, `ai-plugin.json`, `mcp.json` → HTTP 200, valid JSON, required fields present.
2. `/openapi.yaml` → HTTP 200 + structural markers (`openapi:`, `info:`, `paths:`, `/tools/`, `components:`).
3. `/llms.txt` and `/llms-full.txt` → HTTP 200, non-empty.
4. MCP `tools/list` → tool names must match the JSON-LD `featureList` exactly (**drift fails the run**), and every tool must be mentioned in the `ai-plugin.json` `description_for_model` prose.
5. MCP `tools/call` for each read-only tool with valid minimal args. IDs for `get_service` / `get_case_study` are discovered dynamically from the preceding `list_*` calls (with hardcoded fallbacks). Each result must contain plausible data and no `error`.
6. `submit_inquiry` is asserted **advertised but never called** (it creates a lead and is rate-limited).

Exit code `0` only if all checks pass.

## Wiring into deploy.sh (post-deploy check)

Add, after the deploy/upload step has completed and DNS/CDN points at the new build:

```sh
# Post-deploy: validate the agent surface is live and consistent.
node frontend/scripts/smoke-agent-surface.mjs || {
  echo "Agent-surface smoke test FAILED" >&2
  exit 1
}
```

To validate the freshly deployed origin before flipping traffic, override `BASE_URL`
(e.g. `BASE_URL=https://<new-origin> node frontend/scripts/smoke-agent-surface.mjs`).
