import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const raw = req.headers.cookie || ''
  const map = Object.fromEntries(raw.split(';').map(v=>v.trim().split('=') as [string,string]).filter(a=>a[0]))
  const plan = (map['parlios.plan'] === 'pro' || map['parlios.plan'] === 'pro_plus') ? map['parlios.plan'] : 'free'
  res.setHeader('X-Parlios-Plan', plan)
  res.status(200).json({ plan })
}
