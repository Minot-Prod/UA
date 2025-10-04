import type { NextApiRequest, NextApiResponse } from 'next'
import { audit } from './audit'
type Bucket = { count: number, reset: number }
const WINDOW = 60 * 1000 // 60s
const MAX = 60
const store = new Map<string, Bucket>()

function keyFrom(req: NextApiRequest){
  const xf = (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim()
  const ip = xf || (req.socket as any).remoteAddress || 'unknown'
  return ip
}

export function withRateLimit(handler:(req:NextApiRequest,res:NextApiResponse)=>void){
  return function(req: NextApiRequest, res: NextApiResponse){
    const key = keyFrom(req)
    const now = Date.now()
    const b = store.get(key) || { count: 0, reset: now + WINDOW }
    if (now > b.reset){ b.count = 0; b.reset = now + WINDOW }
    b.count += 1
    store.set(key, b)
    res.setHeader('X-RateLimit-Limit', String(MAX))
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, MAX - b.count)))
    res.setHeader('X-RateLimit-Reset', String(Math.floor(b.reset/1000)))
    if (b.count > MAX){
      audit(key, 'rate_limited', { path: req.url })
      res.status(429).json({ error: 'Too Many Requests' })
      return
    }
    return handler(req, res)
  }
}
