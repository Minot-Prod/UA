
import React, { useState } from 'react'
import { useParliosIA } from '@hooks/useParliosIA'

export function ParliosChat() {
  const { status, messages, send, loading } = useParliosIA() // ollama par défaut
  const [input, setInput] = useState('')

  return (
    <div className="rounded-xl border border-zinc-800 p-3">
      <div className="text-xs text-zinc-400 mb-2">IA locale: {status}</div>
      <div className="space-y-2 max-h-64 overflow-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-emerald-300' : 'text-zinc-200'}>
            <b>{m.role === 'user' ? 'Vous' : 'IA'}</b>: {m.content}
          </div>
        ))}
      </div>
      <form className="mt-2 flex gap-2" onSubmit={async (e) => { e.preventDefault(); if (!input.trim()) return; await send(input.trim()); setInput('') }}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Demandez quelque chose…" className="flex-1 rounded-lg border bg-zinc-950 px-3 py-1.5"/>
        <button disabled={loading} className="rounded-lg bg-emerald-500 text-black px-3 py-1.5">{loading ? '…' : 'Envoyer'}</button>
      </form>
    </div>
  )
}
