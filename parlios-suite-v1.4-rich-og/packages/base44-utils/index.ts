
export function appendLog(lines: string[], event: string, context: Record<string, any> = {}) {
  const iso = new Date().toISOString();
  const ctx = Object.entries(context).map(([k,v]) => `${k}=${JSON.stringify(v)}`).join(' ');
  lines.push(`[${iso}] ${event}${ctx ? ' ' + ctx : ''}`);
  return lines;
}
export function generateCreditLine(event: string, ctx: Record<string, any> = {}) {
  const iso = new Date().toISOString();
  const ctxStr = Object.entries(ctx).map(([k,v]) => `${k}=${JSON.stringify(v)}`).join(' ');
  return `[${iso}] ${event}${ctxStr ? ' ' + ctxStr : ''}`;
}
export async function dispatchArtifact(type: 'md'|'png'|'json', payload: string|Uint8Array) {
  return { ok: true, type, size: typeof payload === 'string' ? payload.length : payload.byteLength };
}
export async function pushToNotion(pageId: string, content: string) {
  return { ok: true, pageId, size: content.length };
}
