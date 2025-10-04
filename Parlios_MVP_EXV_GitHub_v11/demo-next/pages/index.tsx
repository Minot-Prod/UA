import { useState } from 'react'
import ConsentBanner from '../components/ConsentBanner'
import PrivacyModal from '../components/PrivacyModal'
export default function Home(){
  const [open, setOpen] = useState(false);
  return (
    <main>
      <header style={{padding:'1rem', borderBottom:'1px solid #e5e7eb', background:'white', display:'flex', justifyContent:'space-between'}}>
        <strong>Parlios — Démo Consentements (Next.js)</strong>
        <a href="#" onClick={(e)=>{e.preventDefault(); setOpen(true)}}>Confidentialité</a>
      </header>
      <div style={{maxWidth: '64rem', margin:'1.5rem auto', padding:'0 1rem'}}>
        <p>Essaie la bannière : accepte, refuse, ou personnalise.</p>
      </div>
      <ConsentBanner/>
      <PrivacyModal open={open} onClose={()=>setOpen(false)}/>
    </main>
  )
}
