# Ultimate Agent — Workflows

[![CI Web](https://github.com/Minot-Prod/UA/actions/workflows/ci_web.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/ci_web.yml)
[![QA Web](https://github.com/Minot-Prod/UA/actions/workflows/qa_web.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/qa_web.yml)
[![Netlify Deploy](https://github.com/Minot-Prod/UA/actions/workflows/netlify_deploy.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/netlify_deploy.yml)
[![CodeQL](https://github.com/Minot-Prod/UA/actions/workflows/codeql.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/codeql.yml)
[![Security Weekly](https://github.com/Minot-Prod/UA/actions/workflows/security_weekly.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/security_weekly.yml)
[![UA E2E n8n](https://github.com/Minot-Prod/UA/actions/workflows/ua_e2e_n8n.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/ua_e2e_n8n.yml)
[![Release Auto](https://github.com/Minot-Prod/UA/actions/workflows/release_auto.yml/badge.svg)](https://github.com/Minot-Prod/UA/actions/workflows/release_auto.yml)

---

## How to run the workflows

### 1) CI Web (auto)
- **Triggers**: `push` / `pull_request` sur `main` et `develop`.
- **Ce que ça fait**: install, lint, tests, build + upload artefact `web-dist`.

### 2) QA Web (auto sur PR / manuel)
- **Triggers**: `pull_request` et `workflow_dispatch`.
- **Ce que ça fait**: build local + http-server → Lighthouse, Pa11y, Linkinator → artefact `qa-reports`.

### 3) Netlify Deploy (auto sur `main` / manuel)
- **Secrets requis**: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
- **Triggers**: `push` sur `main` (prod) et `workflow_dispatch` (staging).

### 4) CodeQL (auto hebdo + sur push/PR)
- Analyse statique de sécurité sur JS.

### 5) Security Weekly (auto hebdo)
- `npm audit --audit-level=high`, `osv-scanner`, `secretlint` (si config).

### 6) UA E2E n8n (manuel)
- **Secret requis**: `UA_N8N_BASE_URL`.
- Envoie `PING.json` et `DEMO.json` → artefact `ua-e2e-results`.

### 7) Release Auto (manuel + tag)
- `workflow_dispatch` avec `version` (ex: `v1.2.3`) ou push de tag `v*.*.*`.
- Génère des notes et crée la Release.

---

## Secrets à définir
- `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, `UA_N8N_BASE_URL`.

---

## QA rapide
- Sur une PR, télécharger `qa-reports` et viser Lighthouse ≥ 90 / Pa11y 0 erreurs / Linkinator 0 liens cassés.

---

> Fichier ajouté automatiquement par "Workflows Pack v1".
