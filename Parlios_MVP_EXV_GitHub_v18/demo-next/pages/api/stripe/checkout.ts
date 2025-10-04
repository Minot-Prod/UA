import type { NextApiRequest, NextApiResponse } from 'next'
const successURL = 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
const cancelURL = 'http://localhost:3000/cancel'
const PRICE_IDS: Record<string,string> = {
  pro: 'price_pro_month_placeholder',
  pro_plus: 'price_pro_plus_month_placeholder'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const plan = (req.query.plan as string)||'pro'
  const price = PRICE_IDS[plan] || PRICE_IDS.pro
  const key = process.env.STRIPE_SECRET_KEY
  const isStripe = !!key

  if (!isStripe){
    // MOCK: simulate a session redirect
    const mockSessionId = 'cs_test_mock_'+Math.random().toString(36).slice(2)
    res.status(200).json({ mode:'mock', url: successURL.replace('{CHECKOUT_SESSION_ID}', mockSessionId)+'&plan='+plan })
    return
  }
  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(key!, { apiVersion: '2024-06-20' })
  try{
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: successURL,
      cancel_url: cancelURL
    })
    res.status(200).json({ mode:'stripe', url: session.url })
  }catch(e:any){
    res.status(500).json({ error: e?.message || 'Stripe error' })
  }
}
