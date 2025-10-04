'use client';
import { useEffect } from 'react';
export function Modal({ open, onClose, title, children }: any){
  useEffect(()=>{
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') onClose?.(); }
    if(open) document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  },[open,onClose]);
  if(!open) return null;
  return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
    <div className="w-full max-w-lg rounded-2xl bg-[var(--bg)] text-[var(--text)] shadow p-4" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button aria-label="Fermer" onClick={onClose} className="p-2 rounded-lg hover:bg-black/5">✕</button>
      </div>
      {children}
    </div>
  </div>;
}