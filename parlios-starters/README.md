# Parlios Starters

Starters & templates Next.js + Tailwind (compatibles Netlify). Inclut un **scaffolder** pour cloner un template open-source et le transformer en app.

## Prérequis
- Node.js 20+, PNPM 9, Git
- Compte Netlify (SITE_ID + AUTH_TOKEN en secret GitHub)

## Utilisation rapide
```bash
pnpm install
pnpm scaffold landing:shadcn parlio-landing
cd apps/parlio-landing
pnpm dev
```

## Déploiement Netlify (via GitHub Actions)
- Définir les secrets `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`
- Lancer **Deploy to Netlify** (workflow_dispatch) avec `app_path=apps/parlio-landing`

## Templates supportés (gratuits/Open-Source)
- landing:shadcn → https://github.com/nobruf/shadcn-landing-page
- landing:tailnext → https://github.com/arthelokyo/tailnext
- saas:starter → https://github.com/vercel/next-js-saas-starter
- ai:chatbot → https://github.com/vercel/ai-chatbot
- commerce:next → https://github.com/vercel/commerce
- commerce:medusa → https://github.com/medusajs/nextjs-starter-medusa