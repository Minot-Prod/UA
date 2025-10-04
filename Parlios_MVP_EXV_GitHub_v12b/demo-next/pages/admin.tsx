import { useEffect, useState } from 'react'
import Router from 'next/router'
export default function Admin(){
  const [auth, setAuth] = useState<any>(null)
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(d=>{
      setAuth(d)
      if (!d.authenticated || d.role!=='admin') Router.replace('/login')
    })
  }, [])
  if (!auth) return <main style={{padding:'1rem'}}>Chargement…</main>
  if (!auth.authenticated || auth.role!=='admin') return null
  return (<main style={{padding:'1rem'}}>
    <h1>Zone Admin</h1>
    <p>Accès réservé aux administrateurs.</p>
    <form method="post" action="/api/auth/logout"><button>Se déconnecter</button></form>
  </main>)
}
