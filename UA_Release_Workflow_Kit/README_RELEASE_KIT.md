# UA — Release Workflow Kit
_MAJ_: 2025-10-15 19:33

Ce kit ajoute un workflow GitHub Actions qui publie automatiquement une **Release** dès qu'un tag `sprint-bundle-*` est poussé.

## Installation
1. Dézippez ce kit à la racine de votre dépôt (`Minot-Prod/UA`).
2. Commitez le fichier `.github/workflows/release-sprint-bundle.yml`.

## Déclenchement
- Poussez un tag tel que `sprint-bundle-1-3` (déjà généré par nos scripts).

## Ce que fait le workflow
- Cherche l'archive `deliverables/all-apps/Parlios_All_Apps_Full.zip`.
- Si `deliverables/all-apps/expanded/INVENTORY.json` existe, il génère des **release notes** listant les apps.
- Crée la Release et attache le ZIP.

> Permissions: `contents: write` (fournies automatiquement par GITHUB_TOKEN).
