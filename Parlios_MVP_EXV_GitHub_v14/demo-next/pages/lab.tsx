import { useEffect, useState } from 'react'
import { getPlanFromCookie } from '../lib/plans'
export default function Lab(){
  const [plan, setPlan] = useState('free')
  useEffect(()=>{ setPlan(getPlanFromCookie()) }, [])
  async function setPlan(p:'free'|'pro'|'pro_plus'){
    await fetch('/api/plan/set?plan='+p)
    location.reload()
  }
  return (<main style={{padding:'1rem'}}>
    <h1>Lab — changer de plan</h1>
    <p>Plan courant: <strong>{plan}</strong></p>
    <div style={{display:'flex', gap:8}}>
      <button onClick={()=>setPlan('free')}>Set Free</button>
      <button onClick={()=>setPlan('pro')}>Set Pro</button>
      <button onClick={()=>setPlan('pro_plus')}>Set Pro+</button>
    </div>
  </main>)
}
