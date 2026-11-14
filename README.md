# TeamedUp Intelligence — MCP Server, OpenAPI Spec & SDK Examples

Official Model Context Protocol (MCP) configuration, OpenAPI 3.0.3 specification, and REST client examples for **[TeamedUp Intelligence](https://intelligence.teamedupchina.com)** — China & APAC labor market and compensation intelligence.

* **319,000+ verified employer job postings** across 12 GICS-aligned macro industries
* **200,000+ high-confidence (`N >= 20`) market cohorts** with `P25`, `P50` (Median), `P75`, and `P90` monthly base salary benchmarks (CNY)
* **72+ Chinese & APAC metropolitan hubs** (Mainland China, Hong Kong, Taiwan, Singapore, Japan, South Korea, Australia, Southeast Asia)
* **Commercial use permitted** on all tiers (including the free 25-credit Developer tier)

---

## 1. Get Your API Key (60 Seconds)

Create a free developer account at **[intelligence.teamedupchina.com/register](https://intelligence.teamedupchina.com/register)** to generate your Bearer token (`Authorization: Bearer YOUR_API_KEY`).

> Discovery endpoints (`/api/v1/taxonomies/*`, `/api/v1/stats`, and `/api/v1/health`) are **0-credit** so agents and SDKs can inspect valid roles, cities, and industries without spending quota.

---

## 2. MCP Server Setup (Streamable HTTP)

**Endpoint:** `POST https://intelligence.teamedupchina.com/api/v1/mcp`

### Claude Desktop / Antigravity / Cursor (`mcp.json`)

```json
{
  "mcpServers": {
    "teamedup-intelligence": {
      "url": "https://intelligence.teamedupchina.com/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "Accept": "application/json"
      }
    }
  }
}
```

### Codex / OpenCode (`mcp-remote`)

```json
{
  "mcpServers": {
    "teamedup-intelligence": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://intelligence.teamedupchina.com/api/v1/mcp",
        "--header",
        "Authorization: Bearer YOUR_API_KEY"
      ]
    }
  }
}
```

---

## 3. Repository Contents

* [`openapi.json`](./openapi.json) / [`openapi.yaml`](./openapi.yaml) — OpenAPI 3.0.3 specification
* [`docs/COMPLIANCE.md`](./docs/COMPLIANCE.md) — Public-data compliance & PIPL/PDPA/GDPR statement
* [`examples/curl_example.sh`](./examples/curl_example.sh) — cURL REST quickstart
* [`examples/python_example.py`](./examples/python_example.py) — Python `requests` quickstart
* [`examples/typescript_example.ts`](./examples/typescript_example.ts) — TypeScript `fetch` quickstart

---

## Links

* **Platform & Explorer**: https://intelligence.teamedupchina.com
* **API Docs**: https://intelligence.teamedupchina.com/docs
* **MCP Guide**: https://intelligence.teamedupchina.com/docs/mcp
* **Methodology & NBS Audit**: https://intelligence.teamedupchina.com/methodology
* **Agent Manifests**: [`llms.txt`](https://intelligence.teamedupchina.com/llms.txt) · [`llms-full.txt`](https://intelligence.teamedupchina.com/llms-full.txt) · [`agent.json`](https://intelligence.teamedupchina.com/agent.json)
