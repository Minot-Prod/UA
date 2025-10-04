import type { NextApiRequest, NextApiResponse } from 'next'
import { clearCookie } from './utils'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  clearCookie(res, 'parlios.session')
  res.setHeader('Set-Cookie', `parlios.role=; Path=/; Max-Age=0; SameSite=Lax; Secure`)
  res.status(200).json({ ok: true })
}
