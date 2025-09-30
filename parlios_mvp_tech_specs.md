# 📑 Fiches techniques Parlios

---

## 1. Fiche technique — MVP Parlios

### 🎯 Objectif
Mettre en ligne la première version fonctionnelle de **Parlios** avec :
1. **Automatisations principales** (Tazlow + MySafeCup + 1 module supplémentaire).  
2. **Dashboard simple** (connexion, boutons déclencheurs, historique minimal).  
3. **Page publique (landing)** avec teasers gratuits.

### ⚙️ Stack technique
- **Frontend** : Next.js (ISR) + Tailwind + shadcn/ui.  
- **Backend léger** : API Routes Next.js ou Netlify Functions.  
- **DB** : Supabase (auth + stockage minimal des runs).  
- **CI/CD** : GitHub → Netlify.  
- **Intégrations** : n8n, Google OAuth, Discord (logs).

### 🔐 Authentification
- Google OAuth via Supabase.  
- Stocker UID + email en DB.  
- Page `/login` → bouton unique Google.

### 🖥️ Dashboard utilisateur
- **/app** (protégé)  
  - Header avec logo + compte.  
  - Section “Mes automatisations” → 3 cartes cliquables.  
  - Section “Historique” : table simple (date, action, statut, rapport).

### 🔄 Automatisations
- Chaque bouton → appel API interne → webhook n8n correspondant.  
- Exemple : `POST /api/run` avec `{ userId, automationId }`.  
- API → n8n → retour `{ status, reportUrl }`.

### 📊 Données / Logs
- Table `runs`: `id`, `userId`, `automationId`, `createdAt`, `status`, `reportUrl`.  
- Table `users`: `id`, `email`, `name`, `createdAt`.

### 🧪 QA & Monitoring
- Logs Supabase.  
- Discord `#runs` → notification webhook.  
- Rapport PDF ou texte depuis `reportUrl`.

### 📦 Packaging
- Déploiement Netlify (branch `main`).  
- GitHub Actions → lint/test → build → deploy.

---

## 2. Fiche technique — Module gratuit (Landing Parlios.ca)

### 🎯 Objectif
Afficher sur la page d’accueil **3 teasers gratuits** pour attirer et convertir les visiteurs.

### ⚙️ Stack technique
- **Framework** : Next.js (page `/`).  
- **UI** : Tailwind + shadcn/ui.  
- **Modules front only** (no backend) → rapidité & zéro coût.

### 🎁 Modules gratuits (page d’accueil)
1. **Évaluateur titre & accroche**  
   - Input : champ texte (titre).  
   - Output : score + tips + 3 variantes.  
   - Boutons : Copier / Partager.

2. **Persona Express**  
   - Inputs : Secteur, Audience, Offre.  
   - Output : Persona en 1 page (pain points, objectifs, message clé).  
   - Boutons : Export PDF, Partager.

3. **Détecteur de risques de clause**  
   - Input : texte (clause).  
   - Output : 3 risques + reformulation.  
   - Disclaimer visible.

### 🔒 Limitations gratuites
- Pas de sauvegarde.  
- Branding Parlios obligatoire.  
- CTA “Essayer la version Pro” après chaque sortie.

### 📊 Tracking
- Google Analytics.  
- Track : clics sur outils, export, CTA.

### 🧪 QA
- Compatibilité mobile (<420px).  
- Latence <1s (local).

### 🚀 Livrable final
- Page `/` avec :  
  - Hero section (pitch Parlios + CTA).  
  - Section “Essayez gratuitement” → 3 cartes interactives.  
  - Section “Passez Pro” → tarifs, fonctionnalités.  
- Responsive + animations légères