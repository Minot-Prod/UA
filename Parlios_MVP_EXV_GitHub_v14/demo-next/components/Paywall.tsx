import Link from 'next/link'
export default function Paywall(){
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
      <h3>Passe en Pro pour débloquer cette fonctionnalité</h3>
      <ul>
        <li>Jusqu’à 10 livrables/jour</li>
        <li>Exports PDF/PNG</li>
        <li>Accès aux générateurs avancés</li>
      </ul>
      <Link href="/upgrade">Découvrir les offres →</Link>
    </div>
  )
}
