# Checklist Préflight & Tests

## Préflight
- [ ] Variables `.env` renseignées (clés API, webhooks)
- [ ] Sources d’entrée validées (ex: URL, dossier Drive, inbox)
- [ ] Comptes connectés (Zapier/n8n, Notion/HubSpot, etc.)
- [ ] Limites & coûts (tokens, minutes, tasks) connus

## Tests
- [ ] Dry‑run avec échantillon *mock* (5–10 éléments)
- [ ] Vérif champs obligatoires (schéma JSON)
- [ ] Logs propres, erreurs gérées (retries/backoff)
- [ ] KPI minimums collectés (timestamp, durée, statut)
