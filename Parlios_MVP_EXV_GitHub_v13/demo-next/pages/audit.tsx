import { useEffect, useState } from 'react'
export default function Audit(){
  const [logs, setLogs] = useState<any[]>([])
  useEffect(()=>{
    fetch('/api/audit').then(r=>r.json()).then(setLogs)
  }, [])
  return (<main style={{padding:'1rem'}}>
    <h1>Audit (mémoire - démo)</h1>
    <pre style={{background:'#fff', border:'1px solid #eee', padding:'1rem', overflow:'auto'}}>{JSON.stringify(logs, null, 2)}</pre>
    <form method="post" action="/api/auth/logout"><button>Se déconnecter</button></form>
  </main>)
}
