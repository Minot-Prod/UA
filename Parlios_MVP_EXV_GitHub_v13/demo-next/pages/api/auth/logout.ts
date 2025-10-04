import type { NextApiRequest, NextApiResponse } from 'next'
import { withCORS } from '../../../lib/cors'
import { withRateLimit } from '../../../lib/ratelimit'
import { clearCookie } from './utils'
import { audit } from '../../../lib/audit'

export default withCORS(withRateLimit(function handler(req: NextApiRequest, res: NextApiResponse){
  const ip = (req.headers['x-forwarded-for'] as string || '').split(',')[0] || 'unknown'
  clearCookie(res, 'parlios.session')
  audit(ip, 'logout')
  res.status(200).json({ ok: true })
}))
