# ✅ QA Checklist — EXV #11B · RBAC (v12b)

- [x] Rôles supportés: admin/user/guest.
- [x] `/dashboard` accessible user+ ; `/admin` accessible admin only.
- [x] Middleware vérifie présence session ET rôle attendu.
- [x] Login propose le choix de rôle pour la démo.
- [x] `/api/auth/me` expose `role` pour l’UI.
- [x] Zéro dépendance externe; compatible Next 14.
