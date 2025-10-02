# Parlios — Guide de marque (v1)
**Statut : Officiel** • **Dernière MAJ : 2025-10-01** • **Owner : Maxime (Parlios)**

## 0. Logo officiel
- Fichier maître : `../assets/brand/parlios-logo.png`
- Empreinte (sha256) : `5483f8aa3411553c0a2dbc10c556eea9ff475a5647d99a71dd3715d80ec8154b`
- Usage par défaut : **fond sombre** (dégradé bleu nuit).
- Zone de protection : marge = 1× le rayon interne du symbole.
- Taille minimale écran : 40 px de hauteur (logo seul), 24 px (favicon simplifié).

## 1. Couleurs
- **Lava** `#FF4A1F` (primaire, rouge-orangé du symbole)
- **Ember** `#FF7A2A` (accent/halo)
- **Navy 900** `#070D1A` (fond principal)
- **Navy 700** `#0E1C3A` (fonds secondaires / sections)
- **Wave Line** `#0B2B7A` (traits ondulés subtils)
- **White** `#FFFFFF` (texte sur fond sombre)
- **Slate 300** `#C7D0E0` (texte secondaire)

> Règle d’accessibilité : contraste texte ≥ 4.5:1 (White/Navy 900 OK).

## 2. Typographies
- **Titres** : _Outfit_ / _Inter_ / _Poppins_ (semi-bold 600–700)
- **Texte** : _Inter_ 400–500
- **Chiffres/UI** : _Inter_ ou _Roboto Mono_ pour métriques

## 3. Ton & tagline
- Tagline FR : **« Optimise ton temps, libère ton potentiel. »**
- Ton : clair, confiant, orienté performance (coach + tech friendly).

## 4. Do / Don’t
**Do**
- Utiliser le logo en mono sur fonds très chargés.
- Respecter la zone de protection.
- Préserver le glow doux (Ember) sur fond sombre.

**Don’t**
- Étendre/écraser le symbole.
- Changer les couleurs du symbole.
- Poser le logo Lava/Ember sur fond rouge/orange.

## 5. Variantes & export
- `parlios-logo.png` (master) • `parlios-logo.svg` (à produire) • `favicon.ico` (à produire)
- Fonds : Dark (par défaut) / Light (mono Lava ou Noir 90%)

## 6. Composants UI (extraits)
- Bouton primaire : fond **Lava** `#FF4A1F`, texte **White**, hover vers **Ember**.
- Lien : **Ember** sur fond sombre, soulignement au survol.
- Cartes : fond **Navy 700**, radius 16–20, ombre douce.

## 7. Attributions & gouvernance
- Logo propriétaire : © Parlios.  
- Changement de logo : **uniquement** après annonce officielle de Maxime et MAJ de `brand.lock.json`.

---
_Checklist intégration_
- [ ] Image `assets/brand/parlios-logo.png` présente
- [ ] Empreinte sha256 identique
- [ ] Palette appliquée (Dark theme par défaut)
- [ ] Tagline FR correcte
