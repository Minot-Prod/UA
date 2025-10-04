# Parlios — EXV Étape 11 · Authentification & Sessions (v12)

Cette version ajoute une **auth session-cookies** minimale, **CSRF double-submit**, et une protection basique de routes via **middleware**. 
- Cookies: `HttpOnly` + `Secure` + `SameSite=Lax` (7 j).
- CSRF: cookie non-HttpOnly + en-tête `x-csrf-token` (double submit).
- Démo Next.js sans dépendance externe.

## Dossiers
- `demo-next/` : app Next.js avec routes `/api/auth/*`, pages `/login`, `/dashboard`, `middleware.ts`.
- `demo-static/` : page explicative statique (pour Netlify Drop).

## Flow
1. GET `/api/auth/csrf` → définit cookie `parlios.csrf` et retourne le token.
2. POST `/api/auth/login` (JSON: email, password, csrf) → vérifie CSRF + démo credentials → pose cookie `parlios.session` (HttpOnly; Secure; SameSite=Lax).
3. Accès `/dashboard` → protégé par `middleware.ts` (redirige vers `/login` si pas de session).
4. GET `/api/auth/me` → renvoie l'utilisateur courant.
5. POST `/api/auth/logout` → supprime le cookie.

> Note: en production, remplace la validation démo par ton vrai backend (hash, DB, etc.).
