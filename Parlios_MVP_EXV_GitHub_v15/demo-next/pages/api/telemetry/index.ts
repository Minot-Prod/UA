import type { NextApiRequest, NextApiResponse } from 'next'
import { pushRow } from './store'

function maskIP(ip: string){
  const parts = ip.split('.')
  if(parts.length===4){ parts[3] = '0'; return parts.join('.') }
  return ip
}

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const xf = (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim()
  const plan = req.headers['x-parlios-plan'] as string | undefined
  const ip = xf || (req.socket as any).remoteAddress || ''
  const body = req.body || {}
  const sid = (body.sid || 'unknown') as string
  const events = Array.isArray(body.events)? body.events : []
  const basePath = (req.headers.referer as string || '').split('?')[0]

  for (const e of events){
    // strip query params from any path payload field
    let p = e?.payload || {}
    if (p?.path && typeof p.path === 'string'){ p = { ...p, path: p.path.split('?')[0] } }
    // remove known sensitive fields
    for (const k of ['password','token','authorization']) if (p && k in p) delete p[k]
    pushRow({ ts: new Date().toISOString(), sid, type: String(e?.type||'event'), payload: p, ip: maskIP(String(ip)), plan, path: basePath })
  }
  res.status(204).end()
}
