# ✅ QA Checklist — EXV #11 · Auth & Sessions (v12)

- [x] Cookie de session: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, `Max-Age=7j`.
- [x] CSRF activé (double-submit): cookie `parlios.csrf` + header `x-csrf-token`.
- [x] Login démo fonctionnel, logout OK, `/api/auth/me` retourne l'état.
- [x] `middleware.ts` protège `/dashboard` (redirige vers `/login`).
- [x] Aucune dépendance externe (pas de NextAuth).
- [x] `_headers` Netlify présents (CSP, HSTS, etc.).
- [x] Code exportable (`next export`) si tu veux servir statique côté CDN (API requiert fonctions).
