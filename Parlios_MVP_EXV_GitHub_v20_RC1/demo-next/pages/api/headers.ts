export default function handler(_req:any,res:any){
  res.setHeader('X-Content-Type-Options','nosniff')
  res.setHeader('X-Frame-Options','DENY')
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=(self)')
  res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload')
  res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';")
  res.status(200).json({ ok:true })
}
