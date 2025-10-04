import { ReactNode, useEffect, useState } from 'react'
import Paywall from './Paywall'
import { getPlanFromCookie, can, type PlanId } from '../lib/plans'

export default function FeatureGate({ flag, children }:{ flag: keyof typeof import('../lib/plans').FLAGS, children: ReactNode }){
  const [plan, setPlan] = useState<PlanId>('free')
  useEffect(()=>{ setPlan(getPlanFromCookie()) }, [])
  if (!can(flag, plan)) return <Paywall/>
  return <>{children}</>
}
