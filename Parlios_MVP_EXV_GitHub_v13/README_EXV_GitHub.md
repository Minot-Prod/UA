# Parlios — EXV Étape 13 · Sécurité backend avancée (v13)

Objectif: durcir le backend du MVP (Next.js API routes) sans dépendances externes:
- **CORS strict** (origines autorisées, méthodes, headers, credentials).
- **Rate limiting** (IP-based, fenêtre 60s).
- **Audit logs** (login/logout/me, erreurs, rate limited).
- **Headers sécurité** (_headers Netlify inclus).

> Remplace les valeurs d'origine (allow_origin) par tes domaines de prod (ex: *.parlios.ca) avant mise en ligne.
