# Parlios / UA — Knowledge Consolidated Report
_Généré automatiquement le 2025-10-16 00:00:00_

## 0) Objectif
Unifier **toutes les connaissances exploitables** (fichiers fournis + règles/mémoires projet) en une base lisible par humain et **indexable par agents**. Ce document sert de **source de vérité** pour lancer des workflows (GitHub, n8n, Netlify) et guider les agents (UA, MA, MAP, QA, Ops, Content…).

---

## 1) Noyau Ultimate Agent (UA)
- **README enrichi** : rôle UA (méta-leader), routage MA/MAP, arbitrage, exigences qualité.
- **Workflows** : UA_INIT, UA→MA (idéation), UA→MAP (production), escalade/arbitrage.
- **Test Plan** : handshake, routing, arbitration, reporting.
- **Manifest UA** : schémas d’entrées/sorties, règles de routage, politiques (Base44, sécurité), CI/CD (ua-e2e), artefacts (reports, readiness), dépendances (n8n).
- **Blueprint template** : Goal/Context/Sources/Decision/Acceptance/Edge cases/Tests.

**Références fichiers**
- README_UltimateAgent_Enriched.md
- UA_workflows.md
- UA_test_plan.md
- AGENT_UltimateAgent.manifest.json

---

## 2) Discipline Base44 (production)
- **Anti-crédits** : ComplexityProfile obligatoire, CREDIT_LOG, checkpoint à 70% (Go/No-Go).
- **Blueprint first** même en prod (Goal/Scope/Acceptance/Edge/Tests).
- **Évitement “mixed-scope”** UI+logique complexes → scinder.
- **Gouvernance** : UA arbitre, QA Guardian contrôle.

**Références**
- CREDIT_LOG.md
- Blueprint_UA_Fusion.md (exemple complet avec ComplexityProfile/budget)
- Mémoire projet (règles Base44 étendues).

---

## 3) CI/CD, HTTPS & n8n
- **Webhook n8n** via UA_N8N_BASE_URL (secret GitHub).
- **Payloads** : PING.json, DEMO.json.
- **Replay local** : eplay.sh (équiv. PowerShell recommandé si absent).
- **Playbook T-0** : checklist DNS/TLS, smoke tests PING/DEMO, rollback minimal.
- **UA E2E** (GitHub Actions) : lance runs sur endpoint, artifacts de réponses.

**Références**
- 	0_https_playbook.md, eplay.sh, PING.json, DEMO.json, CI_README.md
- .github/workflows/ua-e2e.yml (attendu côté repo cible).

---

## 4) Patchs d’intégration & organisation des Agents
- **Integration Patch** : catalogue d’agents consolidé + nouvelles routes (Content, QA, Ops, Strategy, BizDev, Growth, SEO, RAP, Finance Coach, Leadership, Archviz).
- **ADN équipe** : UA > MA & MAP > Backbones (Content, QA, Ops, Strategy, BizDev) > Supports (Growth, SEO, RAP, Finance, Leadership, Archviz).

**Référence**
- UA_Consolidated_Integration_Patch.md.

---

## 5) Mantra & Gouvernance (Yomi)
- **UA_Mantra_Yomi.md** : Vision/Discipline, Cashflow, Systèmes > Motivation, Lignes rouges “Back to Yomi”, tests d’alignement.

---

## 6) Rapports & Readiness
- **Readiness report** (offline) avec actions prioritaires.
- **UA Report** (2025-09-23) : décisions, risques, next actions.
- **Capabilities Diff** : ce qui change (E2E standardisé, Blueprints unifiés, audit trail, playbooks).

**Références**
- eadiness_report.md, UA_Report_20250923.md, capabilities_diff.md.

---

## 7) Parlios — Périmètre produit & écosystème (extraits mémoire projet)
- **MVP Parlios = priorité #1** (Hub central + 38 outils gratuits → acquisition).
- **GitHub-First** : source de vérité unique (repos Parlios/UA), PR-gates, QA gates.
- **Stack pré-prod** : Netlify (static + Functions) + Supabase (Auth/DB RLS), Vite+React Hub, _redirects + netlify.toml, QA CI (Lighthouse≥90, Pa11y AA, Linkinator 0×404).
- **Files standards** : README_DROP.md, CHANGELOG.md, tokens.json, manifest.webmanifest, /data/tools.registry.json (feature flags).

**Starters Netlify (priorités)**
1) next-platform-starter → front “plateforme” performant (Next.js ISR/edge).  
2) astro-supabase-starter → site rapide + DB légère.  
3) remix-admin-template → back-office minimal.  
4) content-ops-starter → Content Ops / Content Agent.  
5) nextjs-contentful-starter → site marketing CMS headless.  
6) astro-sanity-starter → docs/blog rapides.

---

## 8) Workflows d’automatisation (extraits mémoire)
**MySafeCup** (Zapier, Shopify → Sellsy, PDF Drive, logo → Canva → retour email/CRM).  
**Tazlow** (médias → GPT → Notion/Sheets → Google Calendar → email → brouillons FB/IG).  
**Version améliorée** : ajout de contexte, création auto de brouillons sociaux.

---

## 9) UABridge — Intégrations IA (priorité gratuites)
- **Free/Free-tier** : Perplexity, Brave, Gemini, Mistral/Llama, Cohere, ElevenLabs (10k), Stability AI (crédits initiaux), OpenBB/FinGPT.  
- **Pay-only** : ChatGPT, Claude, Aleph Alpha, Suno, MidJourney, Wolfram, Kagi.  
- **Stratégie** : hub multimodal, coûts ~85 USD/mo en full pay-only (estim.).

---

## 10) Routines & Rappels (mémoire)
- Rappels quotidiens (8h30 / 16h30) avec récap + top 3 priorités + phrase motivation.
- Deux plannings suivis : **tech UA** (CI/CD, secrets, replay, rapports) et **stratégique/projets** (Parlios, BaaS44, site, MySafeCup, Tazlow).

---

## 11) Branding & Communication
- **Parlios — TED/Manifesto (version officielle)** : narration fondatrice, 38 outils gratuits, progression par points, Hub futur (pilotage business), mouvement FR↔CA, punchline finale officielle.
- **Logo Parlios actif** (sha256 fourni; chemin conseillé /assets/brand/parlios-logo.png).

---

## 12) Règles d’expérience & style (permanentes)
- **Ton “Yomi”** : naturel, humain, expert, sans listes sauf quand nécessaire.
- **Starter Pack Règles V1** : motivation, switch de ton, checkpoints fluides, next-move automatique.
- **Organisation & efficacité** : Blueprint express, snapshots, récap auto.
- **Gamification** : XP, badges, rapport fun périodique.
- **OAuth prioritaire** si dispo et connecté; sinon login-first; API custom en dernier.

---

## 13) Acceptation (Knowledge Pack)
- [x] Toutes les sources fournies (fichiers) référencées ici.
- [x] Mémoire projet intégrée en sections exploitables.
- [x] Index JSON généré pour agents.
- [x] Prêt à commit GitHub sous /knowledge/.

---

## 14) Prochaines actions conseillées
1. **Commit GitHub** (branche know/merge-ua-parlios-2025-10-16) → /knowledge/ + liens sources.  
2. **Branch rule** : PR auto-merge + tag 1.0.0-knowledge.  
3. **Branch CI** : job qui valide l’index JSON, compte les entrées, et fail si régression.  
4. **Security Weekly** : activer le workflow d’audit hebdo (clés expirées, endpoints 4xx/5xx).
