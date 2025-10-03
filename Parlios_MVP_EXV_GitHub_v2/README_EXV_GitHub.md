# 🧭 Guide EXV — Parlios MVP

## Objectif
Ce dossier contient le suivi complet du développement du MVP Parlios via la méthode EXV (Experts Vulgarisés).

## Structure
- `MVP_Parlios_Assembleur.json` — Source de vérité unique.
- `MVP_Parlios_Assembleur.schema.json` — Validateur JSON Schema.
- `Parlios_MVP_Dashboard.md` — Progression & étapes.
- `Prompts_EXV.md` — Prompts étape par étape.
- `Checklist_EXV.md` — Suivi rapide.

## Comment mettre à jour
1. Ouvrir `MVP_Parlios_Assembleur.json`
2. Ajouter ou modifier le bloc correspondant à l'étape validée (exemple fourni par l'assistant).
3. Commit GitHub :  
   ```bash
   git add MVP_Parlios_Assembleur.json
   git commit -m "Update Étape X - [nom étape] validée"
   git push origin main
   ```

## Validation automatique
Une action GitHub (ajoutée dans `.github/workflows/validate-assembleur.yml`) peut vérifier la validité du JSON via le schéma fourni.

---
Dernière mise à jour : Étape 1 validée (Contraintes & Actifs, horizon 3 mois)
