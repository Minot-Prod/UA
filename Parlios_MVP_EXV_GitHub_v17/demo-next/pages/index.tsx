import GeneratorForm from '../components/GeneratorForm'
export default function Home(){
  return (<main style={{padding:'1rem', maxWidth:900, margin:'0 auto'}}>
    <h1>Parlios — Générateurs IA (démo)</h1>
    <p>Soumets un prompt (mock provider). L’adapter client gère timeout, retries, idempotency et export .md.</p>
    <GeneratorForm/>
  </main>)
}
