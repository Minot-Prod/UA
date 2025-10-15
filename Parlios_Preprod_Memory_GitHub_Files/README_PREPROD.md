# Parlios — Mémoire GitHub (Pré‑prod Pilot)

Ce dossier contient les **fichiers de référence** pour piloter la pré‑production de Parlios en mode **GitHub‑First**.
Il encode les **guardrails** (QA, sécurité, orchestration d'agents, blue‑green, logs).

- Date de génération : 2025-10-15 03:21:49 
- Responsable : Pré‑Prod Manager (toi)
- Agents impliqués : Orchestrateur GitHub‑First, Base44‑Scout, Netlify‑Deployer, QA Guardian, MAP

## Dossier / Fichiers
- `docs/` : guides (pilotage, sécurité, style, blue‑green, agents).
- `configs/` : configurations QA (Lighthouse, Pa11y, Linkinator).
- `.github/workflows/` : pipelines CI avec seuils bloquants.
- `policies/` : politiques (sécurité, contribution, code owners).
- `schemas/` : schémas JSON (I/O des agents, handoff).
- `STATUS.md` : état d'avancement synthétique.
- `REPORT.md` : dernier rapport consolidé.
- `netlify.toml` : headers, HSTS, CSP, COOP/COEP et redirections.
- `TONE.md` & `STYLEGUIDE.md` : cohérence de marque & écriture.

> Règle d'or : **Jamais d'écriture directe sur `main`**. Toujours PR → review → merge.
