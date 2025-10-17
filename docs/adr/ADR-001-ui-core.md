# ADR-001 — Séparation UI ↔ Core (UA)

## Contexte
Les archives historiques contiennent des workflows/agents (core) mélangés à des éléments UI. Mélange = dette & risques.

## Décision
- Centraliser **tout le Core** (orchestration, rules, actions réutilisables, system cards) dans le repo **UA**.
- Les **UI** (Site-Parlios, Parlios.app) **appellent** les workflows UA (`workflow_call`) → zéro duplication.
- Uniformiser `main`, protections, CI gates, versioning, secrets.

## Conséquences
+ Mises à jour Core → effet immédiat sur toutes les UI.  
+ PRs plus petites, qualité maîtrisée, rollback facile.  
– Besoin d’un “charter” et de templates CI (cette ADR + repo-charter).
