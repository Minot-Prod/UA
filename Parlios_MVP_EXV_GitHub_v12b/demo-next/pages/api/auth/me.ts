import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from './utils'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const sess = getCookie(req, 'parlios.session')
  const role = getCookie(req, 'parlios.role') || 'guest'
  if (!sess) return res.status(200).json({ authenticated: false, role })
  return res.status(200).json({ authenticated: true, role, user: { email: 'demo@parlios.local' } })
}
