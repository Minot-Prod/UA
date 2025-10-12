import React from 'react'
import { ShareCard } from '@components/ShareCard'
import { ExportToolbar } from '@components/ExportToolbar'
import { ParliosChat } from '@components/ParliosChat'

export default function App(){
  const md = `# Parlios Gain de Temps — simulateur d’impact\n\n— Créé avec Parlios™`
  return (<div className='p-4 space-y-4'>
    <ShareCard title="Parlios Gain de Temps — simulateur d’impact" subtitle="Aperçu exportable">
      <p>Exemple de contenu exportable depuis l'app.</p>
    </ShareCard>
    <ExportToolbar mdText={md} shareText="Parlios Gain de Temps — simulateur d’impact — 2025-10-12" />
    <ParliosChat />
  </div>)
}
