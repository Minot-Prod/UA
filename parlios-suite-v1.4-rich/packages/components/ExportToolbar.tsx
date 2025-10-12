
import React from 'react'
import { useShare } from '@hooks/useShare'

type Props = {
  onExportPNG?: () => void
  mdText?: string
  shareText?: string
}

export function ExportToolbar({ onExportPNG, mdText, shareText }: Props) {
  const { share } = useShare()
  return (
    <div className="flex flex-wrap gap-2">
      {onExportPNG && (
        <button onClick={onExportPNG} className="rounded-lg border px-3 py-1.5 text-sm">
          Exporter PNG
        </button>
      )}
      {mdText && (
        <button onClick={() => navigator.clipboard.writeText(mdText)} className="rounded-lg border px-3 py-1.5 text-sm">
          Copier Markdown
        </button>
      )}
      {shareText && (
        <button onClick={() => share({ title: 'Créé avec Parlios', text: shareText || '' })} className="rounded-lg border px-3 py-1.5 text-sm">
          Partager
        </button>
      )}
    </div>
  )
}
