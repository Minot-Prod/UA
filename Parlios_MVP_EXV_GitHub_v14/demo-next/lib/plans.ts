export type PlanId = 'free'|'pro'|'pro_plus';
export const PLAN_COOKIE = 'parlios.plan';
export const FLAGS = {
  generator_finance: { free:false, pro:true,  pro_plus:true },
  generator_business:{ free:false, pro:true,  pro_plus:true },
  export_pdf_png:    { free:false, pro:true,  pro_plus:true },
  ai_high_tokens:    { free:false, pro:false, pro_plus:true },
  team_sharing:      { free:false, pro:false, pro_plus:true }
} as const;

export function can(flag: keyof typeof FLAGS, plan: PlanId): boolean {
  return FLAGS[flag][plan];
}

export function getPlanFromCookie(): PlanId {
  const m = document.cookie.match(/(?:^|; )parlios\.plan=([^;]+)/);
  const v = m ? decodeURIComponent(m[1]) as PlanId : 'free';
  return (v==='pro' || v==='pro_plus') ? v : 'free';
}

export function setPlanCookie(plan: PlanId){
  document.cookie = `${PLAN_COOKIE}=${plan}; Path=/; SameSite=Lax; Secure; Max-Age=${60*60*24*30}`;
}

// Simple metering (front-only, MVP)
const KPREFIX = 'parlios.meter.';
export function addCount(key: 'livrables_per_day'|'ai_tokens_per_day', amount=1){
  const today = new Date().toISOString().slice(0,10);
  const k = KPREFIX+key+'.'+today;
  const cur = Number(localStorage.getItem(k)||'0');
  localStorage.setItem(k, String(cur+amount));
  return cur+amount;
}
export function getCount(key: 'livrables_per_day'|'ai_tokens_per_day'){
  const today = new Date().toISOString().slice(0,10);
  const k = KPREFIX+key+'.'+today;
  return Number(localStorage.getItem(k)||'0');
}
