# SuiteCRM

**Stack :** PHP + MySQL/MariaDB  
**Licence :** AGPL-3.0 (open‑source)  
**Description :** CRM complet auto‑hébergeable (fork de SugarCRM).

**Docs / API :** https://docs.suitecrm.com & https://github.com/SuiteCRM/SuiteCRM-Core

## Installation rapide
```bash
docker compose up -d
```

## Fichiers clés
- `.env`
- `README.md`
- `docker` (selon images)
- scripts d’installation

## Intégration n8n / UA
- API REST v8
- Webhooks/email → n8n
- Sync leads/opportunités vers dashboards
