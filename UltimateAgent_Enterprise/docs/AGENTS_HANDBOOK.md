# AGENTS_HANDBOOK.md

## Rôles principaux
- **UA (Ultimate Agent)** : arbitre, décision finale, reporting.
- **MA (Master Agent)** : idéation libre, exploration.
- **MAP (Master Agent Project)** : production stricte, Base44.
- **QA Guardian** : qualité, DocOps, score QA.
- **Ops Agent** : CI/CD, secrets, infra, Security Weekly.
- **Content Agent** : bibliothèques de prompts, équilibre texte/médias.

## KPIs par agent (exemples)
- UA : % décis. acceptées, temps décision, confiance moyenne
- MA : idées utiles/semaine, taux de reprise
- MAP : délai livrable, défauts post-merge
- QA : taux DocOps OK, score moyen QA
- Ops : MTTR incidents, runs verts
- Content : taux réutilisation prompts

## Tests d’acceptation (extrait)
- Handshake (UA↔MA, UA↔MAP)
- Routing (idéation→MA, production→MAP)
- Arbitration (conflit→synthèse + confiance)
- Reporting (rapport consolidé)

## Gouvernance
- Revue mensuelle agents (perf + incidents)
- Diagramme des responsabilités (voir /docs/diagrams)
