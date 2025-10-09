# UA Prompts SOP — Mode Agent + SDK
## Objectif
Déployer et maintenir un parc de prompts allégé, centré sur la logique métier (UA/MA/MAP), en déléguant la plomberie au SDK.

## Bonnes pratiques
- **Tagger** chaque prompt avec `id`, `agent`, `category`.
- **Valider** les sorties via le schéma UAS (JSON).
- **Journaliser** latence/tokens quand dispo.
- **A/B** sur prompts critiques (LibraryAgent).
- **Vector Store** pour mémoire longue (OpsAgent).

## Check CI (exemple)
- `schema-lint` (jq/pydantic/guardrails)
- `prompt-e2e` (exécutions sèches)
- `llm-observability` (collecte metrics)

## Governance
- Base44 + Mantra Yomi → garde-fous non négociables.
- `Risk_Tolerance_Profile.md` versionné.
- `Back to Yomi` si dérive.

