
import cfg from '@ia/model.config.json' assert { type: 'json' }

import { useState } from 'react'
import { useLLMStatus } from './useLLMStatus'

type Msg = { role: 'system'|'user'|'assistant'; content: string }
type Mode = 'ollama'|'lmstudio'|'mock'

/**
 * Hook IA local-first
 * - Si serveur local détecté (Ollama/LM Studio), appelle l'API correspondante
 * - Sinon, renvoie une réponse mock
 */
export function useParliosIA(mode: Mode = (cfg.default.mode as Mode), host = (cfg.default.host as string), model: string = (cfg.default.model as string)) {
  const status = useLLMStatus(host)
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(false)

  async function send(content: string) {
    setMessages(m => [...m, { role:'user', content }])
    setLoading(true)
    try {
      if (status !== 'ready' || mode === 'mock') {
        await new Promise(r => setTimeout(r, 250))
        const mock = `Réponse locale (mock) → ${content.slice(0,120)}…`
        setMessages(m => [...m, { role:'assistant', content: mock }])
        return mock
      }
      if (mode === 'ollama') {
        // Exemple d'appel Ollama /api/generate (prompt simple)
        const res = await fetch(`${host}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt: content, stream: false })
        })
        const data = await res.json().catch(()=>({ response: 'Erreur parse JSON' }))
        const out = data.response || JSON.stringify(data)
        setMessages(m => [...m, { role:'assistant', content: out }])
        return out
      }
      // LM Studio (OpenAI-like /v1/chat/completions)
      const res = await fetch(`${host}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role:'user', content }]
        })
      })
      const data = await res.json().catch(()=>({ choices:[{message:{content:'Erreur parse JSON'}}]}))
      const out = data.choices?.[0]?.message?.content ?? JSON.stringify(data)
      setMessages(m => [...m, { role:'assistant', content: out }])
      return out
    } catch (e:any) {
      const msg = `Erreur IA locale: ${e?.message || e}`
      setMessages(m => [...m, { role:'assistant', content: msg }])
      return msg
    } finally {
      setLoading(false)
    }
  }

  return { status, messages, send, loading }
}
