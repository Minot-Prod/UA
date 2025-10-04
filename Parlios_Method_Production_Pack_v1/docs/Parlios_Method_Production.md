# Méthode Parlios — Production EXV (générique & reproductible)

## Objectif
Assurer que chaque livrable est **utile**, **sûr**, **performant** et **vendable**, même sans expert interne.

## Phases
1️⃣ **Exploration** — besoins, meilleures pratiques, risques  
2️⃣ **Validation** — avis d’experts, arbitrages, Go/No-Go  
3️⃣ **Production** — code, assembleurs JSON, docs  
4️⃣ **Qualification (QA)** — tests, perfs, sécurité, accessibilité  
5️⃣ **Release** — packaging, déploiement, observabilité, rollback

---

## 1) EXPLORATION
- **But** : clarifier le *pourquoi* et le *quoi* avant le *comment*.
- **Actions** :
  - Formuler le **Goal/Scope/Non-Goals**.
  - Rechercher les **meilleures pratiques** (3–5 références marché) : UX, sécurité, RGPD, IA, performance, monétisation.
  - Lister **contraintes** (techniques, légales, délais, coûts).
- **Sorties** :
  - `Blueprint` (voir `Blueprint_Template.md`)
  - Liste des **références marché** + captures
  - **Risques** & **hypothèses** (avec plan de mitigation)

## 2) VALIDATION
- **But** : verrouiller des choix solides et réalistes.
- **Actions** :
  - Soumettre aux **experts/agents** (UX, Tech, IA, Sécurité, Business).
  - Obtenir une **Synthèse experte** (options comparées + reco finale).
  - Tenir un **Go/No-Go** (RACI).
- **Sorties** :
  - `Synthesis.md` signé
  - **Critères d’acceptation** formalisés (tests à écrire)

## 3) PRODUCTION
- **But** : construire vite, propre, réutilisable.
- **Actions** :
  - Créer/mettre à jour les **assembleurs JSON** (config unifiée par module).
  - Implémenter le code **sans dépendances inutiles**, avec **sécurité par défaut**.
  - Documenter au fil de l’eau (README + Checklist).
- **Sorties** :
  - Code + assembleurs + **README** + **Checklist**
  - Traces d’architecture (schémas succincts)

## 4) QUALIFICATION (QA)
- **But** : garantir qualité globale avant release.
- **Actions** :
  - **Tests** unitaires/intégration/E2E.
  - **A11Y** (WCAG 2.2 AA), **i18n**, **perf budgets**, **sécurité**.
  - **Data checks** : anonymisation, consentement, rétention.
- **Sorties** :
  - `QA_Report.md` + statut ✅/⚠️/❌
  - Tickets de correction (bloquants vs post-release)

## 5) RELEASE
- **But** : livrer de façon traçable et réversible.
- **Actions** :
  - **Gates** (Spec Freeze, Code Freeze, RC, GA) + **tags Git**.
  - Artefacts : **ZIP**, **CHANGELOG**, **QA Report**.
  - Déploiement Netlify/Vercel + **observabilité** + **plan de rollback**.
- **Sorties** :
  - Release notée + notes d’exploitation
  - Suivi de **SLO** (erreurs, latence, disponibilité)
