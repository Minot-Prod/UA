
# SECURITY — UA External Agent

- Secrets **uniquement** via GitHub Secrets / n8n Credentials.
- Ne jamais afficher/echo des secrets en clair.
- Forcer HTTPS (TLS valide) pour `UA_N8N_BASE_URL` (CORS minimal).
- Limiter les scopes du PAT GitHub (si utilisé).
- Journaux: ne pas stocker d'IP ou données sensibles; privilégier latence/statut.
- Revue PR obligatoire pour changements CI/CD et workflows n8n.
