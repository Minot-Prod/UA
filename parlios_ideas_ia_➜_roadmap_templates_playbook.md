# Parlios — Ideas IA ➜ Roadmap & Templates (Playbook)

**But**  : Centraliser les 8 idées IA utiles à Parlios, les mapper au produit (MVP / Upsell), et fournir **des templates prêts à l’emploi** (Blueprints, prompts, checklists, workflows Zapier/Make, GitHub Actions) pour accélérer le build.

**À utiliser quand** : brainstorming, cadrage, exécution rapide.

---

## 0) Règle Mémoire (préambule)
Quand Max mentionne une technique/workflow déjà stocké ici, **UA confirme immédiatement** :
> « On l’a **déjà en mémoire**, c’est **faisable** et voici le **template** correspondant : [lien interne ci‑dessous]. »

Catégories à citer : **Base44 (Blueprint)**, **Zapier/Make**, **GitHub Actions**, **Content Agent**, **AAA Audit** (agence d’automatisation), **GPT Custom**, **Content Vidéo IA**.

---

## 1) Cartographie rapide (Idées ➜ Parlios)

- **Lot A — Core MVP**
  1. **AAA (AI Automation Agency)** → Module Audit IA + Packs d’exécution.
  2. **Content Agent + visuels/vidéos IA** (idées 2 & 5) → Shorts + assets animés.
  3. **GPT Custom pack** (idée 8) → Scripts YouTube, styles auteurs.
  4. **Chaîne IA vitrine** (idée 6) → Acquisition & preuve par l’exemple.

- **Lot B — Avantages Produit**
  5. **Formations générées par IA** (idée 7) → Micro‑cours onboarding & monétisation.

- **Lot C — Extensions / Upsell**
  6. **Livres personnalisés** (idée 3) → Pipeline « histoire enfant ».
  7. **Print on Demand personnalisé** (idée 4) → Merch automatisé.

---

## 2) Blueprints “express” (Base44‑style)

### 2.1 Blueprint — AAA (Audit IA)
```
Goal: Diagnostiquer un business et proposer 3 automations IA chiffrées (économies/ROI)
Scope: Audit 60–90 min + rapport + call 30 min
Non-goals: Déploiement complet (pack séparé)
Acceptance: Rapport PDF + table ROI (€/an, %), 3 quick-wins, 1 plan 30 jours
Edge cases: Accès limités, outils non compatibles, RGPD
Tests: 1 client test → feedback ≥8/10 ; 1 POC Make/Zapier fonctionnel
```

### 2.2 Blueprint — Content Agent (Shorts & Assets IA)
```
Goal: Générer 7 shorts/semaine + 10 visuels animés/storyboards pour YouTube
Scope: Sourcing idées, script court, voix IA/voiceover, avatar (si autorisé), export 9:16
Acceptance: 7 posts/semaine publiables, CTR>3%, rétention 3s>70%
Edge cases: Droits à l’image, brand safety, musiques protégées
Tests: 1 semaine pilote → ≥5 contenus validés, ≥2% CTR organique
```

### 2.3 Blueprint — GPT Custom (Style Créateur)
```
Goal: Créer un GPT qui écrit des scripts au style d’un créateur défini
Scope: Ingestion 3–5 transcripts + règles éditoriales + checklist tonalité
Acceptance: 3 scripts (hook/intro/body/CTA) notés ≥8/10 par le créateur
Edge cases: Dérives de ton, faits non sourcés, répétitions
Tests: AB test de 2 hooks par sujet ; hallucinations <2% (revues manuelles)
```

### 2.4 Blueprint — Chaîne IA (Vitrine Parlios)
```
Goal: Atteindre 10k abonnés en 90 jours via contenu court IA
Scope: News IA, tutos rapides, démos Parlios, best-of hebdo
Acceptance: 90 vidéos / 90 jours ; 3 vidéos >50k vues ; 1 lead/jour vers Parlios
Edge cases: Saturation sujets ; qualité audio ; cadence
Tests: Cadence journalière tenue 21 jours ; 3 formats testés ; rétention >35%
```

---

## 3) Prompts & Templates (prêts à l’emploi)

### 3.1 Prompt — Audit IA (AAA)
```
Tu es un consultant AAA. Objectif: détecter 3 automations IA à ROI rapide.
Entrées: secteur, outils actuels, taille équipe, canaux, pain points.
Sorties attendues (Markdown):
1) Tableau « Opportunités »: [Nom] | [Pain] | [Outil IA] | [Workflow] | [Temps gagné/mois] | [€ économisés/an] | [Risques]
2) Plan 30 jours: Semaine 1–4 (actions, owner, KPI)
3) Script de vente: pitch 60s + objections/réponses
Contraintes: chiffrer prudemment (±20%), RGPD, pas de promesses irréalistes.
```

### 3.2 Prompt — Content Agent (Short 9:16)
```
Rôle: Content Agent. Tâche: produire un short 9:16 (≤55s) sur [sujet].
Livrables:
- Hook (≤8s, 2 variantes)
- Script (timestamps, scènes, supertitles)
- Suggestions visuelles (stock/IA), SFX, musique libre
- CTA discret (Parlios)
Contraintes: langage clair, pas de jargon, punchlines, 1 idée = 1 short.
```

