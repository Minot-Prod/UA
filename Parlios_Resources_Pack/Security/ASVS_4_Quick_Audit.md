# ASVS 4.x — Audit rapide (checklist de bon sens)
Réf. : https://owasp.org/ASVS/

- [ ] Gestion des secrets (env, rotation si sensible).
- [ ] Entrées validées (type, taille, liste blanche quand possible).
- [ ] Sorties échappées côté UI et API.
- [ ] Mots de passe/hash/mfa conformes (si compte).
- [ ] Headers sécurité (CSP, HSTS, X‑Content‑Type, etc.).
- [ ] Journaux sans données sensibles, rétention définie.
- [ ] Dépendances scannées, versions épinglées si critique.
- [ ] Accès réseau sortant limités, timeouts, retries.
