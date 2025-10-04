type Row = { ts: string, sid: string, type: string, payload?: any, ip?: string, plan?: string, path?: string }
const store: Row[] = []
export function pushRow(r: Row){ store.push(r); if(store.length>2000) store.shift() }
export function allRows(){ return store }
