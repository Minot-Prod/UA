import { useState, useEffect } from 'react'
import { useConsent } from '../hooks/useConsent'
export default function ConsentBanner(){
  const { consent, acceptAll, rejectAll } = useConsent();
  const [open, setOpen] = useState(false);
  useEffect(()=>{ setOpen(!consent) },[consent]);
  if(!open) return null;
  return (
    <div style={{position:'fixed', insetInline:0, bottom:0, background:'#fff', borderTop:'1px solid #e5e7eb', padding:16}}>
      <p>Parlios utilise uniquement ce qui est nécessaire. Active “Analytics” et “IA” si tu es d’accord (opt-in). Tu peux refuser tout.</p>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <button onClick={()=>{rejectAll(); setOpen(false)}}>Refuser tout</button>
        <button onClick={()=>alert('Ouvre ta PrivacyModal ici')}>Personnaliser</button>
        <button onClick={()=>{acceptAll(); setOpen(false)}}>Accepter tout</button>
      </div>
    </div>
  )
}
