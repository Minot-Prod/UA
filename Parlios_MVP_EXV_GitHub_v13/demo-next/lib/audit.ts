type Event = { ts: string, type: string, ip: string, meta?: any }
const logs: Event[] = []
export function audit(ip: string, type: string, meta?: any){
  logs.push({ ts: new Date().toISOString(), type, ip, meta })
  if (logs.length > 500) logs.shift()
}
export function getAudit(){ return logs }
