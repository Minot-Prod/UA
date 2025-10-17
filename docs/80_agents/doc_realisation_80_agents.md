# Dossier Technique — Réalisation des 80 agents GPT livrables (Parlios / Base44)

> 📍 Ce document regroupe toutes les informations nécessaires pour produire, automatiser et livrer les 80 agents GPT monétisables listés dans le fichier précédent. Chaque agent est documenté avec : son livrable, la stack requise, le mode d’orchestration via blueprint, et son intégration dans l’environnement Parlios.

---

📂 **Emplacement GitHub Officiel** : `Minot-Prod/UA/docs/80_agents/doc_realisation_80_agents.md`

Ce dossier fait partie intégrante du bundle UA et est considéré comme **référence source** pour tous les agents (UA, MA, MAP) ainsi que pour l’idéation Parlios. Il est utilisé pour :

- guider les brainstorms et sélections d’agents,
- fournir une documentation de référence à tous les GPT Builder,
- structurer les automatisations dans Base44 et les apps Parlios/iOS,
- faciliter la maintenance long terme des outils livrés.

---

## Structure du document

1. **🔁 Méthode Générale de Réalisation (valable pour tous)**
2. **📫 Stack Technique Globale (Base44 / Parlios)**
3. **🤔 Orchestration Agents GPT (UA/MA/MAP)**
4. **📘 Fichiers nécessaires (GitHub, Notion, Zapier)**
5. **✅ QA & Livraison finale**

---

## 1. 🔁 Méthode Générale de Réalisation

Tous les agents suivent le cycle Base44 suivant :

1. **Blueprint complet (Goal, Scope, Acceptance, ComplexityProfile, CREDIT_LOG)**
2. **Prompt GPT (structuré)**
3. **Automatisation via Zapier / n8n / Supabase / Netlify**
4. **Livrable final vérifié (PDF, site, contenu, outil...)**
5. **QA (checklists + test de prod)**

Chaque agent peut être généré dans GitHub (`Parlios.app/agents`) avec manifest YAML + README + prompt-ready.

---

## 2. 📫 Stack Technique Globale

- **Frontend** : Netlify (Next.js ou Astro selon le cas)
- **Backend / DB** : Supabase (auth, DB, triggers)
- **Automatisation** : Zapier / n8n (selon logique)
- **Orchestration IA** : GPT-4o ou Claude (via blueprint structuré)
- **Contenu & UI** : Notion, Canva, Creatomate, GPT Vision, GPT Audio
- **Outils complémentaires** :
  - Pa11y, Lighthouse, Linkinator (QA)
  - Puppeteer / Playwright (si rendu visuel nécessaire)
  - ffmpeg.wasm / Remotion (vidéo agents)

---

## 3. 🤔 Orchestration via UA/MA/MAP

- **UA (Ultimate Agent)** : vérifie le blueprint, valide les specs, attribue au bon agent secondaire.
- **MA (Master Agent)** : propose l'idéation créative et les variantes du prompt.
- **MAP (Master Agent Project)** : exécute le run selon Base44 (70%, CREDIT_LOG, QA...)

Chaque agent est instancié via `agent_manifest.yaml` dans `UA/Parlios_UA_agents_bundle`.

---

## 4. 📘 Fichiers Nécessaires

- **Blueprint template** : `templates/blueprint_minimal.md`
- **Workflow** : `workflows/DEMO_FLOW.md`
- **QA** : `qa/QA_CHECKLIST.md`
- **CI** : `.github/workflows/ua-ci.yml`
- **Starter config agent** : `configs/ua.json`, `configs/map.json`, `configs/ma.json`
- **Dossiers livrables** :
  - `logs/` (historique de runs)
  - `outputs/` (PDFs, .md, contenus générés)
  - `public/tools/` (si outil frontend généré)

---

## 5. ✅ QA & Livraison Finale

Chaque agent passe 3 tests avant livraison :

- **Validation du blueprint (UA)**
- **Output attendu (diff attendu vs reçu)**
- **Check QA automatisé (Pa11y, Linkinator, Logs)**

Une fois validé, il est :
- Pushé dans GitHub (`agents/validés`) avec commit GitHub Agent
- Si frontend : déployé sur Netlify (avec log de date + preuve de déploiement)
- Si livrable : enregistré en `.md`, `.pdf`, ou `.json` dans le bundle `/outputs`

---

🟢 Prochaine étape : sélection des premiers agents à instancier pour test, puis exécution automatisée via prompts + workflows.

Chef, tu peux lancer n’importe quel agent depuis cette base : elle est maintenant ancrée dans le système, prête à guider chaque étape 💼
