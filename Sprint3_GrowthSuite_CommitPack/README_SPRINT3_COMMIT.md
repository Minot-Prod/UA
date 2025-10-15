# Sprint 3 — Growth Suite Commit Pack
_MAJ_: 2025-10-15 17:38

Ce pack contient tout pour **committer** le Sprint 3 (docs + blueprints) et **créer l’issue** correspondante.

## Contenu
- `docs/SPRINT3_PLAN.md` — plan du sprint
- `docs/CREDIT_LOG_SPRINT3.md` — budget prévisionnel
- `docs/Blueprint_*.md` — blueprints par app
- `docs/QA_REPORT_*.md` — checklists QA par app
- `.github/ISSUE_TEMPLATE/sprint3_growth_suite.md` — template d’issue
- `scripts/create_sprint3_issue.sh|.ps1` — création d’issue via gh
- `scripts/commit_docs.sh|.ps1` — commit/push des docs

## Procédure (Linux/macOS)
```bash
unzip Sprint3_GrowthSuite_CommitPack.zip -d repo
cd repo
bash scripts/commit_docs.sh main
GH_OWNER=Minot-Prod GH_REPO=Parlios-Public bash scripts/create_sprint3_issue.sh
```

## Procédure (Windows PowerShell)
```powershell
Expand-Archive .\Sprint3_GrowthSuite_CommitPack.zip -DestinationPath repo
Set-Location repo
.\scripts\commit_docs.ps1 -Branch main
.\scripts\create_sprint3_issue.ps1 -Owner "Minot-Prod" -Repo "Parlios-Public"
```

> Prérequis : Git configuré, accès au remote, GitHub CLI (`gh`) loggé.
