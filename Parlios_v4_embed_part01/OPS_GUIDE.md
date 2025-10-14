# OPS_GUIDE — UA External Agent (≤25 files)

## 1) Test E2E (GitHub Actions)
# README_TestE2E

## Usage
- Définir `UA_N8N_BASE_URL` dans GitHub Secrets.
- Actions → UA E2E → Run → vérifier l'artifact.
- En local: `scripts/replay.sh` ou `scripts/replay.ps1`.

## Dépannage rapide
- 4xx: route/webhook/auth/CORS
- 5xx: logs n8n / reverse proxy / timeout
- TLS: chaîne certs + SNI
- Secret absent: définir `UA_N8N_BASE_URL`

## Rapport
- Généré automatiquement: `deliverables/ua/UA_Report_YYYYMMDD.md`.


## 2) Sécurité
# SECURITY

- Ne jamais commit de secrets (tokens, base_url privées).
- Utiliser GitHub Secrets / n8n Credentials uniquement.
- Masquer les valeurs sensibles dans les logs (set-output/echo).

## 3) Miroir Notion (recommandé)
# NOTION_SETUP

## Objectif
Activer le **miroir Notion** pour les rapports UA (double mémoire).

## Étapes
1. Crée une base Notion avec les propriétés:
   - **Name** (title), **Date** (date), **Intent** (select), **Status** (select), **LatencyMs** (number), **CostCredits** (number), **Notes** (rich_text).
   *(Le fichier `templates/notion_db_schema.json` donne le schéma conseillé.)*

2. Crée une **integration** Notion (https://www.notion.so/my-integrations) et copie le **Internal Integration Token**.
3. Partage la base avec ton integration (Share → Invite).
4. Dans n8n → Credentials → **Notion API** :
   - Token = *Internal Integration Token*.
   - Nom cred: **Notion API** (ou ce que tu veux).
   - Note son **ID** si tu veux l'injecter via `$env.NOTION_CRED_ID` (facultatif).

5. Récupère l'ID de la base Notion (copie le lien → ID est le long uuid). Dans n8n → **Variables d'environnement**:
   - `NOTION_DB_ID` = ton database id
   - *(optionnel)* `NOTION_CRED_ID` = id de credential n8n

6. Importe le workflow `workflows/n8n/ua_chat_webhook_memory_notion.json`, active-le.
7. Teste :
   ```bash
   curl -sS -X POST "$UA_N8N_BASE_URL" -H "Content-Type: application/json" -d '{"intent":"PING"}' | jq
   ```
8. Vérifie que la page s'est créée dans Notion.


## 4) Miroir Google Sheets (option)
# DRIVE_SETUP (Google Sheets)

## Objectif
Activer le **miroir Google Sheets** (Drive/Sheets) pour les rapports UA.

## Étapes
1. Crée un fichier Google Sheets avec un onglet `Sheet1` et les colonnes:
   `Date | Intent | Status | LatencyMs | CostCredits | Notes`

2. Copie l'ID du fichier (dans l'URL).

3. Dans n8n → Credentials → **Google Sheets OAuth2**:
   - Crée un credential OAuth2 avec ton compte Google (Domino et la Grenouille).
   - Donne-lui accès au fichier (si demandé).

4. Dans n8n → **Variables d'environnement**:
   - `GSHEET_ID` = l'ID du fichier Sheets
   - *(optionnel)* `GSHEETS_CRED_ID` = id du credential si tu veux forcer

5. Importe `workflows/n8n/ua_chat_webhook_memory_drive.json`, active-le.

6. Test:
   ```bash
   curl -sS -X POST "$UA_N8N_BASE_URL" -H "Content-Type: application/json" -d '{"intent":"DEMO"}' | jq
   ```
7. Vérifie que la ligne s'est ajoutée dans la feuille.


## 5) Prompt Mode Agent (copier-coller)
```
ROLE: Agent Externe dédié à Ultimate Agent (UA)
OBJECTIF: Déployer et opérer l'intégration n8n ↔ UA ↔ GitHub (+ Notion optionnel) selon le Blueprint Base44 fourni.

CONTRAINTES:
- Secrets via GitHub Secrets / n8n Credentials (jamais en clair).
- Checkpoint 70% crédits → Go/No-Go.
- Commits atomiques et artifacts lisibles.

INSTRUCTIONS HAUT NIVEAU:
1) Vérifie la présence des fichiers: PING.json, DEMO.json, CREDIT_LOG.md, scripts, workflow GHA.
2) Crée/valide le secret `UA_N8N_BASE_URL`. N'ajoute jamais de valeur en clair aux logs.
3) Configure le workflow n8n (template `workflows/n8n/ua_chat_webhook.json`). Exige HTTPS.
4) Exécute le workflow GitHub **UA E2E** (manual dispatch). Sauvegarde l'artifact.
5) Génère/commit le rapport `deliverables/ua/UA_Report_YYYYMMDD.md`.
6) (Optionnel) Active le miroir Notion (templates/notion_db_schema.json), push des entrées.
7) Mets à jour CREDIT_LOG (estimation → réel), note le checkpoint 70%.
8) Si échec, fournis un tableau triage (erreur → cause → correctif) dans le rapport.

SORTIES ATTENDUES:
- Artifact `ua-e2e-results`
- Rapport du jour committé
- CREDIT_LOG incrementé

```
