export default function handler(_req:any,res:any){ res.status(200).json({ ok:true, rc: 'v20_RC1', ts: new Date().toISOString() }) }
