import Link from 'next/link'
export default function Home(){
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Sécurité backend (démo)</h1>
    <p><Link href="/login">Se connecter</Link> · <Link href="/audit">Voir audit (mémoire)</Link></p>
  </main>)
}
