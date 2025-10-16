# QA Report — Workflows Pack v1

## Contenu
- CI Web (build+tests+lint+cache)
- QA Web (Lighthouse, Pa11y, Linkinator)
- Netlify Deploy (staging/prod)
- CodeQL
- Security Weekly (npm audit, OSV, secretlint)
- UA E2E n8n (PING/DEMO)
- Release Auto
- PR Labeler + .github/labeler.yml
- Dependabot weekly

## Secrets requis
- `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`
- `UA_N8N_BASE_URL`

## Tests d'acceptation
- Lancement manuel `UA E2E n8n` -> artefact `ua-e2e-results`
- PR -> `QA Web` se déclenche et génère `qa-reports`
- Push sur main -> `Netlify Deploy` passe
- Lundi -> `Security Weekly` + `CodeQL`
- Tag `vX.Y.Z` -> `Release Auto`
