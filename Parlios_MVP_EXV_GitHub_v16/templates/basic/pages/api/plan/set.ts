export default function handler(req:any,res:any){
  const p = (req.query.plan as string)||'free'
  const plan = (p==='pro'||p==='pro_plus')?p:'free'
  res.setHeader('Set-Cookie', `parlios.plan=${plan}; Path=/; Max-Age=${60*60*24*30}; SameSite=Lax; Secure`)
  res.status(200).json({ ok:true, plan })
}
