import React from 'react'
import { ShareCard } from '@components/ShareCard'
import { ExportToolbar } from '@components/ExportToolbar'
import { ParliosChat } from '@components/ParliosChat'

export default function App(){
  const md = `# Parlios Valeur Juste — prix conscient\n\n— Créé avec Parlios™`
  return (<div className='p-4 space-y-4'>
    <ShareCard title="Parlios Valeur Juste — prix conscient" subtitle="Aperçu exportable">
      <p>Exemple de contenu exportable depuis l'app.</p>
    </ShareCard>
    <ExportToolbar mdText={md} shareText="Parlios Valeur Juste — prix conscient — 2025-10-12" />
    <ParliosChat />
  </div>)
}
