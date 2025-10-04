import type { NextApiRequest, NextApiResponse } from 'next'
const ALLOW_ORIGIN = ['http://localhost:3000','https://parlios.ca']
const ALLOW_METHODS = ['GET','POST','PUT','DELETE','OPTIONS']
const ALLOW_HEADERS = ['Content-Type','x-csrf-token']
const ALLOW_CREDENTIALS = true
const MAX_AGE = 600

export function withCORS(handler: (req: NextApiRequest, res: NextApiResponse)=>void){
  return function(req: NextApiRequest, res: NextApiResponse){
    const origin = req.headers.origin || ''
    if (origin && ALLOW_ORIGIN.includes(origin)){
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Vary','Origin')
    res.setHeader('Access-Control-Allow-Methods', ALLOW_METHODS.join(','))
    res.setHeader('Access-Control-Allow-Headers', ALLOW_HEADERS.join(','))
    res.setHeader('Access-Control-Allow-Credentials', String(ALLOW_CREDENTIALS))
    res.setHeader('Access-Control-Max-Age', String(MAX_AGE))
    if (req.method === 'OPTIONS'){ res.status(204).end(); return }
    return handler(req, res)
  }
}
