# Parlios — Méthode Optimisée Finale (UA/Base44/Yomi)
**Version:** 2025-10-04  
**Statut:** Stable (prête production)  
**But:** Industrialiser la création d’outils (sites, apps, workflows, dashboards) via une **suite de prompts standardisés** qui définissent, valident et livrent des produits **professionnels** sans dépendre d’IA externes à chaque run.

---

## 0) Vue d’ensemble (pour humains pressés)
Cette méthode est un **pipeline de conception→production** piloté par Ultimate Agent (UA).  
Elle fonctionne “à deux vitesses” : **Rapide** (pour itérer/vérifier) puis **Complète** (pour produire/livrer).  
Chaque étape est **auto-suffisante**, **mesurée** (CREDIT_LOG, ComplexityProfile) et **contrôlée** par des **standards marché 2025** (Core Web Vitals, WCAG 2.2 AA, OWASP ASVS, ISO/IEC 25010).  
Le résultat final : un **livrable industrialisable** (code + artefacts + notes) prêt CI/CD.

---

## 1) Blueprint (Base44)
**Goal** Obtenir, en une seule chaîne pilotée par prompts, un produit **pro & industrialisable** (site/app/workflow) conforme aux standards 2025.
**Scope** Définition → Conception → Production (code) → Validation (qualité) → Handoff (CI/CD) → Artefacts. Gouvernance : UA (arbitre) ↔ MA (idéation) ↔ MAP (production).
**Acceptance** Livrable complet (code + README + config) validé par **checklists qualité** (Perf, A11Y, Sec, UX). **CREDIT_LOG** et **ComplexityProfile** renseignés. **UAS JSON** résumé + **Evidence Log** (décisions clés). “Go / Go avec ajustements / No-Go” consigné.
**Non-goals** Recours systématique à d’autres IA à chaque étape (optionnel, non requis). Ajouts hors besoin (gold plating).
**Edge cases** Secret manquant (ex. `UA_N8N_BASE_URL`) ; ressources externes indisponibles ; divergence MA/MAP ; deadline serrée.
**Tests** Conformité aux checklists ; build local ; CI “vert” ; artefacts présents ; tables remplies (CREDIT_LOG/Complexity).

---

## 2) Chemin “Deux Vitesses”
### Sprint R (Rapide)
R1 Cadrage minimal → R2 Maquette simple → R3 Validation 3 questions → R4 Checkpoint 70% (Go/Ajustements/No-Go)
### Sprint C (Complet)
C1 Définition détaillée → C2 Production (code) → C3 Qualité (Perf/A11Y/Sécu/UX) → C4 Handoff CI/CD → C5 UAS JSON + Evidence Log

---

## 3) Standards Marché 2025 — Checklists intégrées
- **Performance (Core Web Vitals)** : LCP ≤ 2.5s ; CLS ≤ 0.1 ; INP ≤ 200ms ; Lighthouse ≥ 90 (pages clés).
- **Accessibilité (WCAG 2.2 AA)** : structure sémantique, contrastes, focus, clavier, lecteurs d’écran.
- **Sécurité (OWASP ASVS 4)** : secrets en env, validation/échappement, dépendances à jour.
- **UX (ISO/IEC 25010)** : parcours clair, states (loading/success/error/empty), feedback compréhensible.

---

## 4) Prompts Modules (bibliothèque)
- **R1 Cadrage Minimal** → Brief.md + flow
- **C1 Définition Complète** → Specs fonctionnelles & techniques
- **C2 Production** → Code + README + scripts + .env.example
- **C3 Qualité** → artefacts Perf/A11Y/Sécu/UX
- **C4 Handoff CI/CD** → workflows + release drafter + logs
- **C5 UAS JSON** → bilan machine-readable + Decision.md

---

## 5) Gouvernance & Mesure
- **UA** : arbitre, décisions, UAS JSON
- **MA** : idéation (non bloquant)
- **MAP** : prod/CI/CD, qualité
- **ComplexityProfile** : Score 0–100 → Budget = 5 + 0.7×Score (min 10, cap 40), checkpoint 70%
- **CREDIT_LOG** : coût/temps/complexité par étape (CSV/MD)

---

## 6) Handoff industriel — Fichiers inclus dans ce pack
- `.github/workflows/parlios-ci.yml` — CI (build/test/lighthouse/a11y/semgrep + artefacts)
- `.github/release-drafter.yml` — notes de version automatiques
- `reports/UAS_Report.json` — gabarit
- `reports/EVIDENCE_LOG.md` — journal des preuves
- `CREDIT_LOG.csv` — suivi crédits
- `.env.example` — variables (ne pas committer `.env`)

**Verdict global** : **Go** — Méthode industrialisable et autonome (les apports des audits IA sont pérennisés ici, pas besoin de les relancer à chaque projet).
