import Link from 'next/link'
export default function Home(){
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Démo Auth</h1>
    <p><Link href="/login">Se connecter</Link> · <Link href="/dashboard">Dashboard</Link></p>
  </main>)
}