### 3.3 Prompt — GPT Custom (Style Créateur)
```
Rôle: Modeleur de style. Entrées: 3–5 transcripts du créateur X.
Tâche: Extraire les patterns (hook, rythme, métaphores, CTA) et générer un « style guide ».
Sortie: JSON {hook_patterns[], tone, pacing, taboo, cta_styles[], outline_template}
Puis: Générer 2 scripts originaux (600–900 mots) fidèles au style.
```

### 3.4 Prompt — Formation IA (Udemy/Skillshare)
```
Rôle: Instructional Designer. Sujet: [spécifique, niche].
Livrables: syllabus (10–15 leçons), objectifs mesurables, scripts vidéo (2–4 min/lesson), quiz, devoir rapide.
Bonus: kit social (3 posts), page de vente (bullets, outcomes, FAQ).
```

### 3.5 Prompt — Livre enfant personnalisé
```
Rôle: Auteur IA. Entrées: prénom, âge, centre d’intérêt, animal préféré, valeur éducative.
Sortie: histoire 1200–2000 mots, 8 chapitres, morale, 8 prompts d’illustration (diffusion/SDXL).
```

### 3.6 Prompt — Print on Demand personnalisé
```
Rôle: Designer IA. Entrée: photo utilisateur + thème (super-héros/mème/animal).
Sortie: 4 variantes d’image (prompts MJ/SDXL), mockups (t-shirt/mug/poster), consignes DPI.
```

---

## 4) Workflows Zapier/Make (squelettes)

### 4.1 **Content Short Auto** (YouTube/TikTok)
1) Trigger: ajout d’idée dans Notion/Sheet →
2) Étape: Générer script (GPT Custom) →
3) Étape: Générer voix (ElevenLabs ou TTS) →
4) Étape: Générer avatar (si autorisé) →
5) Étape: Générer sous-titres (whisper/auto-caption) →
6) Étape: Publier brouillon (YouTube Shorts/TikTok) →
7) Étape: Log dans Notion (URL, stats de base)

### 4.2 **AAA Audit to Deal**
1) Trigger: Formulaire « Audit IA » (Typeform) →
2) Étape: Enrich CRM (HubSpot/Sheets) →
3) Étape: Générer rapport (Doc/Slides) →
4) Étape: Email auto + lien calendrier →
5) Étape: Tâches d’exécution (Make/Zapier) packées + chiffrage ROI

### 4.3 **Formation Auto**
1) Trigger: sujet validé →
2) Génération syllabus + scripts →
3) Enregistrement (ou voix IA) →
4) Upload plateforme (via API si dispo) →
5) Génération page de vente + posts sociaux

---

## 5) GitHub Actions — squelette (UA/CI contenus)
```yaml
name: parlios-content-ci
on:
  workflow_dispatch:
  schedule:
    - cron: '0 12 * * *'  # quotidien
jobs:
  build-pipeline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup PNPM
        uses: pnpm/action-setup@v3
        with: { version: 9 }
      - name: Install deps
        run: pnpm i --frozen-lockfile
      - name: Generate scripts (GPT Custom)
        run: node scripts/generate_scripts.mjs
      - name: Lint & QA
        run: pnpm run lint && pnpm run test
      - name: Export artifacts
        uses: actions/upload-artifact@v4
        with:
          name: parlios-content-batch
          path: output/**
```

---

## 6) Checklists de déploiement rapide

### 6.1 AAA (Audit ➜ Exécution)
- [ ] Formulaire intake (secteur/outils/kpi/volumes)
- [ ] Audit call 45–60 min
- [ ] Rapport avec 3 automations + ROI
- [ ] Offre: % économies ou retainer mensuel
- [ ] POC Make/Zapier (1 workflow clé)
- [ ] Mesure post‑déploiement (KPI 14 & 30 jours)

### 6.2 Content Agent (Shorts)
- [ ] Calendrier éditorial (7/sem)
- [ ] Hook bank + templates scènes
- [ ] Voix IA/voiceover + sous‑titres
- [ ] Brand kit (couleurs, police, CTA)
- [ ] Publication + tracking UTM

### 6.3 GPT Custom
- [ ] Collecte 3–5 transcripts
- [ ] Style guide JSON
- [ ] 3 scripts test
- [ ] Validation créateur
- [ ] AB test hooks

---

## 7) Fichiers & Nommage (GitHub)
- `playbooks/parlios_ideas_ia.md` ← **ce document**
- `prompts/aaa_audit.md`
- `prompts/content_short.md`
- `prompts/gpt_custom_style.md`
- `workflows/zapier_make_content_short.md`
- `.github/workflows/parlios-content-ci.yml`

---

## 8) KPI & Suivi
- **AAA**: € économies/an, temps gagné/mois, TTM (time to money)
- **Content**: vues/vidéo, rétention 3s, CTR, leads/vidéo
- **GPT Custom**: note créateur, temps rédaction économisé, % vidéos publiées

---

## 9) Notes Légales / Risques
- Droit à l’image (avatars), licences audio/vidéo, RGPD (CRM, emails), mentions IA.
- Transparence sur IA‑assistance dans contenus sponsorisés.

---

## 10) Quick Start
1) Choisir **1 idée Lot A**.
2) Ouvrir le **Blueprint** correspondant.
3) Copier le **Prompt** associé.
4) Lancer le **squelette Zapier/Make**.
5) Optionnel: activer **CI GitHub** pour générer des scripts batch.

