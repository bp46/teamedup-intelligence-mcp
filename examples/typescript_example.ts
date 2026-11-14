const apiKey = process.env.TEAMEDUP_API_KEY;
if (!apiKey) {
  throw new Error("Set TEAMEDUP_API_KEY in your environment");
}

const url = new URL("https://intelligence.teamedupchina.com/api/v1/market-summaries");
url.searchParams.set("role", "Software Engineer");
url.searchParams.set("city", "Shanghai");
url.searchParams.set("seniority", "Senior");

const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  },
});

if (!res.ok) {
  throw new Error(`HTTP ${res.status}: ${await res.text()}`);
}

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
