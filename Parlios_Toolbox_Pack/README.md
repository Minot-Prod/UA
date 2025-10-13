# Parlios Toolbox — Multi-Build Pack

Ce pack contient les **38 previews Netlify Drop** (front-only) + la documentation d’intégration pour le site Parlios.

## Structure
```
toolbox/
  builds/
    *.zip                   # 38 previews prêts pour Netlify Drop
  attachments/
    brand_tokens.json
    logo_parlios.svg
    manifest.webmanifest
  builds_index.md
  global_QA_summary.md
  site/
    toolbox.html            # Page statique d’index (intégrable dans le site Parlios)
    toolbox.json            # Index JSON (machine-readable)
  scripts/
    publish_netlify_drop.md # Guide de déploiement rapide
    verify_lighthouse.md    # Check QA (Lighthouse/AA)
AGENT_NOTE.md               # Message à l’agent pour finaliser et intégrer
```

## Déploiement rapide (Netlify Drop)
1. Ouvrir https://app.netlify.com/drop
2. Glisser un des ZIP dans `toolbox/builds/`
3. Partager l’URL obtenue pour test utilisateur.

## Intégration au site Parlios
- Copier le dossier `toolbox/` dans votre repo (par ex. `apps/parlios-site/static/toolbox/`).
- Publier `site/toolbox.html` comme page “Boîte à Outils”. 
- Si votre site est framework‑based (Next/Astro), vous pouvez lire `site/toolbox.json` pour générer la liste dynamiquement.
