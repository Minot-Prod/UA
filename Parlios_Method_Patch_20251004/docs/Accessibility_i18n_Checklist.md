# Accessibilité & i18n — Checklist (WCAG 2.2 AA)

## Critères WCAG 2.2 ajoutés / sensibles
- **2.4.11 Focus not obscured (Minimum)** — Indicateur de focus toujours visible.
- **2.4.12 Focus not obscured (Enhanced)** — (objectif recommandé).
- **2.4.13 Focus appearance** — Contraste/épaisseur de focus suffisants.
- **2.5.7 Dragging Movements** — Alternatives clavier aux drag & drop.
- **2.5.8 Target Size (Minimum)** — Cibles ≥ 24×24 px CSS (sauf exceptions).
- **3.3.8 Accessible Authentication (Minimum)** — Auth sans test cognitif (ex: no puzzle).
- **3.3.9 Accessible Authentication (Enhanced)** — recommandé.

## Base AA (extraits clés)
- Couleurs : contraste **≥ 4.5:1** (texte normal).
- Clavier : navigation complète, ordre logique, `skip links`.
- ARIA : rôles/props valides, noms accessibles (label/title/aria‑label).
- Médias : textes alternatifs, sous‑titres/ transcripts si applicable.
- Erreurs formulaires : message clair + association au champ.
- Focus management : retour focus après modals/routage.
- Animations : réduire mouvement (prefers‑reduced‑motion).

## i18n
- ICU Messages / pluralisation / genres.
- Formats numériques/monétaires par locale.
- RTL support (dir=rtl), test pseudo‑localisation.
