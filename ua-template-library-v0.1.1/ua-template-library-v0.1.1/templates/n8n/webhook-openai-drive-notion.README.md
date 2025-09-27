# Webhook → OpenAI → Drive (+ Notion log)
## But
Recevoir un texte via Webhook, générer un contenu via OpenAI, sauvegarder dans Drive et logguer dans Notion.
## Variables
- `NOTION_DB_CONTENT` (DB cible Notion)
- `GOOGLE_DRIVE_FOLDER_ID` (optionnel)
## Étapes
1. Créer credentials OpenAI, Google Drive, Notion dans n8n.
2. Importer le JSON, activer les nodes, tester en **Manual Run**.
3. Appeler POST `/webhook/ua/content` avec `{ "text": "…" }`.
