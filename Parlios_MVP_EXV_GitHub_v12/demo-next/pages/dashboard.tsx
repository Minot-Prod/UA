import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function Dashboard(){
  const [auth, setAuth] = useState<{authenticated:boolean,user?:any}|null>(null)
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(d=>{
      setAuth(d)
      if (!d.authenticated) Router.replace('/login')
    })
  }, [])

  if (!auth) return <main style={{padding:'1rem'}}>Chargement…</main>
  if (!auth.authenticated) return null
  return (
    <main style={{padding:'1rem'}}>
      <h1>Dashboard</h1>
      <p>Bienvenue, {auth.user?.email}</p>
      <form method="post" action="/api/auth/logout"><button>Se déconnecter</button></form>
    </main>
  )
}
