# Parlios — Free Teasers Plan (Landing Page)

## 🎯 Objectif
Créer 4–5 "teasers" gratuits ultra‑utiles (zéro friction) qui:
- apportent une vraie valeur quotidienne aux auto‑entrepreneurs,
- génèrent un rendu **partageable** (PDF/PNG/lien) avec branding Parlios,
- collectent un lead minimal (email facultatif → lien direct ; email requis → PDF),
- coûtent très peu à maintenir (prompts encapsulés / calcul local / cache).

---

## 🧰 Catalogue des teasers (12 idées prêtes à piocher)

> Pour chaque teaser: **Quoi → Entrées → Sortie → Partage → Dev**.

1) **Headline & Hook Grader (Landing/Ad)**  
Quoi: score qualité de titre/accroche + suggestions.  
Entrées: Titre (140 char), Contexte (option).  
Sortie: Score/100 + 3 versions optimisées.  
Partage: PNG "score card" + lien partage.  
Dev: S (prompt encapsulé).

2) **Persona Express (Make‑My‑Persona‑like)**  
Quoi: mini‑persona en 8 bullets + pain points + messages.  
Entrées: Secteur, Audience, Offre.  
Sortie: Carte PDF persona (brandée).  
Partage: PDF + bouton WhatsApp/Email.  
Dev: S (prompt + gabarit PDF).

3) **Audit Bio Instagram/LinkedIn**  
Quoi: 5 axes d'amélioration bio + call‑to‑action.  
Entrées: bio/URL.  
Sortie: check‑list + 3 bios optimisées.  
Partage: PNG carousel 1080×1080.  
Dev: S.

4) **Mini SWOT Express**  
Quoi: 3×4 points SWOT + 2 actions immédiates.  
Entrées: Secteur, Ville/Pays.  
Sortie: carte SWOT (PDF).  
Partage: PDF + share link.  
Dev: S.

5) **Idea → Mini Business Plan (1‑page)**  
Quoi: résumé, valeur, cible, canaux, revenus, risques.  
Entrées: Idée, Cible, Budget (opt.).  
Sortie: One‑pager PDF.  
Partage: PDF.  
Dev: S.

6) **Contract Clause Risk Finder**  
Quoi: sur une clause collée → 3 risques + reformulation.  
Entrées: clause/contrat (texte).  
Sortie: note synthèse + version améliorée.  
Partage: PDF (filigrane non‑conseil).  
Dev: S (prompt + disclaimer).

7) **Aides/Subventions Radar (générique)**  
Quoi: 3 pistes d'aides + liens officiels (si dispo).  
Entrées: Secteur, Ville/Pays.  
Sortie: tableau court.  
Partage: PDF.  
Dev: S (avec mise en garde régionale).

8) **Checklist Comptable Mensuelle**  
Quoi: obligations, échéances, relances type.  
Entrées: Pays, Régime.  
Sortie: to‑do PDF + .ics optionnel.  
Partage: PDF + ICS.  
Dev: S.

9) **Email/DM Reply Assistant**  
Quoi: répondre pro à un message collé (ton/formalité).  
Entrées: message, ton, objectif.  
Sortie: réponse prête à copier.  
Partage: bouton "Copier & Partager".  
Dev: S.

10) **Invoice PDF Starter (light)**  
Quoi: gabarit facture simple (logo, TVA locale).  
Entrées: Infos société + ligne(s).  
Sortie: PDF facture (footer "Made with Parlios").  
Partage: PDF.  
Dev: M (génération PDF + champs).

11) **OG Image Maker (post LinkedIn)**  
Quoi: image 1200×630 avec titre + logo Parlios discret.  
Entrées: Titre, Sous‑titre court.  
Sortie: PNG social card.  
Partage: lien + boutons WhatsApp/X/LinkedIn.  
Dev: M (template Canvas/HTML2Image).

12) **Website Copy Grade (Hero Section)**  
Quoi: diagnostic Hero (promesse, preuve, CTA) + re‑écriture.  
Entrées: URL ou texte.  
Sortie: note + version recommandée.  
Partage: PNG "score card".  
Dev: S.

---

## ⭐ Reco "à shipper" pour la home (5)
1. Headline & Hook Grader  
2. Persona Express  
3. Contract Clause Risk Finder  
4. Checklist Comptable Mensuelle  
5. Website Copy Grade  

> Couverture équilibrée: marketing, stratégie, juridique/compta, conversion. Tous réalisables en <1 semaine cumulée.

---

## 🧩 Intégration technique (squelette)

### UI/UX
- Grille 2×3 de cartes teasers → modales avec 2–3 champs max.  
- CTA primaire: **Générer** → affichage résultat → **Télécharger/Partager**.  
- Branding discret dans le rendu (footer ou filigrane).

### Backend
- **Netlify Functions** (ou Vercel/Cloudflare) → endpoint par teaser.  
- **Prompts encapsulés** dans un répertoire `/prompts` (YAML/JSON).  
- **Rate‑limit**: IP throttle (e.g., 5 req/min), cache 24h par hash d’entrée.  
- **PDF/PNG**: Puppeteer/Playwright ou html‑to‑image (pour score cards).  
- **Share**: liens `mailto:`, `whatsapp://send?text=...`, `https://t.me/share/url?url=...`.

### Schéma de config (JSON)
```json
{
  "id": "headline_grader",
  "name": "Headline & Hook Grader",
  "inputs": [
    {"key": "headline", "label": "Titre", "type": "text", "max": 140},
    {"key": "context", "label": "Contexte", "type": "textarea", "optional": true}
  ],
  "prompt": "Évalue la qualité marketing du titre: [headline]. Donne un score /100, 3 axes d'amélioration et 3 variantes meilleures. Format: JSON avec keys score, tips[], variants[].",
  "output": {"type": "score_card", "format": "png"},
  "disclaimer": "Outil informatif. Pas un conseil professionnel."
}
```

---

## 📣 Mécaniques de viralité
- **Score Cards** (PNG) partageables + lien de vérification publique (slug).  
- **Email un ami**: mailto pré‑rempli + lien court (utm, ref).  
- **Referral**: 1 partage = 1 bonus (ex. +1 variante d’audit).  
- **Watermark**: "Made with Parlios" + URL.

---

## ⚖️ Conformité & disclaimers
- Mention claire: "Information générale, sans valeur de conseil légal/comptable."  
- Lien vers ressources officielles quand présent.  
- Pas de stockage de données sensibles; logs anonymisés.

---

## 📊 KPIs & A/B
- CTR carte → modale, taux génération, téléchargements, partages.  
- Leads captés (soft gate vs hard gate).  
- A/B: visuel des cartes, ordre des teasers, wording CTA.

---

## ⏱️ Charge & coûts (estimatif MVP)
- 3 teasers simples (S): ~1.5 j  
- 2 teasers visuels (M): ~2 j  
- Intégration + tracking: ~1 j  
**Total**: ~4.5 j dev net.

---

## 🔜 Next moves
1) Valider la shortlist (5).  
2) Gabarits UI (cards + modales + score cards).  
3) Implémenter endpoints + cache.  
4) QA + A/B initial.  
5) Mise en prod page d’accueil.

