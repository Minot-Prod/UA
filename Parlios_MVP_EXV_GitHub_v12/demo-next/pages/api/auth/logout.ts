import type { NextApiRequest, NextApiResponse } from 'next'
import { clearCookie } from './utils'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  clearCookie(res, 'parlios.session')
  res.status(200).json({ ok: true })
}
