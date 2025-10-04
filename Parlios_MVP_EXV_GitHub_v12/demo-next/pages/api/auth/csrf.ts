import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie, randomToken } from './utils'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const token = randomToken(32)
  // Double-submit: cookie accessible JS (non HttpOnly)
  res.setHeader('Set-Cookie', `parlios.csrf=${token}; Path=/; Max-Age=${60*30}; SameSite=Lax; Secure`)
  res.status(200).json({ csrf: token })
}
