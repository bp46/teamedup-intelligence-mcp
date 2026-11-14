# TeamedUp Intelligence MCP Server

**China & APAC Salary Benchmarks, Employer Statutory Cost (五险一金), and Tech Talent Intelligence for AI Agents.**

[![Protocol: MCP 2024-11-05](https://img.shields.io/badge/MCP-2024--11--05-0F766E.svg)](https://modelcontextprotocol.io)
[![Transport: Streamable HTTP](https://img.shields.io/badge/Transport-Streamable%20HTTP-0F766E.svg)](https://intelligence.teamedupchina.com/docs/mcp)
[![OpenAPI 3.0.3](https://img.shields.io/badge/OpenAPI-3.0.3-blue.svg)](./openapi.yaml)
[![Glama MCP connector](https://glama.ai/mcp/connectors/io.github.bp46/teamedup-intelligence-mcp/badges/score.svg)](https://glama.ai/mcp/connectors/io.github.bp46/teamedup-intelligence-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](./package.json)

Official Model Context Protocol (MCP) server configuration, tool reference, OpenAPI 3.0.3 specification, and SDK examples for **[TeamedUp Intelligence](https://intelligence.teamedupchina.com)** — institutional-grade labor market and compensation intelligence across Mainland China, Greater China (HK, TW, MO), and International APAC (SG, AU, JP, KR, SEA).

* **319,000+ verified employer job postings** across 12 GICS-aligned macro industries
* **200,000+ high-confidence (`N >= 20`) market cohorts** with `P25`, `P50` (Median), `P75`, and `P90` gross monthly base salary bands (CNY)
* **72+ China & APAC metropolitan hubs** (Shanghai, Beijing, Shenzhen, Hangzhou, Chengdu, Hong Kong, Taipei, Singapore, Tokyo, Sydney, and more)
* **500+ standardized bilingual job roles** (English & Chinese normalized titles)
* **Built-in China statutory cost & arbitrage calculators** (五险一金 / *Wuxian Yijin* floors & ceilings across 20+ Chinese cities)
* **Commercial use permitted** on all tiers (including the free 25-credit Developer tier)

---

## Quickstart (60 Seconds)

### 1. Get a Free API Key
Create a developer account at **[intelligence.teamedupchina.com/register](https://intelligence.teamedupchina.com/register)** and generate a Bearer token (`Authorization: Bearer YOUR_API_KEY`).

> **Zero-Credit Discovery:** MCP handshakes (`initialize`, `ping`, `tools/list`) and REST discovery endpoints (`/api/v1/health`, `/api/v1/stats`, `/api/v1/taxonomies/*`) cost **0 credits**. Paid tool calls and REST data queries cost **1 credit** per request.

### 2. Connect Your AI Client

**MCP Endpoint:** `https://intelligence.teamedupchina.com/api/v1/mcp` (JSON-RPC 2.0 / Streamable HTTP)

#### Claude Desktop (`claude_desktop_config.json`) / Cursor (`.cursor/mcp.json`) / Antigravity (`mcp.json`)
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

#### OpenAI Codex / OpenCode / Stdio-Only Clients (`mcp-remote`)
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

#### VS Code Copilot (`.vscode/mcp.json`)
```json
{
  "servers": {
    "teamedup-intelligence": {
      "type": "http",
      "url": "https://intelligence.teamedupchina.com/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

---

## Available MCP Tools (13 Tools)

### Compensation & Benchmarking
| Tool | Purpose |
| :--- | :--- |
| `get_market_summary` | Query `P25`, `P50`, `P75`, `P90` monthly base salary bands by standardized role, city, seniority, industry, and region. |
| `get_salary_trend` | Track month-over-month median (`P50`) salary inflation and compensation shifts for a role & city. |
| `get_skill_demand` | Rank technical/domain skills by posting frequency and associated median salary premium. |

### China Statutory Cost & Cross-City Arbitrage
| Tool | Purpose |
| :--- | :--- |
| `calculate_all_in_employer_cost` | Compute total all-in employer headcount cost in China including mandatory **五险一金** (Pension, Medical, Housing Fund, Unemployment, Work Injury) with exact municipal floors & ceilings across 20+ cities. |
| `calculate_compensation_arbitrage` | Model payroll savings and engineering runway expansion between Tier-1 hubs (Shanghai, Beijing, Shenzhen, Guangzhou) and New Tier-1 hubs (Chengdu, Wuhan, Xi'an, Hefei, Suzhou, Hangzhou). |

### Employer & Hiring Intelligence
| Tool | Purpose |
| :--- | :--- |
| `search_companies` | Search employers by English or Chinese name, industry, size tier, or macro industry. |
| `get_company_info` | Retrieve firmographics (industry, size tier, ownership type, employer brand stats) for a Chinese employer. |
| `get_company_jobs` | Fetch paginated historical job postings and salary bands for a specific company ID. |
| `get_dataset_trends` | Inspect weekly hiring frequency / share-of-voice signals by company, role, and city. |

### Discovery & Taxonomies (0-Credit REST Equivalents Available)
| Tool | Purpose |
| :--- | :--- |
| `list_roles` | List all 500+ standardized job roles to ensure exact matching before querying benchmarks. |
| `list_cities` | List verified China & APAC cities (filterable by `mainland`, `greater`, `intl`). |
| `list_taxonomies` | List valid industries, seniority levels, education levels, and company size tiers. |
| `get_stats` | Retrieve dataset-wide counts (postings, cohorts, companies, cities, available months). |

See **[`docs/TOOLS.md`](./docs/TOOLS.md)** for full JSON-RPC 2.0 request/response schemas.

---

## Use Case Breakdowns & Agent Prompts

### 1. MNC Total Rewards & Compensation Benchmarking
* **Scenario:** A global HR or finance team needs verified market bands for hiring senior engineers in Shanghai vs. Singapore.
* **Prompt to paste into Claude / Cursor / Antigravity:**
  > *"Use TeamedUp Intelligence to compare P25, P50, P75, and P90 monthly base salaries for `Software Engineer` at `Senior` seniority in `Shanghai`, `Shenzhen`, and `Singapore`. Also check the 6-month salary trend in Shanghai."*
* **Tools invoked:** `get_market_summary`, `get_salary_trend`

### 2. China Entity Budgeting & All-In Statutory Cost (五险一金)
* **Scenario:** A foreign company budgeting China headcount needs true employer cost (gross salary + mandatory municipal social insurance & housing fund contributions), not just base pay.
* **Prompt:**
  > *"Calculate the all-in employer cost in CNY and USD for a `Product Manager` in `Shanghai` vs `Chengdu` using TeamedUp Intelligence's market median P50 salary and municipal 五险一金 caps."*
* **Tools invoked:** `calculate_all_in_employer_cost`

### 3. Cross-City R&D Hub & Offshoring Arbitrage
* **Scenario:** Evaluating whether to expand an engineering team in Beijing/Shanghai or open a satellite hub in Chengdu, Wuhan, or Suzhou.
* **Prompt:**
  > *"Run a compensation arbitrage analysis for 10 `AI & Machine Learning Engineer` hires comparing `Beijing` against `Chengdu` and `Hangzhou`. Show annual cash savings and extra headcount runway."*
* **Tools invoked:** `calculate_compensation_arbitrage`

### 4. Tech Stack & Skill Premium Analysis
* **Scenario:** Identifying which skills command the highest pay premium in China's AI or semiconductor sectors.
* **Prompt:**
  > *"What are the top 10 highest-paying in-demand skills for `Algorithm Engineer` roles in `Shenzhen`?"*
* **Tools invoked:** `get_skill_demand`

### 5. Competitive Talent & Employer Intelligence
* **Scenario:** Benchmarking a specific competitor's hiring footprint and salary ranges.
* **Prompt:**
  > *"Search TeamedUp Intelligence for `ByteDance` (or `字节跳动`), inspect its firmographic profile, and list its recent job postings and salary bands."*
* **Tools invoked:** `search_companies` → `get_company_info` → `get_company_jobs`

---

## Repository Contents

* [`server.json`](./server.json) — Standard MCP Registry server manifest
* [`smithery.yaml`](./smithery.yaml) — Smithery remote MCP configuration
* [`openapi.json`](./openapi.json) / [`openapi.yaml`](./openapi.yaml) — OpenAPI 3.0.3 REST specification
* [`docs/TOOLS.md`](./docs/TOOLS.md) — Complete MCP tool reference & JSON-RPC 2.0 examples
* [`docs/COMPLIANCE.md`](./docs/COMPLIANCE.md) — Public-data compliance & PIPL/PDPA/GDPR statement
* [`examples/mcp_client.py`](./examples/mcp_client.py) — Python MCP JSON-RPC 2.0 quickstart
* [`examples/mcp_client.ts`](./examples/mcp_client.ts) — TypeScript MCP JSON-RPC 2.0 quickstart
* [`examples/curl_example.sh`](./examples/curl_example.sh) — cURL REST quickstart
* [`examples/python_example.py`](./examples/python_example.py) — Python REST quickstart
* [`examples/typescript_example.ts`](./examples/typescript_example.ts) — TypeScript REST quickstart

---

## Methodology & Data Integrity

* **Units:** All salaries are normalized to **Gross Monthly Base Salary in CNY (RMB)**. Annualized compensation benchmarks in China typically reflect `Monthly × 13–15` (14 months benchmark standard).
* **Cross-Border APAC Normalization:** Non-CNY APAC postings (HKD, TWD, SGD, AUD) are normalized using pinned FX reference rates and annual-to-monthly conversion rules so cross-market comparisons remain apples-to-apples.
* **Statistical Rigor:** Public cohorts enforce minimum sample thresholds (`N >= 20`) and NBS-aligned outlier filtering. See [Methodology & NBS Audit](https://intelligence.teamedupchina.com/methodology).

## Links

* **Platform & Explorer:** https://intelligence.teamedupchina.com
* **API Docs & Live Playground:** https://intelligence.teamedupchina.com/docs
* **MCP Guide:** https://intelligence.teamedupchina.com/docs/mcp
* **Pricing & Free Developer Tier:** https://intelligence.teamedupchina.com/pricing
* **Agent Manifests:** [`llms.txt`](https://intelligence.teamedupchina.com/llms.txt) · [`llms-full.txt`](https://intelligence.teamedupchina.com/llms-full.txt) · [`agent.json`](https://intelligence.teamedupchina.com/agent.json)
