import Link from 'next/link'
import FeatureGate from '../components/FeatureGate'
export default function Home(){
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Template Basic</h1>
    <p><Link href="/upgrade">Upgrade</Link></p>
    <h2>Module Finance (gated)</h2>
    <FeatureGate flag="generator_finance">
      <button onClick={()=>alert('Livrable généré')}>Générer</button>
    </FeatureGate>
  </main>)
}
