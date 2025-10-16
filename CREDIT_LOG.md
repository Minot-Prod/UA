# T-0 HTTPS Playbook (Generated 2025-09-23T04:53:57)
## Prérequis
- DNS → n8n, TLS OK, 443 ouvert, secret GitHub `UA_N8N_BASE_URL` défini
## Smoke Tests
curl -s -X POST "$UA_N8N_BASE_URL" -H "Content-Type: application/json" -d @PING.json | jq
curl -s -X POST "$UA_N8N_BASE_URL" -H "Content-Type: application/json" -d @DEMO.json | jq
## En cas d'échec / Rollback
(voir détails complets dans la version originale)
