# Parlios — EXV Étape 16 · Packaging & CLI (v16)

Objectif : livrer un **CLI `create-parlios`** + **template Next.js** prêt Netlify/Vercel + **CI GitHub Actions**.
- `create-parlios` → génère un dossier `parlios-app` avec: Consent (v11), Auth (v12/v12b), Sécurité (v13), Plans (v14), Observabilité (v15).
- **Presets** Netlify/Vercel inclus (headers sécurité, config build).
- CI de base: install, build, type-check.

## Utilisation (local)
```bash
cd cli
npm i
npm link            # installe le binaire en global (local)
create-parlios my-app --template basic
cd my-app
npm i
npm run dev
```
> Alternative sans `npm link` : `node ./cli/create-parlios.js my-app --template basic`

## Déploiement rapide
- **Netlify**: dépose `/parlios-app` exporté (`next export`) ou pousse le repo → build auto.
- **Vercel**: import repo → framework détecté (Next.js).

## Structure
- `cli/` (Node binaire)
- `templates/basic/` (Next.js 14 minimal + composants clés)
- `presets/` (Netlify / Vercel)
- `.github/workflows/ci.yml` (CI)
