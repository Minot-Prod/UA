# Parlios — EXV Étape 11B · Comptes & Rôles (RBAC light) — v12b

Ajoute une couche **RBAC light** : rôles `admin`, `user`, `guest`.  
Protection des pages `/dashboard` (user+) et `/admin` (admin). Middleware vérifie **session + rôle** via cookies.

## Flow
- Login démo : choix du rôle (admin/user).  
- Cookie session `parlios.session` (HttpOnly; Secure; Lax; 7j).  
- Cookie rôle `parlios.role` (accès middleware, non-HttpOnly pour la démo UI).  
- `/api/auth/me` renvoie `authenticated`, `role`, `user`.

> En prod: stocke le rôle côté serveur (DB) et signe le jeton; évite d'exposer le rôle en clair côté client. Ici c'est **démo**.

## Dossiers
- `demo-next/` : pages `/login`, `/dashboard`, `/admin`, `middleware.ts` mis à jour.  
- `demo-static/` : note d’usage.
