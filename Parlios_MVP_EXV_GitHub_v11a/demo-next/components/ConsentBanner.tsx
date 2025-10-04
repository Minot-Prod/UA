import { useState, useEffect } from 'react'
import { useConsent } from '../hooks/useConsent'
export default function ConsentBanner(){
  const { consent, acceptAll, rejectAll } = useConsent();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{ setOpen(!consent) },[consent]);
  if(!open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow">
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm md:max-w-[70%]">Parlios utilise uniquement ce qui est nécessaire. Active les options “Analytics” et “IA” si tu es d’accord (opt‑in). Tu peux refuser tout.</p>
        <div className="flex gap-2">
          <button onClick={()=>{rejectAll(); setOpen(false)}} className="px-3 py-2 text-sm border rounded">Refuser tout</button>
          <button onClick={()=>setShowModal(true)} className="px-3 py-2 text-sm border rounded">Personnaliser</button>
          <button onClick={()=>{acceptAll(); setOpen(false)}} className="px-3 py-2 text-sm bg-black text-white rounded">Accepter tout</button>
        </div>
      </div>
    </div>
  )
}
