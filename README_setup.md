# 🚀 UA Auto-App — Setup

## 1. Pré-requis

- ✅ Repo GitHub avec Actions activées
- ✅ Trois workflows ajoutés :
  - `.github/workflows/auto_app_scaffold.yml`
  - `.github/workflows/auto_app_backend.yml`
  - `.github/workflows/auto_app_deploy.yml`
- ✅ Secrets Netlify **ou** Vercel si tu veux déployer

> ℹ️ **Supabase n’est pas encore nécessaire.**  
> Les variables `SUPABASE_URL` et `SUPABASE_ANON_KEY` peuvent rester vides pour le moment.  
> Tu pourras les ajouter plus tard dans GitHub → Settings → Secrets → Actions.

---

## 2. Étapes d’utilisation

### Étape 1 — Scaffold
1. Va dans l’onglet **Actions** de ton repo.  
2. Lance le workflow **UA Auto-App • Scaffold**.  
3. Paramètres recommandés :  
   - `app_name = parlios`  
   - `framework = react-vite`  
   - `api_runtime = fastapi`  
4. Résultat attendu : création des dossiers `/app`, `/api`, `/supabase`, `/infra`.

---

### Étape 2 — Backend & Tests
1. Lance le workflow **UA Auto-App • Backend & Tests**.  
2. Ce workflow installe FastAPI et exécute un test unitaire sur l’endpoint `/healthz`.  
3. Résultat attendu : artefact **backend-test-logs** disponible dans GitHub Actions.

---

### Étape 3 — Build & Deploy
1. Lance le workflow **UA Auto-App • Build & Deploy**.  
2. Choisis une cible :  
   - `deploy_target = netlify` *(par défaut)*  
   - ou `deploy_target = vercel`  
3. Résultat attendu :  
   - Build frontend (React + Tailwind)  
   - Smoke test backend local  
   - Déploiement → Artefact **deploy-info** avec l’URL publique

---

## 3. Variables d’environnement

### Supabase (optionnel pour le moment)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

> Pas besoin de les remplir pour les premiers tests.  
> Une fois ton projet Supabase créé, ajoute ces secrets pour activer la connexion DB.

### Netlify (si `deploy_target=netlify`)
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### Vercel (si `deploy_target=vercel`)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 4. Résultats attendus

- **Étape 1** : Arborescence scaffoldée → commit GitHub.  
- **Étape 2** : Tests backend OK (`/healthz` → 200).  
- **Étape 3** : Site live déployé sur Netlify ou Vercel.  

⚠️ **Sans Supabase** : l’app frontend s’affiche, mais les fonctionnalités DB/auth ne sont pas actives.  
Tu auras quand même un site public minimal fonctionnel.

---

## 5. Next Steps (quand Supabase sera prêt)

1. Créer un projet Supabase → récupérer `SUPABASE_URL` + `anon` key.  
2. Ajouter les secrets dans GitHub.  
3. Appliquer le schema de `supabase/seed.sql`.  
4. Relancer **UA Auto-App • Deploy** → l’app utilisera Supabase.

---

## 6. Notes

- Tous les runs sont loggés avec CREDIT_LOG (voir blueprints).  
- Checkpoint 70% actif (arrêt avant dépenses inutiles).  
- Code scaffold minimal → à enrichir ensuite (UI, logique métier).  

---
