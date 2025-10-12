import React from 'react'
import { ShareCard } from '@components/ShareCard'
import { ExportToolbar } from '@components/ExportToolbar'
import { ParliosChat } from '@components/ParliosChat'

export default function App(){
  const md = `# Parlios Vision Marché — radar d’idées\n\n— Créé avec Parlios™`
  return (<div className='p-4 space-y-4'>
    <ShareCard title="Parlios Vision Marché — radar d’idées" subtitle="Aperçu exportable">
      <p>Exemple de contenu exportable depuis l'app.</p>
    </ShareCard>
    <ExportToolbar mdText={md} shareText="Parlios Vision Marché — radar d’idées — 2025-10-12" />
    <ParliosChat />
  </div>)
}
