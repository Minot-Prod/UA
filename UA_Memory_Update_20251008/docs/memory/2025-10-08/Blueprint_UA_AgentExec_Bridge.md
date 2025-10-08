# Blueprint
Goal: Donner au MAP des bras d’exécution (actions concrètes) via AgentKit/n8n + fallback computer‑use.
Context: production
Sources: MAP, Ops, QA
Decision criteria: Fiabilité, Traçabilité, Sécurité sandbox
Acceptance: - 3 actions réussies (brouillon Notion, rangement médias, event Calendar) + 1 action via fallback
Edge cases: - API manquante; authent expirée; latence; erreurs DOM pilotage
Tests: - 10 runs; 0 data‑loss; logs complets; rollback ok

## ComplexityProfile
scope_size: M
novelty: 3/5
data_volume: 2/5
integration_count: 4 (AgentKit/n8n/Notion/Calendar + fallback)
ui_depth: 2/5
risk_level: 3/5
deadline_pressure: 2/5

**Budget (indicatif)**: ~36 crédits
**Checkpoint 70%**: Go/No-Go requis.


## Notes d'implémentation
- Priorité API (n8n) > fallback Claude (Docker) si pas d’intégration fiable.
- Journalisation obligatoire (CREDIT_LOG + event log exécution). 
