#!/usr/bin/env bash
set -euo pipefail

if [ -z "${UA_N8N_BASE_URL:-}" ]; then
  echo "Please export UA_N8N_BASE_URL=https://<your-n8n>/webhook-test/ua/chat"
  exit 1
fi

echo "== Replaying queued requests to: $UA_N8N_BASE_URL =="
for f in PING.json DEMO.json; do
  echo "--> POST $f"
  curl -sS -X POST "$UA_N8N_BASE_URL" -H "Content-Type: application/json" --data @"$f" | jq . || true
  echo
done
