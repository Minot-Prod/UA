
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ShareCard, ExportToolbar, ParliosChat } from '@components'

function App() {
  const md = '# Demo Parlios\n\n— Créé avec Parlios™'
  return (
    <div style={{ padding: 16 }}>
      <ShareCard title="Carte partageable" subtitle="Démo export PNG">
        <p>Exemple de contenu.</p>
      </ShareCard>
      <div style={{ marginTop: 12 }}>
        <ExportToolbar mdText={md} shareText="Ma démo Parlios" />
      </div>
      <div style={{ marginTop: 12 }}>
        <ParliosChat />
      </div>
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
