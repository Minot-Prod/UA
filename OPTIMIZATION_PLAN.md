# ⚙️ OPTIMIZATION_PLAN — UA/UA

## 🎯 Objectif
Stabiliser l’orchestrateur Council of Sages + Codex Integration avec QA Postflight + R4H Gate.

## 🧱 Architecture Cible
main
 ├── docs/
 ├── ci/
 ├── scripts/
 ├── prompts/
 ├── deliverables/
 └── ua/evals/score.json

## 🤖 CI/CD
Deploy Council Executor → PR#1 + PR#2  
Council Postflight → Auto-Eval + R4H Gate  
Codex Integration → Build/Review/Runner GPT-5  

## 🔐 Sécurité
RLS + JWT à prévoir sur Postflight API  
Rotation GH_API tous les 90j  
CSP stricte (aucune exécution externe)

## 📈 QA Metrics
global_score ≥ 90  
postflight_defects = 0  
r4h = true  
build_success = 100%

## 🧭 Roadmap
1. Fusionner PR#203  
2. Lancer Deploy Council Executor  
3. Vérifier Postflight artefacts  
4. Créer release Council v1  
5. Démarrer cycle Codex v2 (décembre)
