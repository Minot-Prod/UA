# Parlios — Agent Memory (Website Finalization Pack)

Ce dossier sert de **mémoire GitHub** pour un agent (mode “agent”) chargé de finaliser le site Parlios.
Il contient : les **prompts**, les **routes**, les **textes validés**, et des **checklists** d’intégration.

## Objectif
- Finaliser le site statique Netlify en réutilisant la structure déjà en ligne.
- Remplir/mettre à jour les pages avec les textes validés.
- Intégrer une **preview du Hub Parlios** (section ou page dédiée).
- Lister et préparer l’intégration des **outils gratuits** (pages/sections + exports HTML si besoin).
- Assurer la cohérence FR/EN (si activé) et la compatibilité “pretty URLs”.

## Arborescence (résumé)
- `prompts/` — Brief et tâches agent, critères d’acceptation, contraintes techniques.
- `content/` — Textes finaux (Vision, Outils, How it works/Hub, FAQ, Communauté).
- `data/` — Routes et liens; mapping fichier → page; variables de build.
- `design/` — Jetons de design (CSS variables), patterns d’accessibilité.
- `ops/` — SEO (sitemap modèle), Netlify notes, checklists QA.

## Utilisation rapide
1. Lire `prompts/agent_brief.md` (contexte + règles de travail).
2. Lire `prompts/agent_tasks.yaml` (backlog priorisé + critères d’acceptation).
3. Utiliser `data/routes.json` pour savoir **où injecter quel contenu**.
4. Mettre à jour les placeholders dans `data/links_placeholders.json`.
5. Suivre la checklist `ops/qa_checklist.md` avant commit.

---

> **Important** : ne pas changer la structure globale de la page d’accueil sans besoin. Priorité à **injecter le texte** dans les sections existantes et à créer des pages dédiées pour éviter les 404.
