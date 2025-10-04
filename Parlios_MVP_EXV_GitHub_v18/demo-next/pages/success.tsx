import { useEffect } from 'react'

export default function Success(){
  useEffect(()=>{
    const url = new URL(location.href)
    const plan = (url.searchParams.get('plan') as 'pro'|'pro_plus') || 'pro'
    fetch('/api/plan/set?plan='+plan).then(()=>{
      // Redirect to home after activation
      setTimeout(()=>location.replace('/'), 800)
    })
  }, [])
  return (<main style={{padding:'1rem'}}>
    <h1>Paiement confirmé</h1>
    <p>Activation de ton plan en cours…</p>
  </main>)
}
