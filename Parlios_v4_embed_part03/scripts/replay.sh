#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${UA_N8N_BASE_URL:-}"
if [ -z "$BASE_URL" ]; then
  echo "Please export UA_N8N_BASE_URL=https://<n8n>/webhook/ua/chat"
  exit 1
fi
echo "== Replaying to: $BASE_URL =="
for f in PING.json DEMO.json; do
  echo "--> POST $f"
  curl -sS -X POST "$BASE_URL" -H "Content-Type: application/json" --data @"$f" | jq . || true
  echo
done
