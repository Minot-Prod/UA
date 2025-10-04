import type { NextApiRequest, NextApiResponse } from 'next'
import { randomToken } from './utils'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const token = randomToken(32)
  res.setHeader('Set-Cookie', `parlios.csrf=${token}; Path=/; Max-Age=${60*30}; SameSite=Lax; Secure`)
  res.status(200).json({ csrf: token })
}
