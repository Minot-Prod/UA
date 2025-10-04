import type { NextApiRequest, NextApiResponse } from 'next'
import { withCORS } from '../../../lib/cors'
import { withRateLimit } from '../../../lib/ratelimit'
import { getCookie } from './utils'
import { audit } from '../../../lib/audit'

export default withCORS(withRateLimit(function handler(req: NextApiRequest, res: NextApiResponse){
  const ip = (req.headers['x-forwarded-for'] as string || '').split(',')[0] || 'unknown'
  const sess = getCookie(req, 'parlios.session')
  if (!sess){ audit(ip, 'me', { authenticated: false }); return res.status(200).json({ authenticated: false }) }
  audit(ip, 'me', { authenticated: true })
  return res.status(200).json({ authenticated: true, user: { email: 'demo@parlios.local' } })
}))
