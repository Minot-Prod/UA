# Accessibilité (WCAG 2.2 AA) & i18n — Checklist

## A11Y
- Landmarks (<main>, <header>, <nav>, <footer>)
- H1 unique, hiérarchie H2/H3 logique
- Focus visible partout (clavier)
- ARIA labels sur contrôles non textuels
- Contrastes conformes
- Annonces live pour feedbacks importants

## i18n
- FR/EN (au minimum)
- Formats date/heure/monnaie locaux
- Gestion RTL si langues concernées
- Texte non codé en dur (utiliser i18n)

## Tests
- Lecteurs d’écran basiques
- Navigation clavier seule
- Lighthouse / Axe pass
