# 🧠 Parlios — Base44 Templates Reference
> Dossier mémoire pour la reproduction et l’adaptation des apps Base44 au sein de l’écosystème **Parlios / Ultimate Agent (UA)**.  
> Objectif : disposer de modèles éprouvés, adaptables rapidement en production (Netlify, Base44, n8n).

---

## 🌍 Objectif général
Ce document sert de **mémoire technique et fonctionnelle** pour les templates Base44 utilisés comme base dans le **MVP Parlios**.  
Chaque template répertorié ici peut être :
1. **Cloné** depuis Base44 ou reconstruit localement.  
2. **Adapté** (branding, variables `.env`, intégrations).  
3. **Déployé** (Netlify Drop / n8n webhook / Supabase).  

---

## 🧩 Templates référencés (proven models)

| Nom | Fonction principale | Rôle MVP | Variables clés | Priorité |
|------|---------------------|-----------|----------------|-----------|
| **GodKo Video Studio** | Génération & édition vidéo IA | Outil phare / viralité | `UA_N8N_BASE_URL`, `STORAGE_BUCKET` | ⭐⭐⭐⭐⭐ |
| **AuraAuth** | Authentification / gestion des comptes | Accès sécurisé centralisé | `AUTH_PUBLIC_URL`, `AUTH_SECRET` | ⭐⭐⭐⭐ |
| **ClientFlow** | CRM / pipeline léger | Suivi clients & partenaires | `UA_N8N_BASE_URL`, `MAILER_KEY` | ⭐⭐⭐⭐ |
| **CreatorHub AI** | Hub créateurs / monétisation | Vitrine, freemium, communauté | (none pour MVP statique) | ⭐⭐⭐ |
| **MessageCraft AI** | Générateur multicanal | Communication, marketing copy | `UA_N8N_BASE_URL` | ⭐⭐⭐⭐ |
| **MarketGenius** | Intelligence marketing IA | Analyse audience, stratégie | (optionnel) | ⭐⭐⭐ |
| **GazeFi OS** | OS marketing omnicanal | Orchestration de campagnes | `UA_N8N_BASE_URL` | ⭐⭐⭐ |
| **OCR Scan AI** | OCR & classification documentaire | Gestion interne / factures | (none) | ⭐⭐ |

---

## ⚙️ Structure type (pour chaque app)

### 🧱 Dossier
