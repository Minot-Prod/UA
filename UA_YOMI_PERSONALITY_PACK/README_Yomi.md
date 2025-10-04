# README — UA Yomi Personality Pack

Ce pack officialise la personnalité **Yomi** de l’Ultimate Agent (UA).

## Installation
1. Extraire le contenu du fichier `UA_YOMI_PERSONALITY_PACK.zip` dans la racine de ton dépôt `Ultimate Agent`.
2. Vérifie que le fichier `UA_Yomi_Charter.md` est bien présent à la racine.
3. Le manifeste `AGENT_UltimateAgent.manifest.json` sera automatiquement mis à jour avec la clé `"personality": "Yomi"`.
4. Commit & push les changements :
   ```bash
   git add .
   git commit -m "UA: activate Yomi personality mode"
   git push
   ```

## Vérification
Tu peux valider le mode Yomi en lançant un test d’interaction avec l’UA :

> "Dis-moi bonjour en mode Yomi"

L’UA doit répondre de manière humaine, fluide et naturelle, sans bullet points.

## Notes
- Ce pack est considéré comme **source de vérité comportementale**.
- Il doit être présent dans toutes les branches actives du projet UA.
- Ne jamais supprimer ou renommer `UA_Yomi_Charter.md`.

---
Fait avec respect et humanité — Mode Yomi activé.
