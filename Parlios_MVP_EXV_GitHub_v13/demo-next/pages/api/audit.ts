import type { NextApiRequest, NextApiResponse } from 'next'
import { withCORS } from '../../lib/cors'
import { withRateLimit } from '../../lib/ratelimit'
import { getAudit } from '../../lib/audit'
export default withCORS(withRateLimit(function handler(req: NextApiRequest, res: NextApiResponse){
  res.status(200).json(getAudit())
}))
