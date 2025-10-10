# Parlios Starter Library

FR — Pack de démarrage statique prêt pour **Netlify Drop** ou **Netlify Build**.  
EN — Static starter pack ready for **Netlify Drop** or **Netlify Build**.

## Contenu / Contents
- `docs/UA_Research_Web_Models.md` — Rapport de recherche (FR/EN).
- `docs/models_comparison.csv` — Tableau comparatif.
- `templates/landing-astro-lite/` — Landing statique optimisée (FR/EN).
- `templates/landing-next-lite/` — Landing SaaS (FR/EN) en pur HTML (Drop‑ready).
- `templates/blog-eleventy-lite/` — Blog statique minimal (FR/EN).
- `netlify/_headers`, `netlify/_redirects` — Caching & routes.

## Utilisation / Usage
### Option A — Netlify Drop (zéro build)
1. Ouvrir https://app.netlify.com/drop
2. Glisser un dossier de template (par ex. `templates/landing-astro-lite/`).

### Option B — Dépôt Git + Netlify Build (SSG/SSR)
1. Pousser dans GitHub.
2. Connecter le repo à Netlify (déploiement continu).
3. Configurer `Publish directory` sur le dossier à déployer.

## i18n (FR/EN)
- Chaque template inclut un switch langue simple (JS) et balises meta de base.
- Pour le SEO international, ajouter `hreflang` et vérifier `_redirects`.

## Licence
MIT — Utilisation libre avec attribution Parlios appréciée.
