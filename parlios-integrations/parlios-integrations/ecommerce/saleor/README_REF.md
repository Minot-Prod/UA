# Saleor (Headless E‑commerce)

**Stack :** Python (Django) + GraphQL + PostgreSQL  
**Licence :** BSD-3-Clause (open‑source)  
**Description :** Plateforme e‑commerce headless, API‑first, moderne et extensible. Idéale pour front Next.js/Parlios.

**Docs / API :** https://docs.saleor.io & https://github.com/saleor/saleor

## Installation rapide
```bash
docker compose up -d  # voir docker-compose.yml pour services (db, api, dashboard)
```

## Fichiers clés
- `Dockerfile`
- `.env.example`
- `docker-compose.yml`
- `README.md` (repo)

## Intégration n8n / UA
- Webhooks: events order/payment → n8n
- Auth: tokens GraphQL
- Synchroniser produits & commandes via API GraphQL
