import { useState } from 'react';
import { useConsent } from '../hooks/useConsent';
export default function PrivacyModal({ open, onClose }: { open: boolean; onClose: ()=>void }){
  const { saveCustom, rejectAll } = useConsent();
  const [analytics, setAnalytics] = useState(false);
  const [ai, setAI] = useState(false);
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow max-w-lg w-full p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confidentialité & consentements</h2>
          <button onClick={onClose} className="text-sm underline">Fermer</button>
        </div>
        <p className="text-sm mt-2">Tu as le contrôle. Rien de non essentiel n’est activé sans ton accord.</p>
        <div className="mt-4 grid gap-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)} /> <span>Analytics (opt‑in)</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={ai} onChange={e=>setAI(e.target.checked)} /> <span>IA (opt‑in)</span></label>
          <label className="flex items-center gap-2"><input checked disabled type="checkbox" /> <span>Session (essentiel)</span></label>
          <label className="flex items-center gap-2"><input checked disabled type="checkbox" /> <span>Sécurité (essentiel)</span></label>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs">
            <a className="underline" href="/privacy" >Politique de confidentialité</a> ·
            <a className="underline" href="/legal" >Mentions légales</a>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>{rejectAll(); onClose();}} className="px-3 py-2 text-sm border rounded">Refuser tout</button>
            <button onClick={()=>{ saveCustom({ analytics, ai, session:true, security:true }); onClose(); }} className="px-3 py-2 text-sm bg-black text-white rounded">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  )
}
