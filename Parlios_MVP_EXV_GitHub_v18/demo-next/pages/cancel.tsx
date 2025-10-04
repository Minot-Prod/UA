import Link from 'next/link'
export default function Cancel(){
  return (<main style={{padding:'1rem'}}>
    <h1>Paiement annulé</h1>
    <p><Link href="/billing">Revenir à la facturation</Link></p>
  </main>)
}
