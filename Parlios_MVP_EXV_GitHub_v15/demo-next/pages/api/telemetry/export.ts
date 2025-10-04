import type { NextApiRequest, NextApiResponse } from 'next'
import { allRows } from './store'
export default function handler(req: NextApiRequest, res: NextApiResponse){
  res.setHeader('Content-Type','application/x-ndjson')
  const rows = allRows()
  const body = rows.map(r=>JSON.stringify(r)).join('\n')
  res.status(200).send(body)
}
