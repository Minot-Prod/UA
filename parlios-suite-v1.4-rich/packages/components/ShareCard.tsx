
import React, { useRef } from 'react'
import html2canvas from 'html2canvas'

type Props = { title: string; subtitle?: string; watermark?: string; children?: React.ReactNode }

export function ShareCard({ title, subtitle, watermark = 'Créé avec Parlios™', children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  async function exportPNG() {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: '#0B0B0F' })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url; a.download = 'parlios-card.png'; a.click()
  }

  return (
    <div>
      <div ref={ref} className="w-[600px] max-w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100">
        <div className="text-xs text-zinc-400">{watermark}</div>
        <h3 className="text-2xl font-semibold mt-1">{title}</h3>
        {subtitle && <div className="text-zinc-400 mt-1">{subtitle}</div>}
        <div className="mt-3">{children}</div>
      </div>
      <div className="mt-2">
        <button onClick={exportPNG} className="rounded-lg border px-3 py-1.5 text-sm">Exporter PNG</button>
      </div>
    </div>
  )
}
