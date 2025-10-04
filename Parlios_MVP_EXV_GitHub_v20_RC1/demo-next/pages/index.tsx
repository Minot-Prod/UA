import Link from 'next/link'
export default function Home(){
  return (<main style={{padding:'1rem'}}>
    <h1>Parlios — Release Candidate (v20_RC1)</h1>
    <ul>
      <li><a href="/api/health">/api/health</a></li>
      <li><a href="/api/headers">/api/headers</a></li>
      <li><Link href="https://app.netlify.com/start">Déployer sur Netlify</Link></li>
      <li><Link href="https://vercel.com/new">Déployer sur Vercel</Link></li>
    </ul>
    <p style={{opacity:0.7}}>RC figée. Seuls les fixes critiques seront acceptés.</p>
  </main>)
}
