# 🧱 Parlios — Build Statique Universel (README Officiel)

> Version 2025-10 — consolidée à partir du pack “Packaging et build statique universel.zip”
>  
> Mainteneur : Ultimate Agent (UA)  
> Validé par : Maxime / Parlios HQ  
>  
> Objectif : Créer, auditer et déployer un site **100 % statique Drop-ready** (Netlify / GitHub Pages)  
> sans dépendance serveur, sans erreurs 404, et avec un pipeline qualité reproductible.

---

## 🧭 Architecture et philosophie

- **UA (Ultimate Agent)** = orchestration, arbitrage, packaging.  
- **MA (Master Agent)** = idéation, structure, contenu initial.  
- **MAP (Master Agent Project)** = production, design, QA.  
- **CI/CD** = GitHub Actions + Drop Netlify.  

Principe : livrer un site complet **en 3 étapes claires**, chacune livrant un **artefact vérifiable** (.zip ou code complet).

---

## ⚙️ Workflow 3-Étapes (Drop-ready)

### 🟢 Étape 1 — STRUCTURE (bloquante)

**Livrable :** `parlios_v3_structure.zip`

**Contenu attendu :**
- `index.html` **à la racine** (pas dans un sous-dossier)
- `404.html`, `manifest.json`, `sitemap.xml`, `robots.txt`
- Liens **relatifs** (`./assets/...`)
- Placeholders d’images (data URI)
- Balisage bilingue (`<span lang="en">…</span>`)

**Definition of Done :**
- Navigation interne OK  
- Aucun 404  
- Aucune image manquante  
- Ouverture locale fonctionnelle

---

### 🟡 Étape 2 — DESIGN & CONTENU

**Livrable :** `parlios_v3_design.zip`

**Contenu attendu :**
- Design responsive (Tailwind-like ou vanilla CSS)
- Images WebP/AVIF + placeholders base64
- Couleurs, typographie, tokens CSS
- Textes FR propres + EN inline
- Header/footer cohérents

**Definition of Done :**
- LCP < 2.5s  
- Contraste AA  
- Focus visibles  
- Préloader PRM-safe (< 1s)

**Anti-jargon / i18n**
> Interdits : “Yomi”, “Base44”, ou jargon interne.  
> FR par défaut, EN en `<span lang="en">…</span>`.

---

### 🔵 Étape 3 — QA & LIVRAISON

**Livrables :**  
- `parlios_v3_final.zip`  
- `QA_REPORT.md`

**Audit obligatoire :**
| Outil | Objectif | Résultat attendu |
|--------|------------|------------------|
| Lighthouse | Perf mobile | ≥ 90 |
| pa11y | Accessibilité | 0 erreurs critiques |
| linkinator | Liens | 0 cassés |
| html-validate | HTML | OK |
| Assets budgets | Poids | < budget défini |

**Modules interactifs :**
Chaque widget livré en **3 fichiers :**
```
/outils/
  points.html
  points.css
  points.js
```
+ exposer `window.ParliosPoints.add(n)`  
+ `/outils/index.html` listant tous les outils.

**Definition of Done :**
- Aucun warning console  
- API dispo  
- Zippable et Dropable sans erreur  
- QA toutes vertes ✅

---

## 🚀 Bonus : mini “Do / Don’t”

### ✅ À faire
- Zip **le contenu**, jamais le dossier parent.  
- Utiliser des **liens relatifs**.  
- Intégrer les placeholders dès la structure.  
- Rendre **chaque étape livrable** (ZIP ou code complet).  
- QA **avant** le zip final.  
- Modulariser les interactions (widgets isolés).  

### ❌ À éviter
- Promettre des fonctionnalités “multi-user” sans backend.  
- Cumuler 3 animations lourdes (parallaxe + blur + halo).  
- Employer des chemins absolus (`/assets/...`).  
- Remettre la QA “après déploiement”.  
- Créer un “ZIP universel” : reste sur 3 ZIPs (structure/design/final).  

---

## 🧩 Structure finale type

```
parlios_v3/
├── index.html
├── 404.html
├── manifest.json
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── brand/
│   ├── css/
│   ├── js/
│   └── images/
└── outils/
    ├── index.html
    ├── points.{html,css,js}
    ├── parrainage.{html,css,js}
    └── mini-tools/
```

---

## 🧰 Tests & QA Pipeline

1. **Validation locale**
   ```bash
   npx html-validate .
   npx pa11y-ci
   npx linkinator ./index.html
   ```
2. **Audit Lighthouse**
   ```bash
   npx lighthouse http://localhost:5500 --output html --output-path ./QA_REPORT.html
   ```
3. **Compression assets**
   ```bash
   npx imagemin assets/images/* --out-dir=assets/images/
   ```

---

## 📜 Résumé exécution

| Étape | Sortie | Bloquante | QA minimale | Drop Test |
|--------|---------|------------|---------------|------------|
| Structure | parlios_v3_structure.zip | ✅ | Nav OK, 0 erreurs | Oui |
| Design & Contenu | parlios_v3_design.zip | ✅ | LCP < 2.5s | Oui |
| QA & Livraison | parlios_v3_final.zip + QA_REPORT.md | ✅ | Lighthouse ≥90, 0 erreurs | Oui |

---

## 🧠 Notes UA
- Toutes les étapes doivent produire un artefact vérifiable (ZIP ou fichiers complets).  
- Les “bonus immersifs” ne doivent jamais compromettre le Drop.  
- Le but n’est pas un site parfait visuellement, mais **un site stable, rapide, SEO & A11y validé**.  
- Cette méthode est “source de vérité” pour tout futur projet Parlios ou client (MySafeCup, Taslow, etc.).

---

**Verrouillé & approuvé — Ultimate Agent / Parlios**
