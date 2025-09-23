# UA ↔ MCP Bundle — 2025-09-23

Ce bundle contient:
- `curl_hmac_examples.sh` — cURL prêts à l'emploi par *tool_id* (façade & webhook n8n)
- `hmac_sign.sh` & `hmac_sign.py` — utilitaires pour calculer la signature HMAC-SHA256
- (optionnel) assets précédemment générés: runbook, scripts smoke, workflows CI, etc.

## Pré-requis
- `openssl`, `xxd`, `jq` installés localement
- Variables d'environnement:
  - `FACADE_BASE`, `N8N_WEBHOOK_BASE`, `N8N_SHARED_SECRET`, `HMAC_SECRET`

## Usage rapide
```bash
export FACADE_BASE="https://facade.example.com"
export N8N_WEBHOOK_BASE="https://n8n.example.com"
export N8N_SHARED_SECRET="***"
export HMAC_SECRET="***"

bash ./curl_hmac_examples.sh
# ou bien:
SIG=$(./hmac_sign.sh "$HMAC_SECRET" '{"ping":true}')
curl -H "X-Signature: $SIG" ...
```
