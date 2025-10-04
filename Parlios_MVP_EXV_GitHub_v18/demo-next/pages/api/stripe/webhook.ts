import type { NextApiRequest, NextApiResponse } from 'next'

export const config = { api: { bodyParser: false } }

function buffer(req: any): Promise<Buffer>{
  return new Promise((resolve, reject)=>{
    const chunks: Buffer[] = []
    req.on('data', (d: Buffer)=>chunks.push(d))
    req.on('end', ()=>resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const key = process.env.STRIPE_SECRET_KEY
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  const isStripe = !!key && !!whSecret
  const buf = await buffer(req as any)

  if (!isStripe){
    // Mock: just acknowledge
    return res.status(200).json({ ok:true, mode:'mock' })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(key!, { apiVersion: '2024-06-20' })
  const sig = req.headers['stripe-signature'] as string
  try{
    const event = stripe.webhooks.constructEvent(buf, sig, whSecret!)
    if (event.type === 'checkout.session.completed'){
      // In MVP we don't persist; logging only
      console.log('[stripe] checkout.session.completed', event.data.object['id'])
    }
    res.json({ received: true })
  }catch(e:any){
    res.status(400).send(`Webhook Error: ${e?.message}`)
  }
}
