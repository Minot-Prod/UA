# Parlios v1 — Preview statique

**Généré le 2025-10-11 22:21:33**  
Prototype HTML/CSS/JS natif, prêt pour Netlify Drop, avec branding Parlios et accessibilité AA.

## Structure
```
/index.html
/assets/css/styles.css        # CSS non-critique + override mobile hero
/assets/js/app.js            # Menu mobile, smooth scroll (respecte prefers-reduced-motion)
/assets/brand/parlios-logo.png
/assets/img/hero.webp        # Hero desktop optimisé
/assets/img/hero-mobile.webp # Hero mobile optimisé (≤540 px)
/assets/img/og-cover.png     # OpenGraph 1200×630
/manifest.json
/robots.txt
/sitemap.xml
```
## Points clés UX/UI
- Fond anthracite `#0B0B0F`, halo cyan (`#3FE2B8`/`#B4F2E8`) subtil.
- Hiérarchie claire : H1 + sous-titre + double CTA visibles au premier écran (desktop).
- Navigation clavier, **skip-link**, focus visibles, `prefers-reduced-motion` respecté.
- Grilles responsives (3→1, 4→2→1), menu burger accessible.

## Intégration des visuels fournis
- **Logo principal** : `assets/brand/parlios-logo.png` (source remix rouge).
- **Héro desktop** : `assets/img/hero.webp` (compressé, max 1920px).
- **Héro mobile** : `assets/img/hero-mobile.webp` (activé < 540px via media query).
- **OpenGraph** : `assets/img/og-cover.png` (1200×630).

## Déploiement (Netlify Drop)
1. Zippez ce dossier (ou utilisez le zip fourni).
2. Déposez le `.zip` sur https://app.netlify.com/drop
3. Vérifiez le rendu mobile : le hero bascule automatiquement sur `hero-mobile.webp` < 540px.

## Personnalisation rapide
- **Titres/CTA** : modifiez dans `index.html` (sections balisées).
- **Palette** : variables CSS dans `<style>` de `index.html` (`--accent`, `--halo`, etc.).
- **Images** : remplacez `assets/img/hero.webp` et `hero-mobile.webp` par vos exports optimisés.

## Licence & crédits
Visuels fournis par le client. Prototype à usage interne d’évaluation UX/UI.
