"""Minimal Python MCP (JSON-RPC 2.0) client example for TeamedUp Intelligence."""

import json
import os
import urllib.request

MCP_URL = "https://intelligence.teamedupchina.com/api/v1/mcp"
API_KEY = os.environ.get("TEAMEDUP_API_KEY", "YOUR_API_KEY")


def mcp_call(method: str, params: dict | None = None, req_id: int = 1) -> dict:
    payload = {"jsonrpc": "2.0", "id": req_id, "method": method}
    if params is not None:
        payload["params"] = params

    req = urllib.request.Request(
        MCP_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


if __name__ == "__main__":
    # 1. Discover tools (0 credits)
    tools = mcp_call("tools/list", req_id=1)
    print("Available MCP tools:", [t["name"] for t in tools["result"]["tools"]])

    # 2. Query Shanghai Senior Software Engineer salary bands (1 credit)
    summary = mcp_call(
        "tools/call",
        {
            "name": "get_market_summary",
            "arguments": {
                "role": "Software Engineer",
                "city": "Shanghai",
                "seniority": "Senior",
            },
        },
        req_id=2,
    )
    print(json.dumps(summary["result"], indent=2, ensure_ascii=False))
