# PrestaShop

**Stack :** PHP (Symfony) + MySQL/MariaDB  
**Licence :** OSL-3.0 (open‑source)  
**Description :** Solution e‑commerce robuste, très utilisée en Europe, multi‑langue et riche en modules.

**Docs / API :** https://devdocs.prestashop-project.org & https://github.com/PrestaShop/PrestaShop

## Installation rapide
```bash
docker compose up -d  # images community; setup via INSTALL
```

## Fichiers clés
- `.env` / `.env.dist`
- `docker-compose.yml`
- `INSTALL.txt`
- `README.md`

## Intégration n8n / UA
- Webhooks (modules) → n8n
- Synchronisation produits/commandes via webservices (REST)
- Intégrations paiement (ex: Stripe)
