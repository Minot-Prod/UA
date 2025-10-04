# UA — Action Plan Enterprise (Pack Yomi)  
**Status:** READY • Date: 2025-10-04  
**Owner:** Ultimate Agent (UA / Yomi)  

Ce pack transforme ton repo en **infrastructure pro**: CI/CD E2E, DocOps, sécurité hebdo, gouvernance agents, policies, scoring de maturité, prompts Mode Agent prêts à l’emploi.

---

## 0) Blueprint global

**Goal**  
Mettre le dépôt UA au **niveau entreprise**: fiable, documenté, testé, sécurisé, durable.

**Scope (inclus)**  
CI E2E, secrets, replay, UA_Report, CREDIT_LOG auto, manifeste/inventaire synchro, DocOps, Security Weekly, handbooks & policies, gouvernance agents, charte Yomi, scoring maturité.

**Acceptance (DoD)**  
- UA E2E workflow vert (≥1 run PING+DEMO)  
- CREDIT_LOG mis à jour auto après run  
- Rapport `deliverables/ua/UA_Report_YYYYMMDD.md` généré  
- Manifeste/inventaire synchronisés (0 faux “missing”)  
- DocOps pass ✅ + badge  
- Security weekly actif  
- Charte Yomi référencée par le manifeste  
- Maturity Index ≥ 75% (Phase Enterprise début)

---

## 1) Runbook (exécutif)

1. **Secret**: définir `UA_N8N_BASE_URL` (GitHub → Settings → Secrets → Actions).  
2. **Smoke Tests**: lancer `tools/replay.sh` (ou `tools/replay.ps1`) avec PING & DEMO.  
3. **CI E2E**: Actions → *UA E2E* → Run (`runs=2` conseillé).  
4. **Rapport**: vérifier artifact + `deliverables/ua/UA_Report_...md`.  
5. **CREDIT_LOG**: vérifier ligne append post-run.  
6. **DocOps**: Actions → *DocOps* → vérifier badge ✅.  
7. **Security Weekly**: s’assure qu’il est planifié et OK.  
8. **Maturity**: exécuter `python tools/maturity_index.py --print`.  
9. **Gouvernance**: ouvrir `docs/AGENTS_HANDBOOK.md` et `docs/diagrams/agents_hierarchy.mmd` (Mermaid).  
10. **Yomi**: confirmer présence `docs/UA_Yomi_Charter.md` et référence dans le manifeste UA.

---

## 2) Prompts Mode Agent (ordonnés)

**P1 — Secret & Endpoint**  
« Vérifie le secret `UA_N8N_BASE_URL` et le endpoint n8n (HTTPS, cert valide). Propose diagnostic si KO. »

**P2 — Replay PING/DEMO**  
« Lance les scripts de replay, remonte statuts & extraits JSON. Fournis correctifs 4xx/5xx/TLS si besoin. »

**P3 — CI E2E**  
« Exécute `.github/workflows/ua-e2e.yml` (runs=2). Archive réponses, publie résumé. »

**P4 — UA_Report auto**  
« Génère `deliverables/ua/UA_Report_YYYYMMDD.md` (summary, decisions, justification, risks, next_actions, confidence). »

**P5 — CREDIT_LOG auto**  
« Calcule crédits (tokens) et appende 1 ligne dans `CREDIT_LOG.md` (ISO time, run id, credits). »

**P6 — Manifest/Inventory sync**  
« Scanne `AGENT_UltimateAgent.manifest.json`/`files_inventory.csv`. Retire les faux `missing`. Propose diff. »

**P7 — DocOps**  
« Lance `docops.yml`. Corrige headings, liens, tables. Si KO → ouvre PR auto. »

**P8 — Security Weekly**  
« Valide cron, checks (cert, webhook 200, secrets). Si fail → crée issue avec diagnostic. »

**P9 — Maturity Index**  
« Exécute `tools/maturity_index.py` et publie le score + axes d’amélioration. »

**P10 — Agents Governance**  
« Vérifie `AGENTS_HANDBOOK.md` & diagramme. Propose KPIs agent par agent et seuils d’alerte. »

**P11 — Yomi Enforcement**  
« Vérifie `UA_Yomi_Charter.md`. Si absent, crée-le. Ajoute référence personality dans le manifeste. »

---

## 3) Checkpoint 70% (Go/No-Go)

- CI verte x2 • CREDIT_LOG écrit • UA_Report généré • DocOps ✅  
**GO** si 3/4 atteints. Sinon, triage automatique : endpoint, secrets, TLS, DocOps lint.

---

## 4) Livrables clés (inclus dans ce pack)

- Workflows: `ua-e2e.yml`, `docops.yml`, `ua-security-weekly.yml`  
- Tools: `replay.sh`, `replay.ps1`, `maturity_index.py`  
- Docs: *Policies (Sécurité, QA, Conduite, Contribution, Continuité, Style)*, *Agents Handbook*, *Yomi Charter*, *Sources*, *Diagramme Mermaid*

---

## 5) Gouvernance Yomi (extrait)

- Ton humain, direct, utile.  
- Toujours annoncer quand on passe en “mode analytique”.  
- Rappels *Back to Yomi* si dispersion.  
- KPI Yomi: clarté perçue ≥ 9/10, décision actionable ≤ 3 étapes, temps de réponse utile ≤ 2 min.

---

## 6) Maturity Index (grille synthèse)

- Docs présentes (30%), Qualité DocOps (20%), CI/CD (20%), Sécurité (15%), Agents & KPIs (10%), Yomi (5%).  
**Seuils**: <25% Startup • 25–75% Pro • ≥75% Enterprise.

---

*(Ce pack est auto-contenu. Place-le à la racine du repo ou merge les fichiers dans l’arborescence existante.)*
