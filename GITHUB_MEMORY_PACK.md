# 🧠 GITHUB_MEMORY_PACK — UA/UA

## 🔹 DEPOT
- Nom : Minot-Prod/UA
- Branches : main (protégée, auto-merge), feat/council-agents-qa, feat/codex-integration, feat/deploy-council
- Protection : PR required + 1 approval + CI mandatory + auto-merge enabled

## 📁 ARBORESCENCE
- docs/
  - KNOWLEDGE_POLICY.yaml
  - SHADOW_AGENTS_PLAYBOOK.md
  - APP_PIPELINE_MERMAID.md
  - CODEX_README.md
- ci/
  - postflight.yml
- scripts/
  - auto_eval/
  - codex/
- prompts/
  - codex/
- deliverables/
  - postflight/*
- ua/evals/score.json

## ⚙️ WORKFLOWS
- .github/workflows/deploy-council.yml
- .github/workflows/ci-postflight.yml
- .github/workflows/configure-branch-protection.yml

## 🔐 SECRETS
- GH_API, OPENAI_API_KEY, OPENAI_MODEL_CODEX, OPENAI_MODEL_REASONER

## 🧠 AGENTS
Scribe, Oracle, Arbiter, Codex Builder, Codex Reviewer, Codex Runner (+11 Marché+)

## 🧪 PIPELINES
Deploy Council → Council of Sages QA → Codex Integration → Postflight CI → R4H Gate → Auto-Merge
