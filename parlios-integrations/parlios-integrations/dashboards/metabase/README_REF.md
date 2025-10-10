# Metabase

**Stack :** Java (Clojure) backend + React/TS frontend  
**Licence :** AGPL-3.0 (open‑source)  
**Description :** BI simple et rapide à déployer, idéal pour dashboards Parlios (CREDIT_LOG, GitHub).

**Docs / API :** https://www.metabase.com/docs & https://github.com/metabase/metabase

## Installation rapide
```bash
docker run -d -p 3000:3000 metabase/metabase:latest
```

## Fichiers clés
- `Dockerfile`
- `config.yml.sample` (référence)
- `README.md`

## Intégration n8n / UA
- Connexion DB (Postgres/MySQL/BigQuery…)
- Export dashboards → site Parlios
