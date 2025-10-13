# Agent Brief — Parlios

## Contexte
Parlios : un **partenaire d’affaires IA** pour entrepreneurs. Aujourd’hui, une **boîte à outils gratuite**; bientôt, un **Hub central** (pilotage projets/outils/collab/perf).

Le site Netlify existe déjà. Les pages doivent fonctionner en **URLs jolies** (`/page/`) ET en `.html` (`/page.html`).

## Mission de l’agent
- Intégrer les **textes validés** dans les sections/pages existantes.
- Créer/compléter les **pages manquantes** pour éliminer les 404.
- Ajouter une **section/page “Preview du Hub Parlios”** (sans survendre, clair sur l’étape “bientôt”).
- Lister et intégrer les **outils gratuits** (4 actifs + 4 à débloquer), avec export simple.
- Préserver le style existant, utiliser nos **tokens design** si utile.

## Contraintes
- **Pas de backend**. Préférer `mailto:` pour contact/newsletter ou intégrer des services tiers quand les liens seront fournis.
- **Accessibilité** : labels, aria, contrastes, focus visible.
- **SEO** : balises `<title>`, `<meta name="description">`, sitemap, 404.html.
- **Internationalisation** : `[data-i18n]` prêt si on active EN.

## Acceptation (DoD)
- Aucune 404 sur les liens du menu.
- Les pages listées dans `data/routes.json` existent en **deux formats** : `slug/` et `slug.html`.
- Les textes de `content/*.md` sont présents **intégralement** dans les pages.
- Les liens de `data/links_placeholders.json` sont branchés (si fournis).
- `sitemap.xml` à jour, `robots.txt` intact, `manifest.json` intact.
- Tests responsive OK (< 640px).

## Notes
- En cas de conflit CSS, encapsuler le style d’une section (scoped) ou appliquer les tokens de `design/tokens.css`.
