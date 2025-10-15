
# Guide rapide — Ouvrir le PR (Minot-Prod/UA)

## Branche
- Nom suggéré: `feat/expert-augmented-uas-v2`

## Fichiers ajoutés
- Profils agents v2, policies, configs, tests red-team, workflows CI.

## Commandes (bash)
```bash
# depuis un clone local de Minot-Prod/UA
git checkout -b feat/expert-augmented-uas-v2
rsync -av --exclude 'commit_pr.*' ./PR_Minot-Prod_UA_Expert_Augmented/ ./
git add .
git commit -m "feat: expert-augmented workflow pack (UAS v2): policies, profiles, tests, CI"
git push -u origin feat/expert-augmented-uas-v2
# puis ouvrir le PR sur GitHub
```

## Commandes (PowerShell)
```powershell
# depuis un clone local de Minot-Prod/UA
git checkout -b feat/expert-augmented-uas-v2
robocopy .\PR_Minot-Prod_UA_Expert_Augmented . /E /NFL /NDL /NJH /NJS /NC /NS | Out-Null
git add .
git commit -m "feat: expert-augmented workflow pack (UAS v2): policies, profiles, tests, CI"
git push -u origin feat/expert-augmented-uas-v2
# puis ouvrir le PR
```
