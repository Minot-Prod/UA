import { useEffect, useRef } from 'react'
import { hasAnalyticsConsent } from '../lib/consent'
export default function TelemetryMount(){
  const mounted = useRef(false)
  useEffect(()=>{
    if(mounted.current) return; mounted.current = true
    if(!hasAnalyticsConsent()) return
    window.addEventListener('click', ()=>{})
  }, [])
  return null
}
