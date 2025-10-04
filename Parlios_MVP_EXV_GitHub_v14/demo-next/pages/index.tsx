import Link from 'next/link'
import FeatureGate from '../components/FeatureGate'
import { addCount, getCount } from '../lib/plans'
export default function Home(){
  function generateDeliverable(){
    const c = addCount('livrables_per_day', 1)
    alert('Livrable généré ! Compteur du jour: '+c)
  }
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Plans & Freemium</h1>
    <p>
      <Link href="/upgrade">Upgrade</Link> · <Link href="/lab">Lab (tests flags)</Link> · <Link href="/api/plan/me">/api/plan/me</Link>
    </p>
    <h2>Module Finance (gated)</h2>
    <FeatureGate flag="generator_finance">
      <button onClick={generateDeliverable}>Générer un livrable Finance</button>
      <p>Compteur livrables aujourd’hui: {getCount('livrables_per_day')}</p>
    </FeatureGate>
  </main>)
}
