# Parlios UA Agents Bundle (Starter)
Ce dépôt contient : configs d’agents, blocs "Add Knowledge", templates de blueprint, checklist QA, et stub CI.

## Arborescence
- configs/ : JSON de configuration agents (UA, MA, MAP, etc.)
- knowledge/ : blocs prêts à coller dans ChatGPT Builder → Add Knowledge
- templates/ : blueprint_minimal.md
- qa/ : QA_CHECKLIST.md
- workflows/ : DEMO_FLOW.md (flux de messages)
- logs/ : dossier pour l'historique des échanges
- .github/workflows/ua-ci.yml : CI minimale

## Push rapide
```bash
git init
git add .
git commit -m "Add UA agents starter bundle"
git branch -M main
git remote add origin <VOTRE_REPO_URL>
git push -u origin main
```
