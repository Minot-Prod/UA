import Link from 'next/link'
export default function Upgrade(){
  return (<main style={{padding:'1rem'}}>
    <h1>Choisis ton plan</h1>
    <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
      <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
        <h3>Free</h3><p>0$/mois</p><ul><li>1 livrable/jour</li><li>Basique</li></ul>
        <Link href="/lab">Rester en Free</Link>
      </div>
      <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
        <h3>Pro</h3><p>19$/mois</p><ul><li>10 livrables/jour</li><li>Exports PDF/PNG</li></ul>
        <a href="/api/plan/set?plan=pro">Passer en Pro →</a>
      </div>
      <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
        <h3>Pro+</h3><p>49$/mois</p><ul><li>100 livrables/jour</li><li>Team sharing</li></ul>
        <a href="/api/plan/set?plan=pro_plus">Passer en Pro+ →</a>
      </div>
    </div>
  </main>)
}
