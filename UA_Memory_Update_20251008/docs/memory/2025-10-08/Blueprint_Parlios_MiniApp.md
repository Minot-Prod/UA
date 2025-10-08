# Blueprint
Goal: Piloter Parlios (hooks→variantes→visuel→brouillon+calendar) directement dans ChatGPT via Apps SDK.
Context: production
Sources: UA, MAP
Decision criteria: Impact UX, Friction zéro, Stabilité, Mesure adoption
Acceptance: - Sélecteur de hooks, génération de 3 variantes, choix 1 visuel, création brouillon + event Calendar, recap visible
Edge cases: - Accès SDK limité; quota API; erreurs génération visuelle
Tests: - 5 runs end‑to‑end; 0 blocant; temps médian < 3 min; recap cohérent

## ComplexityProfile
scope_size: S
novelty: 3/5
data_volume: 1/5
integration_count: 3 (Apps SDK, Notion, Calendar)
ui_depth: 3/5
risk_level: 2/5
deadline_pressure: 2/5

**Budget (indicatif)**: ~24 crédits
**Checkpoint 70%**: Go/No-Go requis.


## Notes d'implémentation
- Composants: liste hooks, boutons “Générer variantes”, “Choisir visuel”, “Créer brouillon”, “Créer event”.
- Logs: écrire une trace récapitulant décision + liens (Notion page, Calendar event).
