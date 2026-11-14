#!/usr/bin/env bash
set -euo pipefail

API_KEY="${TEAMEDUP_API_KEY:?Set TEAMEDUP_API_KEY first}"
BASE_URL="https://intelligence.teamedupchina.com/api/v1"

# 1. Zero-credit taxonomy discovery
curl -sS "${BASE_URL}/taxonomies/roles" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Accept: application/json" | head -c 400
echo ""

# 2. Query market summary percentiles (P25, P50, P75, P90 in CNY/month)
curl -sS "${BASE_URL}/market-summaries?role=Software+Engineer&city=Shanghai&seniority=Senior" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Accept: application/json"
echo ""
