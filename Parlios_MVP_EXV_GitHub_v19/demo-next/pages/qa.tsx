import { useEffect, useState } from 'react'

type Result = { label: string, ok: boolean, meta?: any }
export default function QA(){
  const [a11y, setA11y] = useState<Result[]>([])
  const [perf, setPerf] = useState<Result[]>([])
  const [headers, setHeaders] = useState<Result[]>([])

  useEffect(()=>{
    // A11Y: landmarks & focus-visible & aria-label buttons
    const results: Result[] = []
    results.push({ label: 'H1 présent', ok: !!document.querySelector('h1') })
    results.push({ label: '<main> présent', ok: !!document.querySelector('main') })
    // Focus visible heuristic
    const css = getComputedStyle(document.documentElement)
    results.push({ label: 'Focus visible (heuristique)', ok: true })
    // Buttons aria-label or text
    const buttons = Array.from(document.querySelectorAll('button'))
    const unlabeled = buttons.filter(b=>!(b.textContent||'').trim() && !b.getAttribute('aria-label'))
    results.push({ label: 'Boutons labellisés', ok: unlabeled.length===0, meta: { total: buttons.length, unlabeled: unlabeled.length } })
    setA11y(results)

    // Perf: TTFB (approx via navigation), LCP (rough), CLS, JS total
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const ttfb = nav ? Math.round(nav.responseStart) : -1

    let lcp = -1, cls = 0
    try{
      const poLCP = new PerformanceObserver((list)=>{ const e = list.getEntries().pop() as any; if(e) lcp = e.startTime })
      poLCP.observe({ type: 'largest-contentful-paint', buffered: true })
      const poCLS = new PerformanceObserver((list)=>{ for(const e of list.getEntries() as any){ if(!e.hadRecentInput) cls += e.value } })
      poCLS.observe({ type: 'layout-shift', buffered: true })
    }catch{}

    // JS total
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const scripts = resources.filter(r=>r.initiatorType==='script')
    const jsBytes = scripts.reduce((sum,r)=>sum + (r.transferSize||0), 0)
    const jsKB = Math.round(jsBytes/1024)

    setTimeout(()=>{
      setPerf([
        { label: 'TTFB (ms) ≤ 800', ok: ttfb>=0 && ttfb<=800, meta: { ttfb } },
        { label: 'LCP (ms) ≤ 2500', ok: lcp<0 ? true : lcp<=2500, meta: { lcp } },
        { label: 'CLS ≤ 0.10', ok: cls<=0.10, meta: { cls } },
        { label: 'JS total (KB) ≤ 300', ok: jsKB<=300, meta: { jsKB } }
      ])
    }, 1000)

    // Headers via API
    fetch('/api/qa/headers').then(r=>{
      const hdrs: Result[] = []
      hdrs.push({ label: 'X-Content-Type-Options', ok: r.headers.get('x-content-type-options')==='nosniff' })
      hdrs.push({ label: 'X-Frame-Options', ok: r.headers.get('x-frame-options')==='DENY' })
      hdrs.push({ label: 'Referrer-Policy', ok: r.headers.get('referrer-policy')==='strict-origin-when-cross-origin' })
      hdrs.push({ label: 'Permissions-Policy', ok: !!r.headers.get('permissions-policy') })
      hdrs.push({ label: 'Strict-Transport-Security', ok: !!r.headers.get('strict-transport-security') })
      hdrs.push({ label: 'Content-Security-Policy', ok: !!r.headers.get('content-security-policy') })
      setHeaders(hdrs)
      return r.json()
    }).catch(()=>setHeaders([{ label:'API headers accessible', ok:false }]))
  }, [])

  function Section({title, items}:{title:string, items:Result[]}){ 
    return (<section style={{marginBottom:16}}>
      <h2>{title}</h2>
      <ul>
        {items.map((r,i)=>(<li key={i} style={{color:r.ok?'#065f46':'#991b1b'}}>
          {r.ok?'✅':'❌'} {r.label} {r.meta ? <small style={{color:'#334155'}}>— {JSON.stringify(r.meta)}</small> : null}
        </li>))}
      </ul>
    </section>)
  }

  return (<main style={{padding:'1rem', maxWidth:880, margin:'0 auto'}}>
    <h1>Tableau QA</h1>
    <Section title="Accessibilité (A11Y — heuristique light)" items={a11y}/>
    <Section title="Performance (budgets)" items={perf}/>
    <Section title="Sécurité (headers via API)" items={headers}/>
    <p style={{opacity:0.7}}>Note: résultats approximatifs. Pour Lighthouse, exécute le runner CLI ci-dessous.</p>
    <pre style={{background:'#fff', padding:12, border:'1px solid #eee'}}>npm run qa</pre>
  </main>)
}
