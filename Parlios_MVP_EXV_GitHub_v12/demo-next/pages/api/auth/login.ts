import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie, getCookie } from './utils'

const DEMO_EMAIL = 'demo@parlios.local'
const DEMO_PASSWORD = 'demo1234'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const csrfCookie = getCookie(req, 'parlios.csrf')
  const { email, password, csrf } = req.body || {}

  if (!csrf || !csrfCookie || csrfCookie !== csrf){
    return res.status(403).json({ error: 'Invalid CSRF' })
  }
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD){
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  // Issue a mock session token
  const token = 'sess_'+Math.random().toString(36).slice(2)
  setCookie(res, 'parlios.session', token, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 60*60*24*7 })
  return res.status(200).json({ ok: true })
}
