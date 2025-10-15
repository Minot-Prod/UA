# Blueprint — ClientPitch

## Goal
Créer un mini-deck (10 slides) à partir d’un brief

## Scope
- Inclus : UI statique Netlify Drop, intégration GPT (texte), export ZIP (HTML/PNG placeholders).
- Exclu : auth, base de données, back-office (v1).

## Acceptance
- Génération < 10 s ; Pa11y AA ; Lighthouse ≥ 90.
- Export fonctionnel.

## Edge Cases
- Entrée vide → alerte.
- API lente/erreur → message + retry.

## Tests
1) Génération.
2) Export.
3) Responsive.
4) Accessibilité.
5) Déploiement Netlify.

## Budget (Base44)
~ 30 crédits (checkpoint 70 % à 21).
