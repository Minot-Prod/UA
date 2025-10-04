import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function Login(){
  const [csrf, setCsrf] = useState('')
  const [email, setEmail] = useState('demo@parlios.local')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')

  useEffect(()=>{ fetch('/api/auth/csrf').then(r=>r.json()).then(d=>setCsrf(d.csrf)) }, [])

  async function submit(e:any){
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password, csrf }) })
    if (res.ok){ Router.push('/audit') } else { const j=await res.json(); setError(j.error||'Erreur') }
  }

  return (<main style={{padding:'1rem', maxWidth:480, margin:'0 auto'}}>
    <h1>Connexion</h1>
    <form onSubmit={submit}>
      <div><label>Email<br/><input value={email} onChange={e=>setEmail(e.target.value)} required/></label></div>
      <div><label>Mot de passe<br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label></div>
      <input type="hidden" value={csrf} readOnly />
      <button type="submit">Se connecter</button>
    </form>
    {error && <p style={{color:'crimson'}}>{error}</p>}
  </main>)
}
