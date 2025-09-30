# 📖 README — Parlios Free Tools

## 🎯 Objectif
Ce dossier contient la **bibliothèque d’outils gratuits** utilisés dans Parlios. Ils servent :
- à créer des **teasers gratuits** sur la page de vente (attirer prospects),
- à offrir des **bonus clients** après achat (fidélisation, effet waouh).

---

## 📂 Structure des fichiers

- **UA_Prompts_JuridiqueCompta.md**  
  Prompts éprouvés pour audit de contrats, rédaction, comptabilité et finances.

- **Parlios_FreeTools_Library.md**  
  Liste d’outils gratuits variés (marketing, stratégie, juridique, finance, quotidien).

- **Parlios_FreeTools_Bibliotheque.md**  
  Vue consolidée des catégories (5 grandes familles) + bénéfices.

- **Parlios_Teasers_BonusPackages.md**  
  Sélection d’outils prêts à l’emploi :
  - Teasers (landing page, 3 outils simples et viraux)
  - Bonus Clients (5 outils spécialisés à valeur forte)

---

## 🚀 Comment utiliser

1. **Choisir un outil**  
   Parcourir les fichiers pour trouver un prompt ou outil adapté (ex: Headline Grader).

2. **Encapsulation**  
   Transformer le prompt en un petit module :
   - Inputs (2–3 champs max)
   - Prompt encapsulé (texte + variables)
   - Output (texte, PDF, PNG, ICS)

3. **Intégration front**  
   Ajouter sous forme de bouton/teaser ou d’option bonus client.

4. **Partage & branding**  
   Toujours ajouter watermark/logo Parlios + disclaimer si juridique/comptable.

---

## 🗂️ Idée d’Index (JSON/CSV)
Exemple d’entrée JSON (à stocker plus tard dans `free_tools_index.json`) :
```json
[
  {"id": "headline_grader", "category": "marketing", "file": "Parlios_FreeTools_Library.md"},
  {"id": "contract_risk", "category": "juridique", "file": "Parlios_Teasers_BonusPackages.md"}
]
```

---

## ✅ Bénéfices
- Tout est centralisé et clair.
- Navigation rapide (on sait où trouver quoi).
- Facile à transmettre à un collaborateur (Vincent, dev, etc.).
- Prêt à être branché dans le front Parlios.

---

📌 Fichier de référence : `README_FreeTools.md`

