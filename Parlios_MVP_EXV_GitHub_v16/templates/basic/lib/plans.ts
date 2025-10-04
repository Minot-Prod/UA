export type PlanId = 'free'|'pro'|'pro_plus';
export const PLAN_COOKIE = 'parlios.plan';
export const FLAGS = {
  generator_finance: { free:false, pro:true,  pro_plus:true },
  export_pdf_png:    { free:false, pro:true,  pro_plus:true }
} as const;
export function can(flag: keyof typeof FLAGS, plan: PlanId): boolean { return FLAGS[flag][plan]; }
export function getPlanFromCookie(): PlanId {
  const m = document.cookie.match(/(?:^|; )parlios\.plan=([^;]+)/); const v = m ? decodeURIComponent(m[1]) as PlanId : 'free';
  return (v==='pro'||v==='pro_plus')?v:'free';
}
