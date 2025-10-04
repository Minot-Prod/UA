import type { NextApiRequest, NextApiResponse } from 'next'

type Store = {
  rates: Map<string, { count: number, reset: number }>
  idem: Map<string, any>
}
const store: Store = { rates: new Map(), idem: new Map() }

const WF_LIMITS: Record<string, { windowMs:number, max:number }> = {
  business_plan: { windowMs: 60_000, max: 10 },
  finance_brief: { windowMs: 60_000, max: 10 }
}

function sanitizeObject(obj:any){
  const S = JSON.stringify(obj)
  if (S.length > 4000) throw new Error('Input too large')
  const bans = ['<script','</script','DROP TABLE','UNION SELECT']
  for (const b of bans){ if (S.toUpperCase().includes(b)) throw new Error('Invalid input') }
}

function rateKey(req: NextApiRequest){
  const xf = (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim()
  const ip = xf || (req.socket as any).remoteAddress || 'unknown'
  const wf = (req.body?.workflow || 'unknown')
  return ip+'::'+wf
}

function checkRateLimit(key:string, wf:string){
  const now = Date.now()
  const lim = WF_LIMITS[wf] || { windowMs: 60_000, max: 10 }
  const b = store.rates.get(key) || { count: 0, reset: now + lim.windowMs }
  if (now > b.reset){ b.count = 0; b.reset = now + lim.windowMs }
  b.count += 1; store.rates.set(key, b)
  if (b.count > lim.max) return false
  return true
}

function mockBusinessPlan(inputs:any){
  const { projet, cible, marche, lang='fr' } = inputs
  const title = lang==='fr' ? `Plan d’affaires — ${projet}` : `Business Plan — ${projet}`
  const content = [
    `# ${title}`,
    ``,
    `**Cible :** ${cible}`,
    `**Marché :** ${marche}`,
    ``,
    `## Proposition de valeur`,
    `- Différenciation claire sur le segment.`,
    `- Bénéfices mesurables pour ${cible}.`,
    ``,
    `## Go-to-market`,
    `- Canaux : SEO, partenariats, réseau.`,
    `- MVP : itérations rapides sous 60 jours.`,
    ``,
    `## Roadmap 90 jours`,
    `1. Semaine 1–2 : interviews clients + hypothèses.`,
    `2. Semaine 3–6 : MVP + tracking (Ét. 10, 15).`,
    `3. Semaine 7–12 : bêta fermée + pricing (Ét. 14).`
  ].join('\n')
  return { filename: 'plan_affaires.md', format: 'markdown', content }
}

function mockFinanceBrief(inputs:any){
  const { periode, objectif, lang='fr' } = inputs
  const title = lang==='fr' ? `Brief financier — ${periode}` : `Finance Brief — ${periode}`
  const content = [
    `# ${title}`,
    ``,
    `**Objectif :** ${objectif}`,
    ``,
    `## Indicateurs clés`,
    `- CA, MRR, churn, marge.`,
    `- Cash runway (6–12 mois).`,
    ``,
    `## Risques & Opportunités`,
    `- Risques : volatilité demande.`,
    `- Opportunités : upsell Pro/Pro+ (Ét. 14).`
  ].join('\n')
  return { filename: 'brief_finance.md', format: 'markdown', content }
}

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()

  const idem = (req.headers['x-idempotency-key'] as string || '').slice(0,64)
  if (idem && store.idem.has(idem)){ return res.status(200).json(store.idem.get(idem)) }

  try{
    const body = req.body || {}
    const wf = String(body.workflow||'')
    const inputs = body.inputs || {}
    sanitizeObject({ wf, inputs })

    // rate-limit
    const key = rateKey(req)
    if (!checkRateLimit(key, wf)) return res.status(429).json({ ok:false, error:'Too Many Requests' })

    // mock provider
    let output:any
    if (wf==='business_plan') output = mockBusinessPlan(inputs)
    else if (wf==='finance_brief') output = mockFinanceBrief(inputs)
    else return res.status(400).json({ ok:false, error:'Unknown workflow' })

    const resp = { ok:true, output, tokens_used: Math.round((JSON.stringify(inputs).length + output.content.length) / 4) }
    if (idem) store.idem.set(idem, resp)
    return res.status(200).json(resp)
  }catch(e:any){
    return res.status(400).json({ ok:false, error: e?.message || 'Invalid input' })
  }
}
