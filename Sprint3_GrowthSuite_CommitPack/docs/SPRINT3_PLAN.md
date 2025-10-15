# Sprint 3 — Growth Suite (Plan)

_MAJ_: 2025-10-15 17:38

## Objectif
Créer 5 outils IA orientés croissance (ads, vente, pitch, landing, offre), déployables Netlify Drop, avec Prompts Gold et QA Base44.

## Outils
1. Ad Optimizer AI — Génère et teste des variantes de pubs (texte/visuel) + scores CTR/CPA (estimés).
2. SalesFlow — Cadre d’emailing multi-étapes (discovery → follow-up) avec personnalisation IA.
3. ClientPitch — Deck express (10 slides) à partir d’un brief (structure + punchlines + visuels placeholder).
4. Landing Builder — Section builder (hero, features, social proof, CTA) + export HTML/CSS.
5. Offer Craft — Offre irrésistible (promesse, bonus, garantie, pricing tiers) + section copy.

## Acceptance Criteria
- Génération < 10 s (texte; visuel = mock fallback).
- Pa11y AA 0 erreur, Lighthouse ≥ 90.
- Chaque app fournie en ZIP Netlify Drop + README_DROP + QA_REPORT.
- Budget total ≤ 150 (Base44) ; checkpoint 70 % = 105.

## Edge Cases
- API indispo → message de recharge + retry.
- Surcharge → file d’attente (mock).
- Visuel indisponible → fallback Parlios (placeholder).

## Tests
1) Génération OK (<10 s).
2) Export (HTML/ZIP/CSV selon app) OK.
3) Responsive OK.
4) Accessibilité AA OK.
5) Déploiement Netlify Drop OK.
