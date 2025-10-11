🧠 Parlios Homepage Visuals Pack — Guide d’intégration

But :
Ce pack contient tous les visuels officiels à utiliser pour la page d’accueil de Parlios.
Chaque image a été optimisée pour une intégration directe sur le site sans placeholder.

Format standard :
1792×1024 (ratio 16:9 ou proche 21:9 pour sections immersives)
Style :
Lucid Realism — esthétique futuriste anthracite, halos cyan et orange, profondeur cinématique, reflets doux.
Dossier cible :
/assets/visuals/

🏠 1. Hero principal
- Lucid_Realism_dark_futuristic_website_hero_background_anthraci_0.jpg
- Lucid_Realism_dark_futuristic_website_hero_background_anthraci_1.jpg
- Lucid_Realism_dark_futuristic_website_hero_background_anthraci_2.jpg
- Lucid_Realism_dark_futuristic_website_hero_background_anthraci_3.jpg
Section : index.html > header.hero

🌍 2. Communauté Parlios
- A_digital_artwork_in_a_futuristic,_cyberpunk_style.png
Section : index.html > section#community

💻 3. Application Parlios (bientôt)
- A_2D_digital_image_serves_as_the_homepage_of_a_fut.png
Section : index.html > section#app-coming-soon

⚙️ 4. Directives de performance
- Convertir en .webp avant intégration dans Netlify Drop (gain moyen : –65 %)
- Compression recommandée : qualité 80–85
- Poids cible : ≤ 500 Ko
- Lazy loading pour toutes les images non visibles immédiatement

🎨 5. Palette & ambiance visuelle officielle Parlios
| Élément | Code | Usage principal |
|----------|------|----------------|
| Fond anthracite | #0B0B0F | Base sombre du site |
| Texte clair | #F5F5F5 | Couleur principale du texte |
| Texte secondaire | #B4BDC4 | Paragraphes, microtexte |
| Accent cyan | #3FE2B8 | Boutons, halos lumineux |
| Accent orange/rouge | #BF4020 | Contrepoint du logo Parlios |
| Accent doux cyan | #B4F2E8 | Hover, dégradés |
| Cartes / blocs | #121319 | Fond des sections “card” |
| Bordures | #1E2230 | Séparations discrètes |
| Ombre globale | rgba(0, 0, 0, 0.35) | Profondeur cinématique |
| Halo néon Parlios | rgba(63, 226, 184, 0.15) | Effets survols / projecteurs |
| Filtre overlay Hero | linear-gradient(180deg, rgba(11,11,15,.72), rgba(11,11,15,.72)) | Lisibilité du texte sur visuel |

✅ Recommandation finale :
Tous les visuels de ce pack ont été conçus pour être interopérables : ils conservent la cohérence visuelle Parlios (futuriste, humain, inspirant).
