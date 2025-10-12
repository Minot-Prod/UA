
import React, { useRef } from 'react'
import html2canvas from 'html2canvas'

type Props = { 
  title: string; 
  subtitle?: string; 
  watermark?: string; 
  watermarkPos?: 'top-left'|'top-right'|'bottom-left'|'bottom-right'; 
  children?: React.ReactNode 
}

const posMap: Record<NonNullable<Props['watermarkPos']>, string> = {
  'top-left': 'top-2 left-3',
  'top-right': 'top-2 right-3',
  'bottom-left': 'bottom-2 left-3',
  'bottom-right': 'bottom-2 right-3',
}

export function ShareCard({ title, subtitle, watermark = 'Créé avec Parlios™', watermarkPos='top-left', children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  async function exportPNG(scale = 2) {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current, { scale, backgroundColor: '#0B0B0F' })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url; a.download = 'parlios-card.png'; a.click()
  }

  async function exportOG() {
    // Exporte un visuel 1200x630 en recréant un canvas et en peignant le DOM capturé
    if (!ref.current) return
    const snap = await html2canvas(ref.current, { scale: 2, backgroundColor: '#0B0B0F' })
    const og = document.createElement('canvas')
    og.width = 1200; og.height = 630
    const ctx = og.getContext('2d')!
    // Fond gradient simple
    const g = ctx.createLinearGradient(0,0,1200,630)
    g.addColorStop(0, '#0B0B0F'); g.addColorStop(1, '#141922')
    ctx.fillStyle = g; ctx.fillRect(0,0,1200,630)
    // Dessine l’aperçu au centre
    const ratio = Math.min(1100 / snap.width, 520 / snap.height)
    const w = Math.floor(snap.width * ratio)
    const h = Math.floor(snap.height * ratio)
    const x = Math.floor((1200 - w) / 2)
    const y = Math.floor((630 - h) / 2)
    ctx.drawImage(snap, x, y, w, h)
    // Watermark OG
    const wm = watermark || 'Créé avec Parlios™'
    ctx.globalAlpha = 0.85
    ctx.fillStyle = '#7FF5DF'
    ctx.font = '600 22px ui-sans-serif,system-ui,-apple-system'
    const m = ctx.measureText(wm)
    ctx.fillText(wm, 1200 - m.width - 24, 630 - 24)
    ctx.globalAlpha = 1
    const url = og.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url; a.download = 'parlios-og-1200x630.png'; a.click()
  }

  return (
    <div>
      <div ref={ref} className="relative w-[600px] max-w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100">
        <div className={`absolute text-xs text-zinc-400 ${posMap[watermarkPos]}`}>{watermark}</div>
        <h3 className="text-2xl font-semibold mt-1">{title}</h3>
        {subtitle && <div className="text-zinc-400 mt-1">{subtitle}</div>}
        <div className="mt-3">{children}</div>
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => exportPNG(2)} className="rounded-lg border px-3 py-1.5 text-sm">Exporter PNG</button>
        <button onClick={exportOG} className="rounded-lg border px-3 py-1.5 text-sm">Exporter OG 1200×630</button>
      </div>
    </div>
  )
}
