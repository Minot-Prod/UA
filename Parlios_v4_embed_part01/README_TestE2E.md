
# README — Tests E2E

1) Définir `UA_N8N_BASE_URL` (GitHub Secrets).
2) Importer/activer `workflows/n8n/ua_chat_webhook.json` (HTTPS).
3) GitHub → Actions → **UA E2E** → Run (inputs par défaut).
4) Télécharger `ua-e2e-results.zip` et vérifier réponses 200.
5) Vérifier `deliverables/ua/UA_Report_YYYYMMDD.md` (commit auto).
6) (Option) Activer miroir Notion/Sheets → relancer le test.
