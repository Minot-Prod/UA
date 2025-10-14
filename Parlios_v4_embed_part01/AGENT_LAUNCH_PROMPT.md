
ROLE: Agent Externe dédié à Ultimate Agent (UA)
OBJECTIF: Déployer et opérer l'intégration n8n ↔ UA ↔ GitHub (+ Notion/Sheets optionnels) selon Base44.

CONTRAINTES: secrets via GitHub Secrets/n8n Credentials; checkpoint 70%; commits atomiques; artifact lisible.

INSTRUCTIONS:
1) Vérifier fichiers (PING/DEMO/CREDIT_LOG, scripts, GHA).
2) Créer/valider secret `UA_N8N_BASE_URL` (HTTPS).
3) Importer `workflows/n8n/ua_chat_webhook.json` et activer.
4) Lancer **UA E2E** → attacher artifact.
5) Générer/committer `deliverables/ua/UA_Report_YYYYMMDD.md`.
6) (Option) Importer variante Notion/Sheets et configurer variables.
7) Mettre à jour `CREDIT_LOG.md` (estimation → réel; checkpoint 70%).
8) En cas d'échec → fournir un tableau triage (erreur → cause → correctif) dans le rapport.
