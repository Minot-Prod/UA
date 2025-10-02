# Parlios — Bibliothèque de Prompts (v2, Base44-Enhanced)
**Date :** 2025-10-02

Cette v2 inclut la v1 + un **pack Base44-Enhanced** (Blueprint, ComplexityProfile, CREDIT_LOG, 70% checkpoint, OWASP LLM guardrails, sorties JSON strictes, schémas, CI de validation).

## Nouveautés v2
- `06_Base44_Enhanced/` (addon à coller dans tout prompt)
- Schémas JSON (UI, Backend, Bundle)
- Checklists OWASP LLM (dev/prod)
- Templates QA (perf, a11y, tests)
- **GitHub Actions** : `.github/workflows/prompt-validate.yml` (valide les sorties JSON lors des runs outillés)

## Structure
- v1: `00_README.md`, `01_Principes_Bases.md`, `02_Ressources.md`, `03_Prompts_Types/`, `04_Workflow_Construction.md`, `05_Pieges_A_Eviter.md`, `99_Templates/`
- v2: `06_Base44_Enhanced/` + `.github/workflows/prompt-validate.yml`

> Intégration recommandée : placez ce dossier dans votre repo sous `prompts/Parlios_Prompt_Library_v2/`.
