// Minimal TypeScript MCP (JSON-RPC 2.0) client example for TeamedUp Intelligence

const MCP_URL = "https://intelligence.teamedupchina.com/api/v1/mcp";
const API_KEY = process.env.TEAMEDUP_API_KEY ?? "YOUR_API_KEY";

async function mcpCall(method: string, params?: Record<string, unknown>, id = 1) {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, ...(params ? { params } : {}) }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  // 1. List available MCP tools (0 credits)
  const listRes = await mcpCall("tools/list", undefined, 1);
  console.log(
    "Available MCP tools:",
    listRes.result.tools.map((t: { name: string }) => t.name)
  );

  // 2. Calculate all-in China employer statutory cost (五险一金) in Shanghai (1 credit)
  const costRes = await mcpCall(
    "tools/call",
    {
      name: "calculate_all_in_employer_cost",
      arguments: {
        city: "Shanghai",
        role: "Software Engineer",
        seniority: "Senior",
      },
    },
    2
  );
  console.log(JSON.stringify(costRes.result, null, 2));
}

main().catch(console.error);
