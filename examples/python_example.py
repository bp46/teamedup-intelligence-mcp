import os
import requests

API_KEY = os.environ["TEAMEDUP_API_KEY"]
BASE_URL = "https://intelligence.teamedupchina.com/api/v1"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Accept": "application/json",
}

resp = requests.get(
    f"{BASE_URL}/market-summaries",
    headers=HEADERS,
    params={
        "role": "Software Engineer",
        "city": "Shanghai",
        "seniority": "Senior",
    },
    timeout=15,
)
resp.raise_for_status()
print(resp.json())
