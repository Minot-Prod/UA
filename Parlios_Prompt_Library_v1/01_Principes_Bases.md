# 1) Principes de base du prompt engineering

| Principe | Pourquoi c’est important | Astuce / exemple |
|---|---|---|
| Contexte + rôle + instructions claires | Le modèle “adopte” un rôle et aligne sa sortie | « Tu es un **expert iOS + React**. Ta mission : … » |
| Spécificité (langage, framework, contraintes) | Plus la demande est précise, plus la sortie est utile | « Génère un composant **SwiftUI (iOS 17)** affichant une **liste paginée** d’articles avec images. » |
| Exemples / few-shot | Le modèle imite le format | Inclure 1–2 exemples **prompt→réponse** |
| Étapes explicites (raisonnement outillé) | Les tâches complexes gagnent en qualité | « D’abord lister les tâches → puis générer le code pour chaque tâche. » |
| Itérations / feedback | On affine la sortie | Demander **3 variantes**, comparer, fusionner |
| Scope limité | Réduit les hallucinations / erreurs | Traiter **1 module** (ex: auth) plutôt que « tout le site » |
| Validations / tests | Fiabilise le code généré | « Écris des **tests unitaires** et vérifie les erreurs possibles. » |

> Références de bonnes pratiques : Prompting Guide (promptingguide.ai), OpenAI Best Practices, etc.
