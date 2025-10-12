# Blueprint: Parlios Suite v1.4 — Deployment Plan (Base44 / ModAgent)

## Version
v1.4 — Full Deployment to www.parlios.ca

## Scope
Déploiement complet de la Parlios Suite v1.4 (7 applications, IA locale, CI/CD, Base44 packaging, mise en ligne sur parlios.ca).

---

## Phase 1 — Bootstrap & Structure (≈ 40 crédits)

### Prompt 1 — Bootstrap monorepo + split 7 apps
```
Rôle: Ingénieur Front + Architecte Monorepo

Objectif:
- Créer monorepo "parlios-suite" (workspace npm)
  apps/ (7 apps)
  packages/components, hooks, base44-utils, ia
  docs/, .github/workflows/ci.yml
- Importer Parlios Suite v1.4 rich+ (hooks fonctionnels, ShareCard, ExportToolbar, ParliosChat).
- Scinder la page unique en 7 modules:
  1) Parlios Message Pro
  2) Parlios Vision Marché
  3) Parlios Créateur d’Offres
  4) Parlios Valeur Juste
  5) Parlios Gain de Temps
  6) Parlios Plan d’Action
  7) Parlios Idée Créatrice

Contraintes:
- React 18 + Vite + TypeScript + Tailwind
- Design tokens (emerald/mint/cyan/anthracite)
- Bouton "Exemple" par app
- Self-tests non bloquants (≥5 idées, 3 tons FR, 3 tiers, SMART=5)
- Aucune dépendance serveur

Deliverables:
- PR #1 monorepo + 7 apps + docs/README
- npm scripts: dev, build, preview, sanity

Quality Gate:
- Checkpoint 70% avant merge
```
Crédits: ~15

### Prompt 2 — Router + Layout + Navigation
```
Rôle: Intégrateur Front

Objectif:
- Router (React Router) + layout global
- Header brandé Parlios Suite v1.4, nav 7 onglets, footer
- Page Design System mini (tokens + composants)
- Mode "Demo" toggle (met en surbrillance les boutons Exemple)

Deliverables:
- PR #2 (router + layout + DS)
- Responsive test sm/md/lg

Quality Gate:
- Checkpoint 70% + captures nav/DS
```
Crédits: ~10

### Prompt 3 — Hooks mock IA + ExportToolbar unifié
```
Rôle: Dev Front

Objectif:
- Brancher useParliosIA (mock si IA locale absente)
- Unifier ExportToolbar (Copier MD / Partager / Export PNG)
- ShareCard watermark: "Créé avec Parlios {NomApp}™ — v1.4 — {ISO}"

Deliverables:
- PR #3 (hooks mock + export unifié)
- Tests: export PNG/OG valide, MD watermark présent

Quality Gate:
- Checkpoint 70% + logs de tests
```
Crédits: ~5

### Prompt 4 — QA visuelle (ModAgent-TV)
```
Rôle: QA Visuelle (ModAgent-TV)

Objectif:
- Preview locale, capturer 1 screen global + 1/app
- Vérifier responsive mobile/tablette/desktop
- Identifier 8 micro-améliorations UI (Do Now / Nice To Have)

Deliverables:
- Rapport TV #1 (screens + 8 recos)
```
Crédits: ~2

---

## Phase 2 — IA locale, exports & onboarding (≈ 30 crédits)

### Prompt 5 — Intégration IA locale (Ollama/LM Studio)
```
Rôle: Dev IA Front

Objectif:
- Config packages/ia/model.config.json (mode ollama, model mistral)
- useParliosIA: lecture config + overrides
- Badge "IA locale: ready/absent" dans header
- Fallback mock si serveur inactif

Deliverables:
- PR #4 + README config IA locale
- Test: 127.0.0.1:11434 -> ready / mock fallback

Quality Gate:
- Checkpoint 70% (preuve détection)
```
Crédits: ~10

### Prompt 6 — Onboarding + Tracking + A11y
```
Rôle: UX Engineer

Objectif:
- Onboarding 3 étapes (intro, action, export)
- Tracking léger (useAnalytics wrapper)
- Accessibilité: focus, aria-labels, contrastes AA

Deliverables:
- PR #5 doc Onboarding & Analytics
- Test: events + focus visible tab

Quality Gate:
- Checkpoint 70%
```
Crédits: ~8

