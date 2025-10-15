# Parlios Public — Sprint 1 (Content Pack #1)

Ce dépôt contient 5 apps statiques **Netlify/GitHub Pages ready** :
- `apps/creatorhub-mini-plus`
- `apps/studio-express-ia`
- `apps/prompt-designer-pro`
- `apps/logo-flash-ai`
- `apps/caption-craft`

## Déploiement GitHub Pages
- Le workflow **Pages Deploy** publie `/` (avec `index.html`) et les 5 apps.
- Après déploiement, le workflow **QA After Deploy** lance Pa11y (AA) et Linkinator (liens 200).
- Les seuils sont stricts : si une page a des erreurs AA bloquantes → job en échec.

## Brancher l’IA en production
Évitez d’exposer vos clés côté client. Option simple : créer une Function (`/api/ai-proxy`) derrière un secret.


## Déploiement Netlify (CI complet)
- Ajoutez les **secrets** au repo: `NETLIFY_AUTH_TOKEN` et `NETLIFY_SITE_ID`.
- Le workflow `Netlify — Draft QA → Prod` va :
  1) déployer un **draft**,
  2) exécuter **Pa11y** (AA) + **Linkinator** dessus,
  3) puis déployer en **production** si tout est OK.

### Endpoints IA (sécurisés)
- Placez vos clés dans les **variables d’environnement** Netlify, pas dans le code.
- Exemple de Function: `netlify/functions/ai-proxy.mjs` (handler minimal).

