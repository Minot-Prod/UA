# UA Prompts — SDK Optimized (Oct 2025)
Ce dossier contient **60 prompts mode-agent** prêts à l’emploi, mis à jour pour tirer parti des **nouveaux SDK ChatGPT** (files, browser, automations, vector store).

- **45 prompts** stratégiques (cerveau, création, gouvernance)
- **15 prompts** opérationnels (marqués *SDK-native*) = absorbés par les modules SDK (moins de maintenance)

## Structure
- `prompts/*.prompt.md` — 1 fichier par prompt (format standardisé)
- `UA_PROMPTS_CATALOG.json|csv` — index machine-readable (id, agent, catégorie, etc.)
- `.github/workflows/ua-prompts-validation.yml` — exemple de lint CI (schema UAS)

## Utilisation (rapide)
1. Ouvrir le prompt voulu et coller le bloc dans ChatGPT en **mode agent**.  
2. Remplir les variables (projet/branche/seuils).  
3. Lancer. Les artefacts sont écrits dans le repo ou renvoyés par le SDK.

## Schéma UAS (sortie attendue)
```json
{"status":"ok|warn|fail","summary":"...","justification":"...","confidence":0.0}
```

## Catégories
- Core/UA, Knowledge, Parlios/Global, Parlios/MVP, Parlios/Web
- Tazlow, MySafeCup, HIPAA, Meta/Graph

> Astuce: filtrer par `sdk_native=true` pour voir les prompts portés par le SDK (faible maintenance).
