# QA_POLICY.md

## Objectif
Garantir une qualité A+ des livrables UA (précision, clarté, actionnabilité).

## Méthodologie
- Tests d’acceptation UA : Handshake, Routing, Arbitration, Reporting.
- CI E2E obligatoire sur PR main.
- DocOps lint : sections requises, liens valides, tables lisibles.

## KPIs
- Taux de CI verte ≥ 95% sur 30 jours
- Score QA (auto/manuel) ≥ 95/100
- Temps moyen de correction < 24h

## Process
- PRs : 1 reviewer min (ou Doc Guardian pour docs).
- Gate 70% crédits : pause + Go/No-Go.
- Rapport hebdo QA (agrégé CI + DocOps).

## Mise à jour
Mensuelle par QA Guardian.
