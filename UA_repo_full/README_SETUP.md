# UA Repo — Knowledge & CI Setup

Ce paquet fournit :
- `knowledge/UA_Agents_Inventory.csv` : inventaire (~85 agents) par famille, statut "Ready".
- `knowledge/UA_Agents_KnowledgePacks.md` : Knowledge Packs v1 (structure canvas).
- `.github/workflows/ua_agents_pack_artifact.yml` : génère un artefact CI `UA_Agents_KnowledgePacks.zip` à chaque push sur `main`.
- `.github/workflows/ua_agents_pack_commit.yml` : commit le ZIP dans `knowledge/artifacts/UA_Agents_KnowledgePacks.zip` (permissions `contents: write`).

## Installation
1. Dézippez ce paquet **à la racine de votre repo**.
2. Gardez **un seul** des deux workflows (supprimez ou renommez l’autre).
3. `git add . && git commit -m "Add knowledge + CI"` puis `git push`.
4. Sur chaque push `main` :
   - *artifact.yml* : retrouve le ZIP dans **Actions → Artifacts**.
   - *commit.yml* : le ZIP est versionné dans `knowledge/artifacts/`.

## Notes
- Les détails exhaustifs sont dans le canvas “UA — Inventaire Agents & Knowledge Packs (v2.0)”. 
- Vous pouvez éditer le CSV/MD → le workflow regénère le ZIP automatiquement.
