# Gold Prompts Bundle (Parlios)

Ce dossier est la **structure officielle** des Prompts Gold pour Parlios.

## Arborescence attendue
- `prompts_gold_index.json` — index master (métadonnées, tags, usages, complexité, tests)
- `workflows/` — workflows GitHub Actions, n8n/Make (exports JSON), scripts utilitaires
- `weekly/` — dépôts hebdomadaires (date-stamped) de nouvelles séries de prompts
- `samples/` — exemples annotés (avant/après), cas d’usage validés
- `docs/` — guide d’usage, conventions de nommage, checklists QA

> Note: ce commit installe la **structure** et la doc. Les prompts seront ajoutés dans les prochaines PR (source: “DeepResearch batch Oct 2025”).

## Conventions
- **Format**: JSON/MD; sections Blueprint (Goal/Scope/Acceptance), Inputs/Outputs, Tests, Links GitHub.
- **Nommage**: `gp_<domaine>_<verbe>_<suffixe>.md|json`
- **QA**: chaque prompt doit inclure des tests minimaux reproductibles.

_Mise à jour via Agent GitHub: 2025-10-16 22:50:00 -0400_
