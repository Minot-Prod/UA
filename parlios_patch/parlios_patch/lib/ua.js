// lib/ua.js — Parlios UA shared helpers (vanilla JS)
import React from "react";

export function useCreditLog(max = 50) {
  const [log, setLog] = React.useState([]);
  const add = (event, meta) => {
    const t = new Date().toISOString();
    // Local console audit
    try { console.log("[CREDIT_LOG]", t, event, meta ?? {}); } catch {}
    setLog((l) => [{ t, event, meta }, ...l].slice(0, max));
  };
  return { log, add };
}

export async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) { return false; }
}

export function downloadBlob(name, content, type = "text/plain") {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.style.display = "none";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function printAsPDF(node) {
  if (!node) return;
  const w = window.open("", "_blank", "width=1280,height=900");
  if (!w) return;
  const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
    .map((el) => el.outerHTML).join("\\n");
  w.document.write(`<!doctype html><html><head><meta charset="utf-8">${styles}<title>Export</title></head><body>${node.outerHTML}</body></html>`);
  w.document.close(); w.focus(); w.print(); w.close();
}

// Optional: simple OG card generator (1200x630)
export function useOgCard(opts = {}) {
  const { width = 1200, height = 630, watermark = "Créé avec Parlios™" } = opts;
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    if (!canvasRef.current) {
      const c = document.createElement("canvas");
      c.width = width; c.height = height;
      canvasRef.current = c;
    }
  }, [width, height]);
  const draw = (title = "Parlios", subtitle = "") => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#0b0f14"; ctx.fillRect(0, 0, c.width, c.height);
    const grad = ctx.createRadialGradient(c.width*0.6, c.height*0.4, 50, c.width*0.6, c.height*0.4, 700);
    grad.addColorStop(0, "rgba(180,0,255,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(c.width*0.6, c.height*0.4, 700, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "#e6fdf5"; ctx.font = "bold 64px Inter, system-ui, sans-serif";
    ctx.fillText(title, 60, 240);
    ctx.font = "400 28px Inter, system-ui, sans-serif";
    wrapText(ctx, subtitle, 60, 300, c.width - 120, 36);

    ctx.globalAlpha = 0.7; ctx.font = "500 20px Inter, system-ui, sans-serif";
    ctx.fillText(watermark, 60, c.height - 40); ctx.globalAlpha = 1;
  };
  const toDataURL = () => canvasRef.current ? canvasRef.current.toDataURL("image/png") : null;
  return { canvasRef, draw, toDataURL };
}

// util wrap text for canvas
export function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// Lightweight reusable UI blocks
export function BlueprintPanel({ value, onChange, onValidate }) {
  const v = value || {};
  const set = (k) => (e) => onChange && onChange({ ...v, [k]: e.target.value });
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <h3 className="text-lg font-semibold text-white">Blueprint — Base44</h3>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <textarea placeholder="Goal" className="p-3 rounded bg-black/30 text-white" value={v.goal||""} onChange={set('goal')} />
        <textarea placeholder="Scope" className="p-3 rounded bg-black/30 text-white" value={v.scope||""} onChange={set('scope')} />
        <textarea placeholder="Acceptance" className="p-3 rounded bg-black/30 text-white" value={v.acceptance||""} onChange={set('acceptance')} />
        <textarea placeholder="Complexity (XS–XL, risk…)" className="p-3 rounded bg-black/30 text-white" value={v.complexity||""} onChange={set('complexity')} />
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onValidate && onValidate()} className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Valider Blueprint (70%)</button>
      </div>
    </div>
  );
}

export function CreditLog({ items }) {
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-white">CREDIT_LOG</h4>
        <span className="text-xs text-white/60">{items?.length ?? 0} évènements</span>
      </div>
      <ol className="mt-2 space-y-1 max-h-48 overflow-auto text-sm">
        {(items||[]).map((e, i) => (
          <li key={i} className="text-white/80">
            <span className="text-white/40">{new Date(e.t).toLocaleString()}</span> — <strong>{e.event}</strong> {e.meta ? <em className="text-white/60">({JSON.stringify(e.meta)})</em> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}