
# ROLLBACK — UA External Agent

## Objectif
Revenir en configuration stable si un run E2E ou une mise à jour échoue.

## Étapes
1) **Désactiver** tout schedule (si existant) dans GitHub Actions.
2) **Re-pointer** `UA_N8N_BASE_URL` vers un endpoint de test (sandbox) si besoin.
3) **Désactiver** temporairement les workflows n8n "memory" (Notion/Sheets).
4) **Activer** uniquement `ua_chat_webhook.json` (core).
5) Rejouer `./scripts/replay.sh` → vérifier ACK 200.
6) Lancer GHA **UA E2E** → artifact doit redevenir vert.
7) Documenter l'incident dans `deliverables/ua/UA_Report_YYYYMMDD.md`.