### Prompt 7 — Exports OG 1200×630 + homogénéisation
```
Rôle: Front Export

Objectif:
- ShareCard: bouton Export OG 1200×630
- Watermarks uniformes (PNG/OG/MD)
- Vérifier MD: watermark format standard

Deliverables:
- PR #6 OG + watermarks unifiés

Quality Gate:
- Checkpoint 70%
```
Crédits: ~5

### Prompt 8 — Persistance locale (brouillons)
```
Rôle: Dev Front

Objectif:
- LocalStorage opt-in par app (Sauvegarder / Restaurer)
- Aucun backend

Deliverables:
- PR #7 + guide Persistance locale
- Test: read/write par app

Quality Gate:
- Checkpoint 70%
```
Crédits: ~5

### Prompt 9 — Audit UX avancé + viralité (ModAgent-TV)
```
Rôle: QA/UX (ModAgent-TV)

Objectif:
- Tester 7 apps (mode Exemple + exports)
- Vérifier fluidité, cohérence, clarté
- Proposer 10 optimisations orientées viralité

Deliverables:
- Rapport TV #2 (screens + checklist)
```
Crédits: ~3

---

## Phase 3 — CI/CD & Base44 Packaging (≈ 10 crédits)

### Prompt 10 — CI/CD + déploiement staging
```
Rôle: DevOps

Objectif:
- GitHub Actions lint+build+sanity
- Déploiement branch staging → staging.parlios.ca
- Artefacts: bundle, rapports sanity

Deliverables:
- PR #8 CI + release v1.4-rc staging

Quality Gate:
- Checkpoint 70% (lien staging + logs)
```
Crédits: ~5

### Prompt 11 — Base44 Packaging & CREDIT_LOG
```
Rôle: Ops Base44

Objectif:
- CREDIT_LOG automatique (générer/copier/exporter)
- Rapport Base44: Blueprint & tests
- Release Pack: changelog, notes

Deliverables:
- PR #9 release/v1.4-rc + rapports Base44

Quality Gate:
- Checkpoint 70%
```
Crédits: ~5

---

## Phase 4 — Domaine, SEO & légaux (≈ 8 crédits)

### Prompt 12 — Domaine & SEO Kit
```
Rôle: Ops Web

Objectif:
- Config DNS (www, app, staging.parlios.ca)
- robots.txt, sitemap.xml, meta OG, canonical
- Redirection 301 www/parlios.ca (à confirmer)

Deliverables:
- PR #10 public/robots.txt + sitemap + fiche DNS
```
Crédits: ~5

### Prompt 13 — Pages légales & cookies (light)
```
Rôle: Rédacteur Tech/Legal

Objectif:
- Pages: Mentions légales, Confidentialité, CGU
- Bannière cookies (light)

Deliverables:
- PR #11 pages /legal + bannière
```
Crédits: ~3

---

## Phase 5 — Go-Live & QA finale (≈ 7 crédits)

### Prompt 14 — Bascule prod + vérifs fumées
```
Rôle: Release Manager

Objectif:
- Bascule www.parlios.ca (prod)
- Vérifier SSL, redirections, OG, IA badge, onboarding
- Déployer tag v1.4 + page "Découvrir la Suite Parlios"

Deliverables:
- Rapport Go-Live + Tag Git v1.4

Quality Gate:
- Checkpoint 70% + CLOSE
```
Crédits: ~5

### Prompt 15 — Revue publique finale (ModAgent-TV)
```
Rôle: QA/UX Public (ModAgent-TV)

Objectif:
- Parcours nouvel utilisateur (mobile + desktop)
- Vérifier clarté, rapidité, exports, onboarding
- Fournir 6 quick wins post-go-live

Deliverables:
- Rapport TV #3 (screens + quick wins)
```
Crédits: ~2

---

## Totaux
- Crédits estimés: ~88
- Phases: 5
- Prompts: 15 (Base44 checkpoints inclus)
- Environnement final: www.parlios.ca (prod) / staging.parlios.ca (staging)

## Notes
- Pas de n8n requis (intégrations externes ultérieures)
- Domaine DNS fourni manuellement au registrar
- Base44 suit la logique Blueprint / CREDIT_LOG / checkpoint 70%

