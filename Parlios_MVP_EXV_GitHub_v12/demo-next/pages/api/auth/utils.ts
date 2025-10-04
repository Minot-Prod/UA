import type { NextApiResponse, NextApiRequest } from 'next'

export function setCookie(res: NextApiResponse, name: string, value: string, opts: { maxAge?: number, httpOnly?: boolean, secure?: boolean, sameSite?: 'Lax'|'Strict'|'None', path?: string } = {}){
  const parts = [`${name}=${value}`, `Path=${opts.path ?? '/'}`, `SameSite=${opts.sameSite ?? 'Lax'}`]
  if (opts.httpOnly !== false) parts.push('HttpOnly')
  if (opts.secure !== false) parts.push('Secure')
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`)
  res.setHeader('Set-Cookie', parts.join('; '))
}

export function clearCookie(res: NextApiResponse, name: string){
  res.setHeader('Set-Cookie', `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`)
}

export function getCookie(req: NextApiRequest, name: string): string | null {
  const raw = req.headers.cookie || ''
  const map = Object.fromEntries(raw.split(';').map(v=>v.trim().split('=') as [string,string]).filter(a=>a[0]))
  return map[name] ?? null
}

export function randomToken(len=32){
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let out=''; for(let i=0;i<len;i++){ out+=alphabet[Math.floor(Math.random()*alphabet.length)] }
  return out
}
