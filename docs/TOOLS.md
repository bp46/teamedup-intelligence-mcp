# MCP Tool Reference — TeamedUp Intelligence

**Endpoint:** `POST https://intelligence.teamedupchina.com/api/v1/mcp`  
**Protocol:** JSON-RPC 2.0 (`protocolVersion`: `2024-11-05`)  
**Authentication:** `Authorization: Bearer YOUR_API_KEY`

---

## Protocol Methods

* `initialize` — Handshake (**0 credits**)
* `ping` — Health check (**0 credits**)
* `tools/list` — Inspect all 13 live tool schemas (**0 credits**)
* `tools/call` — Execute a tool (**1 credit** per successful call)

### Quick JSON-RPC 2.0 Test (`tools/list` — 0 Credits)

```bash
curl -s -X POST "https://intelligence.teamedupchina.com/api/v1/mcp" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }' | jq .
```

---

## Tool Catalog

### 1. `get_market_summary`
Query aggregated monthly base salary percentiles (`P25`, `P50`, `P75`, `P90` in CNY) with cohort counts and confidence levels.
* **Key arguments:** `role`, `city`, `seniority`, `industry`, `company_size`, `region` (`mainland`, `greater`, `intl`, `all`)
* **Example call:**
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_market_summary",
    "arguments": {
      "role": "Software Engineer",
      "city": "Shanghai",
      "seniority": "Senior"
    }
  }
}
```

### 2. `calculate_all_in_employer_cost`
Calculate total all-in employer headcount cost in China including mandatory statutory social security (**五险一金** — Pension, Medical, Housing Fund, Unemployment, Work Injury) using exact municipal floors (60% avg wage) and ceilings (300% avg wage) across 20+ Chinese cities. Accepts an explicit monthly salary or automatically looks up the `P50` market median for `role` + `city`.
* **Key arguments:** `city` (required), `role`, `seniority`, `monthly_salary_cny`

### 3. `calculate_compensation_arbitrage`
Compute cross-city compensation arbitrage, annual CNY & USD payroll savings, all-in statutory overhead, and equivalent headcount runway expansion between Tier-1 hubs (Shanghai, Beijing, Shenzhen, Guangzhou) and New Tier-1 hubs (Chengdu, Wuhan, Xi'an, Hefei, Suzhou, Hangzhou).
* **Key arguments:** `role`, `source_city`, `target_city`, `headcount`, `seniority`

### 4. `get_salary_trend`
Track month-over-month median (`P50`) salary changes for a role and city over time.
* **Key arguments:** `role`, `city`, `seniority`

### 5. `get_skill_demand`
Rank skills by frequency in verified job postings alongside their median salary premium.
* **Key arguments:** `role`, `city`, `region`, `category`

### 6. `search_companies`
Search Chinese & APAC employers by English or Chinese name, industry, size tier, or macro industry.

### 7. `get_company_info`
Retrieve detailed firmographic profile data for a specific employer.

### 8. `get_company_jobs`
Retrieve paginated historical job postings and salary bands for a specific company ID.

### 9. `get_dataset_trends`
Inspect weekly hiring frequency / share-of-voice signals per company, role, and city within the ingested dataset.

### 10. `list_roles`
List all standardized job roles (`500+`). Always call this (or `GET /api/v1/taxonomies/roles`) to match exact canonical role names.

### 11. `list_cities`
List all genuine metropolitan and prefecture cities in the dataset. Filterable by `region` (`mainland`, `greater`, `intl`).

### 12. `list_taxonomies`
List all industries, seniority levels, education levels, and company size tiers.

### 13. `get_stats`
Retrieve high-level dataset counts (total companies, salary datapoints, market summaries, distinct roles, cities, and available months).
