#!/usr/bin/env node
/**
 * Minimal zero-dependency stdio-to-Streamable-HTTP bridge for TeamedUp Intelligence MCP.
 * Usage:
 *   TEAMEDUP_API_KEY=tu_live_... npx github:bp46/teamedup-intelligence-mcp
 */
const readline = require("node:readline");

const MCP_URL = process.env.TEAMEDUP_MCP_URL || "https://intelligence.teamedupchina.com/api/v1/mcp";
const API_KEY = process.env.TEAMEDUP_API_KEY || "";

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  try {
    const res = await fetch(MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(msg),
    });

    if (res.status === 204) return;
    const text = await res.text();
    if (text.trim()) {
      process.stdout.write(text.trim() + "\n");
    }
  } catch (err) {
    if (msg.id !== undefined) {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id: msg.id,
          error: { code: -32603, message: `Upstream MCP request failed: ${err.message}` },
        }) + "\n"
      );
    }
  }
});
