# Parlios — GitHub Actions CI/CD (Netlify)

Ce workflow déploie automatiquement le **repo `parlios-site`** sur Netlify.
Il assemble les assets provenant de repos/dossiers vendorisés (submodules) :
- `vendor/branding`
- `vendor/seo`
- `vendor/devops-netlify`
- `vendor/analytics`
- `vendor/docs` (optionnel)
- `vendor/qa-a11y` (optionnel)

## Pré-requis

1) Dans **parlios-site**, ajoutez les submodules (exemples) :
```bash
git submodule add https://github.com/votre-org/parlios-branding vendor/branding
git submodule add https://github.com/votre-org/parlios-seo vendor/seo
git submodule add https://github.com/votre-org/parlios-devops-netlify vendor/devops-netlify
git submodule add https://github.com/votre-org/parlios-analytics vendor/analytics
git submodule add https://github.com/votre-org/parlios-qa-a11y vendor/qa-a11y
git submodule add https://github.com/votre-org/parlios-docs vendor/docs
git commit -m "Add Parlios submodules"
```

2) Placez votre **site** (pages HTML/CSS/JS) dans le dossier `site/` à la racine du repo `parlios-site`.

3) Dans GitHub → **Settings → Secrets and variables → Actions**, ajoutez :
- `NETLIFY_AUTH_TOKEN` — token Netlify (User settings → Applications → Personal access tokens).
- `NETLIFY_SITE_ID` — ID du site Netlify cible.

## Déploiement manuel
Le workflow supporte `workflow_dispatch`. Allez dans **Actions → Deploy Parlios Site to Netlify → Run workflow**.

## Notes
- Le job copie automatiquement : favicons/OG, manifest, sitemap/robots, headers/redirects, analytics.js.
- Vous pouvez retirer ou ajouter des sources dans l’étape “Assemble from vendor repos”.