# 045 — Agents↔Prompts Graph Builder
**Agent**: @ArchivistAgent  
**Catégorie**: Meta/Graph  
**Type**: strategic  
**Dernière mise à jour**: 2025-10-09

## 🎯 Goal
Génère Mermaid JSON→graph; détecte orphelins.

## 🧩 Inputs (si applicables)
- Context: <projet/branche>
- Variables: <seuils, dates, ids>
- Sources: <README, REPORTS, APIs>

## ✅ Deliverables
- Fichier(s) ou rapport(s) attendu(s)
- Logs/artefacts (si CI)
- Mise à jour éventuelle (README/Notion)

## 🔧 Steps
1) Charger le contexte requis (SDK / fichiers / APIs).  
2) Exécuter l’action principale (voir Goal).  
3) Valider la sortie (schema UAS: status, summary, justification, confidence).  
4) Écrire/commiter les artefacts attendus (si nécessaire).  
5) Rédiger un mini post-mortem (1–3 lignes).

## 🛡️ Safeguards
- Respect Base44 + Mantra Yomi.  
- Si erreur → produire diagnostic court et safe-fail (aucune donnée sensible).  
- Journaliser coûts (tokens/latence) si disponible.
