# 06 — Base44 Enhanced

Ce pack ajoute au-dessus de vos prompts :
- **Blueprint** (Goal/Scope/Non-goals/Acceptance/Edge cases/Tests)
- **ComplexityProfile** + **Budget** + **70% checkpoint**
- **CREDIT_LOG**
- **Sorties JSON strictes** (schémas fournis)
- **OWASP LLM** guardrails (format/filtrage I/O/contrainte de rôle)
- **QA** (tests, a11y, perfs) + scripts
- **CI** de validation (GitHub Actions)

## Comment utiliser
1. Collez le contenu de `prompt_addon_base44_enforced.md` **en fin de prompt** (section Contraintes).
2. Choisissez un **schéma JSON** adapté (`schemas/*.json`) et remplacez le `"$schema"` du bloc par celui que vous ciblez.
3. En CI, le workflow `prompt-validate.yml` peut valider les sorties des runs outillés.
