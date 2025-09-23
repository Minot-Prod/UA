# cURL HMAC examples — generated 2025-09-23

## Environment variables expected:

export FACADE_BASE=${FACADE_BASE:-http://localhost:3000}
export N8N_WEBHOOK_BASE=${N8N_WEBHOOK_BASE:-http://localhost:5678}
export HMAC_SECRET=${HMAC_SECRET:-change-me}

## Helper (Bash): HMAC SHA256 of a raw JSON body
hmac() { printf "%s" "$2" | openssl dgst -sha256 -hmac "$1" -binary | xxd -p -c 256; }

# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Content severity=high
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Content severity=medium
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Growth severity=high
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Growth severity=medium
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Growth severity=medium
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Finance severity=high
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Finance severity=high
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner=Ops severity=low
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .


# TOOL: UNKNOWN_TOOL  owner= severity=
BODY='{"ping": true}'
SIG=$(hmac "$HMAC_SECRET" '{"ping": true}')
curl -fsS -X POST "$FACADE_BASE/tools/UNKNOWN_TOOL" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY" | jq .
# Direct n8n webhook (bypass façade) for UNKNOWN_TOOL
curl -fsS -X POST "$N8N_WEBHOOK_BASE/webhook/UNKNOWN" \
  -H "Content-Type: application/json" \
  -H "X-Shared-Secret: $N8N_SHARED_SECRET" \
  -d "$BODY" | jq .

