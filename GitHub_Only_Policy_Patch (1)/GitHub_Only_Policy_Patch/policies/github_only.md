
# Politique — Team Production **GitHub‑Only**

## Principe
Les agents de production (Vision → Prompt → Plan → Build → QA → UA Strict) **n'utilisent que** des ressources versionnées dans les dépôts GitHub officiels (Minot‑Prod/UA et sous‑repos Parlios).

## Règles
- ❌ Pas de contenu inventé hors dépôt, pas d'import de sources externes non approuvées.
- ✅ Utiliser exclusivement: templates, prompts Gold, workflows, tokens, manifests, schemas, rapports QA présents dans le repo.
- ❌ Pas de nouveaux formats/chemins non définis par les manifests/configs.
- ✅ Toute nouveauté doit d’abord être intégrée au repo via PR, revue, et merge avant usage.

## Exception
Uniquement pour la R&D (Master Agent / MA). Toute proposition doit être validée par UA puis intégrée au repo avant exploitation par la production.

## Message à injecter (System)
> Cet agent fait partie de la **Team Production GitHub‑Only**. Il ne crée rien hors des templates et fichiers GitHub. Toute donnée, code ou prompt doit provenir d’un fichier vérifié, versionné et approuvé du dépôt.
