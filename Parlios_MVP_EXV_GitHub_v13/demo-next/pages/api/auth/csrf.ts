import type { NextApiRequest, NextApiResponse } from 'next'
import { withCORS } from '../../../lib/cors'
export default withCORS(function handler(req: NextApiRequest, res: NextApiResponse){
  const token = Math.random().toString(36).slice(2)
  res.setHeader('Set-Cookie', `parlios.csrf=${token}; Path=/; Max-Age=${60*30}; SameSite=Lax; Secure`)
  res.status(200).json({ csrf: token })
})
