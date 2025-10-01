# Catalogue d’exemples sectoriels

## Blueprint (Express)
**Goal** — Bibliothèque d’exemples et playbooks sectoriels réutilisables pour démarrer vite.

**Scope** — Sources, modèles IA, automations, stockage, supervision.

**Acceptance** — MVP opérationnel avec import JSON (Zapier/n8n), un run de test réussi, KPIs initialisés et check QA vert.

## Stack de référence
- **Front**: Netlify (Next/Astro), formulaires Web
- **Automations**: Zapier ou n8n (selon préférence)
- **LLM**: GPT‑4/5‑class ou équivalent open
- **Data**: Google Sheets / Notion / Supabase
- **CI/CD**: GitHub Actions (tests de lint + dry‑run)

## KPIs
- Temps de mise en place (TtV)
- Coût par itération
- KPI métier (ex: leads, RDV, tickets deflected, vues, AOV/LTV…)

## Démarrage rapide
1. Importer `n8n.json` **ou** `zapier.json`.
2. Compléter `.env.example` → `.env`.
3. Lancer un **dry‑run** (sandbox/données d’exemple).
4. Vérifier la **checklist** et publier en mode supervision.

## Sécurité & conformité
- Journaliser entrées/sorties LLM (PII masquée).
- Ajout d’un *kill-switch* et d’un seuil d’intervention humaine.
