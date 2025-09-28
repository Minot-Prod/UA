# Parlios — Patch d’activation : Web Creation Team

Ce pack active le module **Web Creation Team** (agents IA pour création de sites & visuels) dans Parlios.

## Contenu
- `modules/WebCreationTeam.json` — Spécification complète du module (23 agents + router + pack contract).
- `manifests/AGENT_UltimateAgent.manifest.json` — **Exemple de manifest complet** incluant l’enregistrement du module.
- `manifests/Parlios.Modules.json` — Registre des modules (format simple) si votre loader Parlios l’utilise.
- `config/WebCreation.router.json` — Réglages router (latences, priorités, quotas).
- `scripts/apply_webcreation_patch.sh` — Script bash d’exemple pour copier/activer le module.

> Remarque : si vous avez déjà un manifest existant, **remplacez uniquement la section `modules`** par celle fournie ci-dessous ou ajoutez l’entrée `module.webcreationteam` en respectant votre structure.

## Étapes d’installation (manuel)
1. Copier `modules/WebCreationTeam.json` dans votre repo Parlios, ex. `./parlios/modules/WebCreationTeam.json`.
2. Ouvrir votre manifest d’agent principal (ex. `AGENT_UltimateAgent.manifest.json`) et vérifier/ajouter :
```json
{
  "modules": [
    {
      "id": "module.webcreationteam",
      "name": "Web Creation Team",
      "path": "./modules/WebCreationTeam.json",
      "enabled": true,
      "router": "agent.coordinator"
    }
  ]
}
```
- Si la clé `modules` existe déjà, **ajoutez** l’objet ci-dessus à la liste.
- Vérifiez que le chemin `path` pointe bien vers l’emplacement réel du fichier sur votre repo.

3. (Optionnel) Si vous utilisez un registre modules séparé, remplacez `manifests/Parlios.Modules.json` ou fusionnez le contenu.
4. (Optionnel) Ajustez `config/WebCreation.router.json` (priorités agents, quotas, budgets).
5. Commitez et déployez. Lancez une exécution de test : *brief "site e-commerce bougies artisanales"* → vérifiez que le pack est généré.

## Validation
- Le module apparaît comme **enabled**.
- Une requête au router (`agent.coordinator`) en présence d’un brief déclenche la chaîne (Strat → Brand → UX → Copy → Media → Perf/SEO → CRO → QA).
- Le **pack contract** est rempli : tokens, wireframes, copy, media, seo, a11y, perf, forms, cms, qa.

## Désinstallation / toggle
- Mettre `enabled: false` sur l’entrée du module dans le manifest.
- Ou supprimer l’objet `module.webcreationteam` de la liste `modules`.

---

© Parlios — 2025-09-28