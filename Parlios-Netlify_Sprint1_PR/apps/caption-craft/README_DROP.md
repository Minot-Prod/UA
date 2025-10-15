# Caption Craft — Parlios (Netlify Drop)

**But** : Rédiger des légendes optimisées + hashtags (FR/EN).

## Déploiement rapide (Netlify Drop)
1. Ouvrez https://app.netlify.com/drop
2. Glissez le ZIP de ce dossier.
3. C’est en ligne 🚀

## Configuration (branchez l’IA)
- Éditez `assets/config.js` pour renseigner vos endpoints IA (texte/image).
- En prod, évitez d’exposer vos clés côté client (utilisez Netlify Functions/Edge).

## Accessibilité & Performance
- Cible : Lighthouse ≥ 90, Pa11y AA (0 erreurs bloquantes).
- Design responsive et contraste renforcé.

## Structure
```
/assets
  |- config.js    # endpoints à brancher
  |- script.js    # logique client
  |- parlios.svg  # logo
  |- favicon.svg
index.html
README_DROP.md
QA_REPORT.md
tokens.parlios.json
```

## Licence
© 2025 Parlios — Tous droits réservés.
