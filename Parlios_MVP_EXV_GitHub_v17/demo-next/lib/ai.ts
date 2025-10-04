export type WorkflowId = 'business_plan'|'finance_brief';
export type GenerateParams = { workflow: WorkflowId, inputs: Record<string, any>, stream?: boolean };
export type GenerateResult = { ok: boolean; output?: { filename:string, format:'markdown', content:string }, tokens_used?: number, error?: string };

function sleep(ms:number){ return new Promise(r=>setTimeout(r, ms)) }
function makeIdemKey(){ return 'idem_'+Math.random().toString(36).slice(2) }

export async function generate(params: GenerateParams, opts?: { timeoutMs?: number, retries?: number, backoffMs?: number, factor?: number, signal?: AbortSignal }){
  const timeoutMs = opts?.timeoutMs ?? 20000;
  const retries = opts?.retries ?? 2;
  const backoffMs = opts?.backoffMs ?? 500;
  const factor = opts?.factor ?? 2;

  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), timeoutMs);
  const mergedSignal = opts?.signal ?? controller.signal;

  let attempt = 0, delay = backoffMs;
  let lastError:any = null;
  const idem = makeIdemKey();

  while (attempt <= retries){
    try{
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'X-Idempotency-Key': idem },
        body: JSON.stringify(params),
        signal: mergedSignal
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP '+res.status);
      const data = await res.json() as GenerateResult;
      return data;
    }catch(e:any){
      lastError = e;
      if (attempt === retries) break;
      await sleep(delay); delay *= factor; attempt++;
    }
  }
  return { ok:false, error: String(lastError?.message || 'Generation failed') } as GenerateResult;
}

// Utility: download markdown
export function downloadMarkdown(filename:string, content:string){
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
