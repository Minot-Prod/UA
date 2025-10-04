import type { NextApiRequest, NextApiResponse } from 'next'
import { withCORS } from '../../../lib/cors'
import { withRateLimit } from '../../../lib/ratelimit'
import { setCookie, getCookie } from './utils'
import { audit } from '../../../lib/audit'

const DEMO_EMAIL = 'demo@parlios.local'
const DEMO_PASSWORD = 'demo1234'

export default withCORS(withRateLimit(function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const ip = (req.headers['x-forwarded-for'] as string || '').split(',')[0] || 'unknown'
  try{
    const csrfCookie = getCookie(req, 'parlios.csrf')
    const { email, password, csrf } = req.body || {}
    if (!csrf || !csrfCookie || csrfCookie !== csrf) return res.status(403).json({ error: 'Invalid CSRF' })
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) return res.status(401).json({ error: 'Invalid credentials' })
    const token = 'sess_'+Math.random().toString(36).slice(2)
    setCookie(res, 'parlios.session', token, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 60*60*24*7 })
    audit(ip, 'login', { email })
    return res.status(200).json({ ok: true })
  }catch(e:any){
    audit(ip, 'error', { where: 'login', message: e?.message })
    return res.status(500).json({ error: 'Server error' })
  }
}))
