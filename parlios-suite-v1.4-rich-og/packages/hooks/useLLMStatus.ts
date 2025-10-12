
import { useEffect, useState } from 'react'

export function useLLMStatus(host = 'http://127.0.0.1:11434') {
  const [status, setStatus] = useState<'ready'|'absent'|'error'>('absent')
  useEffect(() => {
    let cancelled = false
    fetch(host, { method: 'GET' })
      .then(() => !cancelled && setStatus('ready'))
      .catch(() => !cancelled && setStatus('absent'))
    return () => { cancelled = true }
  }, [host])
  return status
}
