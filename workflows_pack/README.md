# Parlios/UA — Pack Workflows GitHub (prêt à l’emploi)

Ce pack contient 14 workflows entièrement fonctionnels. Copie/colle le dossier `.github/` à la racine d’un repo.

## Pré-requis (secrets / permissions)
- **UA_N8N_BASE_URL** (URL du webhook n8n) — pour `ua-e2e.yml`
- **SNYK_TOKEN** — pour `snyk.yml` (optionnel si tu n’utilises pas Snyk)
- **GITHUB_TOKEN** — fourni automatiquement par GitHub Actions
- Pour `docker-build-push.yml`: aucune config supplémentaire si tu pousses vers `ghcr.io` (utilise `GITHUB_TOKEN`).

## Liste des workflows
- `ci-node.yml` — Build & tests Node/React (cache PNPM)
- `ci-python.yml` — Tests Python (pytest + cache pip)
- `codeql.yml` — Analyse CodeQL (JS/TS + Python)
- `secrets-scan.yml` — Scan de secrets (TruffleHog)
- `snyk.yml` — Scan vulnérabilités des dépendances (SARIF)
- `super-linter.yml` — Lint multi-langages
- `docker-build-push.yml` — Build multi-arch & push vers GHCR
- `release-semrel.yml` — semantic-release (versioning + changelog auto)
- `release-please.yml` — release-please (PR de release automatisée)
- `stale.yml` — Ménage des issues/PR inactives
- `pages.yml` — Build & déploiement GitHub Pages
- `auto-pr.yml` — Génération de PR automatique depuis script
- `ua-security-weekly.yml` — Pack sécurité hebdo (CodeQL/Snyk/TruffleHog)
- `ua-e2e.yml` — E2E: ping n8n + artefacts de réponse

## Notes
- Adapte les versions de Node/Python si besoin.
- Les workflows sont idempotents et pensés pour `ubuntu-latest`.
- Tu peux activer/désactiver chaque workflow depuis l’onglet *Actions*.