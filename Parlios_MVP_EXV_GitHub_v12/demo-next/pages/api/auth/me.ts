import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from './utils'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const sess = getCookie(req, 'parlios.session')
  if (!sess) return res.status(200).json({ authenticated: false })
  return res.status(200).json({ authenticated: true, user: { email: 'demo@parlios.local' } })
}
