# 📊 Parlios — Dashboard MVP EXV

> **Source de vérité** : `MVP_Parlios_Assembleur.json`  •  **Méthode** : EXV (recherche web → panel d’experts → recommandations vulgarisées)  
> **Objectif** : MVP industriel & commercialisable • **TTV** < 60s • **A11Y AA** • **Perfs LCP≤2.5s / INP≤200ms / CLS≤0.1**

---

## ✅ Progression globale
- Étapes validées : **X/20** → **XX %**
- Dernière mise à jour : _(remplir manuellement)_

```
[██████████----------] 50%
```
> Astuce : remplacez le nombre de blocs `█` (20 max) pour représenter le pourcentage (1 bloc = 5%).

---

## 📅 Rappels automatiques
- **8h30** : Rappel progression + prochaine étape EXV
- **16h30** : Relance pour compléter une étape EXV

---

## 🧭 Prochaine étape
- **Nom** : _(à renseigner)_  
- **Décision attendue** : _(OK / Ajustements)_  
- **Livrables** : _(image ou code)_  
- **Lien prompt** : voir `Prompts_EXV.md` → Étape correspondante

---

## 🗂️ Checklist EXV (0 → 20)
> Cochez au fur et à mesure. Chaque ✓ = +5 % de progression.

- [ ] 0 — Préambule
- [ ] 1 — Vision & KPI
- [ ] 2 — Personas & JTBD
- [ ] 3 — Branding
- [ ] 4 — IA & Sitemap
- [ ] 5 — Free vs Pro
- [ ] 6 — Fiche Module
- [ ] 7 — I/O Library
- [ ] 8 — Design System
- [ ] 9 — A11Y & i18n
- [ ] 10 — Performance
- [ ] 11 — Data & APIs
- [ ] 12 — Sécurité & Privacy
- [ ] 13 — Intégrations
- [ ] 14 — Analytics
- [ ] 15 — Microcopy
- [ ] 16 — QA
- [ ] 17 — CI/CD
- [ ] 18 — Roadmap
- [ ] 19 — Prototype
- [ ] 20 — Ops

---

## 🧾 Liens & fichiers
- `Prompts_EXV.md` — Prompts officiels 0→20 + BUILD
- `MVP_Parlios_Assembleur.json` — **Source de vérité**
- `MVP_Parlios_Assembleur.schema.json` — Validateur
- `Checklist_EXV.md` — Version simple de la checklist

---

## 🧪 Validation Assembleur (facultatif)
> Pour GitHub : ajoutez un job qui valide le JSON avec le schema à chaque commit.

```yaml
# .github/workflows/validate-assembleur.yml
name: Validate Assembleur JSON
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm i -g ajv-cli
      - run: ajv validate -s MVP_Parlios_Assembleur.schema.json -d MVP_Parlios_Assembleur.json
```
