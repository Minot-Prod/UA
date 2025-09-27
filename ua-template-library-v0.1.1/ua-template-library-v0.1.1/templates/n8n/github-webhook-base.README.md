# GitHub Webhook → Process (Base)
## But
Recevoir des événements GitHub via webhook et extraire les champs clés.
## Configuration
- Créer un Webhook GitHub vers `/webhook/ua/github` (content type JSON).
- Sélectionner les events souhaités (push, issues, PR).
## Étapes
1. Importer le JSON dans n8n.
2. Manual Run + test avec `curl`.
