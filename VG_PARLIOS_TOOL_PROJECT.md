# VG.PARLIOS.TOOL — Assistant Vincent (Mémoire Projet)

## 🎯 Objectif
Mettre en place une application statique et offline permettant à Vincent de :
- Générer ses livrables commerciaux (fiches, emails, posts, scripts, actions).
- Tester la méthode Parlios à travers des modules interactifs.
- Déployer facilement via Netlify Drop, sans dépendance serveur ni API.

---

## 🧩 Caractéristiques principales
- **Technologie** : HTML + Tailwind (CDN) + JS inline.
- **Modules inclus** :
  - **Yoda** : One-pager de synthèse.
  - **Atlas** : Traducteur (anciens secteurs → nouveau secteur) & Insider (conseils).
  - **Dora** : Ciblage & qualification (fiche compte `.md`, ICP `.json`, DMU `.json`).
  - **Shakespeare** : Messages prêts (email, post LinkedIn, script d’appel, mini script vidéo).
  - **Bob** : 3 actions datées (`.csv`).
  - **Router** : Intention → plan rapide.
- **Branding** :
  - Logo texte : **VG.PARLIOS.TOOL**
  - Sous-titre : *Assistant Vincent — Parlios Toolset*
  - Thème sombre, sobre et lisible.

---

## 📂 Structure du projet
```
vg_parlios_tool_offline_app/
├─ index.html      # Application complète (offline)
├─ netlify.toml    # Config Netlify (no build)
└─ _redirects      # Redirections SPA (fix 404)
```

---

## ⚙️ Déploiement sur Netlify
1. Préparer un dossier ou ZIP avec `index.html`, `netlify.toml` et `_redirects`.
2. Aller sur [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Glisser le dossier/ZIP → Netlify génère une URL publique (`https://vg-parlios-tool.netlify.app`).

### Important
- `index.html` doit être à la racine (pas de sous-dossier).  
- `_redirects` doit contenir :
  ```
  /*    /index.html   200
  ```
  pour éviter les erreurs 404.

---

## 🔮 Prochaines étapes
- [ ] Vérifier fonctionnement Netlify avec `_redirects`.
- [ ] Ajouter une section “À propos / Contact” dans l’UI.
- [ ] Lier modules générés (fiches, emails, CSV) au flux de travail réel (CRM, prospects).
- [ ] Envisager GitHub pour CI/CD, versionnage et domaines personnalisés.

---

## 📌 Notes
- Projet conçu pour être utilisable **hors-ligne** après chargement initial.
- Livrables téléchargeables en `.md`, `.json`, `.csv`.
- Les contenus générés sont des **placeholders** → à personnaliser pour Vincent.
- Cible : fournir à Vincent un assistant pratique, simple, basé sur Parlios.

---

## ✅ Historique des décisions
- Déploiement en statique privilégié (Option A).  
- Ajout du logo texte et sous-titre “Assistant Vincent — Parlios Toolset”.  
- Inclusion d’un fichier `_redirects` pour corriger les erreurs 404.  
- Mémoire GitHub demandée pour conserver la trace du projet et faciliter la production future.
