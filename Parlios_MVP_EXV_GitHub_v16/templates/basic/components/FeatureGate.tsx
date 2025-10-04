import { ReactNode, useEffect, useState } from 'react'
import { getPlanFromCookie, can, type PlanId } from '../lib/plans'
export default function FeatureGate({ flag, children }:{ flag: keyof typeof import('../lib/plans').FLAGS, children: ReactNode }){
  const [plan, setPlan] = useState<PlanId>('free')
  useEffect(()=>{ setPlan(getPlanFromCookie()) }, [])
  if (!can(flag, plan)) return <div style={{border:'1px solid #e5e7eb', padding:16, borderRadius:12}}><h3>Passe en Pro pour débloquer</h3><a href="/upgrade">Découvrir les offres →</a></div>
  return <>{children}</>
}
