import { useState } from 'react'
import { generate, downloadMarkdown, type WorkflowId } from '../lib/ai'

export default function GeneratorForm(){
  const [workflow, setWorkflow] = useState<WorkflowId>('business_plan')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{filename:string, content:string}|null>(null)

  async function onSubmit(e:any){
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    const fd = new FormData(e.currentTarget)
    const lang = (fd.get('lang') as string) || 'fr'

    const inputs: any = { lang }
    if (workflow==='business_plan'){
      inputs.projet = String(fd.get('projet')||'').trim()
      inputs.cible = String(fd.get('cible')||'').trim()
      inputs.marche = String(fd.get('marche')||'').trim()
    } else {
      inputs.periode = String(fd.get('periode')||'').trim()
      inputs.objectif = String(fd.get('objectif')||'').trim()
    }

    const res = await generate({ workflow, inputs }, { timeoutMs: 20000, retries:2 })
    setLoading(false)
    if (!res.ok){ setError(res.error || 'Erreur'); return }
    const filename = res.output!.filename
    const content = res.output!.content
    setResult({ filename, content })
  }

  return (
    <form onSubmit={onSubmit} style={{border:'1px solid #e5e7eb', padding:16, borderRadius:12}}>
      <label>Type de livrable<br/>
        <select name="workflow" value={workflow} onChange={e=>setWorkflow(e.target.value as WorkflowId)}>
          <option value="business_plan">Plan d’affaires</option>
          <option value="finance_brief">Brief financier</option>
        </select>
      </label>
      <div style={{display:'grid', gap:8, marginTop:8}}>
        {workflow==='business_plan' ? (<>
          <label>Projet <input name="projet" required/></label>
          <label>Cible <input name="cible" required/></label>
          <label>Marché <input name="marche" required/></label>
        </>) : (<>
          <label>Période <input name="periode" placeholder="T4 2025 / 2025-01 → 2025-06" required/></label>
          <label>Objectif <input name="objectif" required/></label>
        </>)}
        <label>Langue
          <select name="lang" defaultValue="fr">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
      <div style={{marginTop:12, display:'flex', gap:8, alignItems:'center'}}>
        <button disabled={loading} type="submit">{loading?'Génération…':'Générer'}</button>
        {result && <button type="button" onClick={()=>downloadMarkdown(result.filename, result.content)}>Télécharger</button>}
        {error && <span style={{color:'crimson'}}>{error}</span>}
      </div>
      {result && <pre style={{whiteSpace:'pre-wrap', background:'#fff', padding:12, border:'1px solid #eee', marginTop:12}}>{result.content}</pre>}
    </form>
  )
}
