# 🧭 Parlios Method 2.0
**Dossier de référence — Processus complet de création automatisée de sites web personnalisés**

**Auteur :** Ultimate Agent (UA)
**Client :** Parlios (Maxime)
**Version :** 2.0
**Date de build :** 2025-10-05
**Statut :** Production Ready
**Chemin d’intégration :** `/UA_docs/Parlios_Method_2.0.md`

---

## 1. 🎯 Vision & Philosophie

### 1.1 Mission
Parlios 2.0 a pour mission de permettre à toute personne, qu’elle soit artiste, entrepreneur, influenceur, e-commerçant ou startup, de créer son propre site web complet — automatiquement, sans connaissance technique, en une seule fois.

Objectif : transformer une série de réponses en un site final prêt à l’emploi, hébergé sous la bannière Parlios, accessible via `nomclient.parlios.com`.

### 1.2 ADN Parlios
- Accessibilité universelle
- Design intelligent (IA = designer, rédacteur, développeur)
- Fluidité totale (zéro retouche)
- Hébergement automatique (Netlify, sous-domaine Parlios)
- Qualité pro (SEO, responsive, a11y, perf, cohérence)
- Anti-complexité (tout automatiser)

---

## 2. 🏗️ Architecture Globale

Chaîne de génération IA orchestrée (prompt chaining), alignée UA/Base44.

```mermaid
flowchart LR
  A[Client Formulaire IA] --> B[Analyse & Structuration (UX IA)]
  B --> C[Génération Contenu & SEO]
  C --> D[Génération Visuelle (logo, images, couleurs)]
  D --> E[Génération Code (HTML/CSS/JS)]
  E --> F[Validation QA (Perf, A11y, SEO)]
  F --> G[Déploiement Netlify (nomclient.parlios.com)]
  G --> H[Notification & Livraison au client]
```

---

## 3. 🧩 Formulaire d’entrée intelligent (Input IA)

### 3.1 Objectif
Collecter toutes les informations nécessaires à la génération complète du site — en une fois, sans retour.

### 3.2 Format (10 questions max)
Identité, activité, objectif, contenu clé (présentation, services/produits, témoignages, contact), style & ambiance, logo/images (upload ou IA), couleurs/typographie, langues, contacts & réseaux, références/inspirations.

### 3.3 Sortie (exemple JSON)
```json
{
  "name": "Nom du projet",
  "industry": "Secteur",
  "goal": "Objectif principal",
  "content": {
    "about": "…",
    "services": "…",
    "testimonials": "…",
    "contact": "…"
  },
  "style": {
    "keywords": ["moderne", "élégant"],
    "colors": ["#00A896", "#05668D"],
    "font": "Poppins"
  },
  "assets": ["logo.png", "hero.jpg"],
  "languages": ["fr", "en"],
  "contact": {"email": "…", "instagram": "…"}
}
```

---

## 4. ⚙️ Chaîne de génération IA

### 4.1 UX & Structure
Déterminer type de site, sections, menu, hiérarchie. Prompt “Expert UX”.

### 4.2 Rédaction & SEO
Rédaction pro, ton adapté, H1/H2, metas, mots-clés. Zéro placeholder.

### 4.3 Génération visuelle
Logo (si absent), images (IA/stock), palette couleurs, police, cohérence design.

### 4.4 Génération Code
Assembler HTML/CSS/JS, alt/meta/schema/og, responsive, perf & a11y.

### 4.5 QA & Validation
htmlhint/csslint/pa11y, sitemap/robots, Lighthouse. Objectifs : LCP < 2.5s, a11y AAA, SEO > 90.

### 4.6 Déploiement Netlify
Création site `nomclient.parlios.com`, upload `/dist/`, HTTPS, notification.

---

## 5. 🧪 Qualité

- Validation IA (revue “Expert Dev”, “UX Reviewer”)
- Human QA (option premium)
- Replay CI/CD (UA → MAP → Netlify)

Objectifs : Lighthouse ≥95, WCAG AAA, SEO ≥90, zéro placeholder.

---

## 6. 🔁 Industrialisation

Hébergement Netlify multi-sites, sous-domaines isolés, CI/CD GitHub + n8n, webhooks Notion/Discord, CREDIT_LOG, rapports UA. RGPD, TLS, audit hebdo. Module “Update” prévu.

---

## 7. 📦 Git & Branches (exemple)

- main (stable/prod)
- integration/ (pré-fusion)
- feature/form
- feature/content
- feature/visuals
- feature/build
- feature/deploy
- feature/docs

---

## 8. 🧱 Annexes

### Prompt client (ex)
Crée un site vitrine pour un photographe indépendant nommé Julien Moreau… (style moderne, sections présentation/galerie/tarifs/contact, FR).

Résultat : site HTML responsive, images IA, contenu SEO, déployé sous `julienmoreau.parlios.com`.

---

## 9. 📈 Améliorations
IA Designer Feedback, cohérence globale, coûts IA → Firefly III, dashboard admin, KPI (génération < 2 min, satisfaction > 95%, erreurs déploiement < 0.5%).

---

## 10. ✅ Conclusion
Méthode 2.0 = usine à sites personnalisés, IA-native, scalable, sous marque Parlios. Production Ready (99% confiance).
