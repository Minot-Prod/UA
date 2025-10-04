import { useState } from 'react'

async function startCheckout(plan:'pro'|'pro_plus'){
  const r = await fetch('/api/stripe/checkout?plan='+plan)
  const j = await r.json()
  if (j.url) location.href = j.url
}

export default function Billing(){
  const [loading, setLoading] = useState<string>('')
  return (<main style={{padding:'1rem'}}>
    <h1>Facturation</h1>
    <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
      <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
        <h3>Pro</h3><p>19 CAD / mois</p>
        <button disabled={loading==='pro'} onClick={()=>{ setLoading('pro'); startCheckout('pro') }}>Passer en Pro →</button>
      </div>
      <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
        <h3>Pro+</h3><p>49 CAD / mois</p>
        <button disabled={loading==='pro_plus'} onClick={()=>{ setLoading('pro_plus'); startCheckout('pro_plus') }}>Passer en Pro+ →</button>
      </div>
    </div>
    <p style={{marginTop:12}}>Mode test : sans clé Stripe, un **mock** simule la redirection et active le plan à /success.</p>
  </main>)
}
