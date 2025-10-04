import Link from 'next/link'

function readCookie(name:string){
  const m = document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]+)'))
  return m ? decodeURIComponent(m[1]) : null
}

export default function Home(){
  const plan = typeof document !== 'undefined' ? (readCookie('parlios.plan') || 'free') : 'free'
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Billing (demo)</h1>
    <p>Plan actuel (cookie): <strong>{plan}</strong></p>
    <p><Link href="/billing">Aller à la facturation →</Link></p>
  </main>)
}
