import { useEffect, useRef } from 'react'
import { hasAnalyticsConsent } from '../lib/consent'

type Event = { t: number, type: string, payload?: any }
const BUF_MAX = 20
const FLUSH_MS = 3000

function sid(): string {
  const k = 'parlios.sid'
  let v = localStorage.getItem(k)
  if(!v){ v = Math.random().toString(36).slice(2); localStorage.setItem(k, v) }
  return v
}

export function useTelemetry(){
  const buffer = useRef<Event[]>([])
  const allow = useRef<boolean>(false)

  useEffect(()=>{
    allow.current = hasAnalyticsConsent()
    if(!allow.current) return

    const ses = sid()

    function push(e: Event){
      buffer.current.push(e)
      if(buffer.current.length >= BUF_MAX) flush()
    }

    function flush(){
      if(!buffer.current.length) return
      const toSend = buffer.current.slice()
      buffer.current = []
      navigator.sendBeacon?.('/api/telemetry', JSON.stringify({ sid: ses, events: toSend })) ||
        fetch('/api/telemetry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ sid: ses, events: toSend }) })
    }

    // pageview initial
    push({ t: Date.now(), type: 'pageview', payload: { path: location.pathname }})

    // clicks
    const onClick = (e: MouseEvent)=>{
      const target = (e.target as HTMLElement)
      const tag = target?.tagName?.toLowerCase()
      const text = (target?.textContent||'').trim().slice(0,80)
      push({ t: Date.now(), type: 'click', payload: { tag, text } })
    }
    addEventListener('click', onClick, { capture: true })

    // errors
    const onErr = (e: ErrorEvent)=>{
      push({ t: Date.now(), type: 'error', payload: { msg: e.message, src: e.filename, line: e.lineno, col: e.colno }})
    }
    addEventListener('error', onErr)

    // web vitals (LCP/FID/CLS)
    try {
      // LCP
      const poLCP = new PerformanceObserver((list)=>{
        const entry = list.getEntries().pop() as any
        if(entry) push({ t: Date.now(), type: 'web_vital', payload: { name: 'LCP', value: entry.startTime }})
      })
      poLCP.observe({type: 'largest-contentful-paint', buffered: true})

      // CLS
      let clsValue = 0
      const poCLS = new PerformanceObserver((list)=>{
        for (const entry of list.getEntries() as any) if (!entry.hadRecentInput) clsValue += entry.value
        push({ t: Date.now(), type: 'web_vital', payload: { name: 'CLS', value: clsValue }})
      })
      poCLS.observe({type: 'layout-shift', buffered: true})

      // FID (fallback to first input)
      const poFID = new PerformanceObserver((list)=>{
        const entry = list.getEntries()[0] as any
        if(entry) push({ t: Date.now(), type: 'web_vital', payload: { name: 'FID', value: entry.processingStart - entry.startTime }})
      })
      poFID.observe({type: 'first-input', buffered: true})
    } catch {}

    const iv = setInterval(flush, FLUSH_MS)
    return ()=>{
      clearInterval(iv)
      removeEventListener('click', onClick, { capture: true } as any)
      removeEventListener('error', onErr)
      flush()
    }
  }, [])

  return null
}
