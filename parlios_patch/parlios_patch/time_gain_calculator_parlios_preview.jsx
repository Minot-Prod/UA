// time_gain_calculator_parlios_preview.jsx.jsx — upgraded with UA/Base44
import React from "react";
import { useCreditLog, copyToClipboard, downloadBlob, printAsPDF, useOgCard, BlueprintPanel, CreditLog } from "./lib/ua";

export default function time_gain_calculator_parlios_preview() {
  const credit = useCreditLog();
  const [blueprint, setBlueprint] = React.useState({ goal:"", scope:"", acceptance:"", complexity:"" });
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("# time_gain_calculator_parlios_preview.jsx\n\nCalcul du gain de temps estimé + carte partageable (OG).\n");
  const refPdf = React.useRef(null);
  const og = useOgCard();

  React.useEffect(() => { credit.add("started", { app: "time_gain_calculator_parlios_preview.jsx" }) }, []);

  const compute = () => {
    // Placeholder compute logic
    const result = `## Résultat\n\nEntrée: ${input || "(vide)"}`;
    setOutput((prev) => prev.split("\n\n## Résultat")[0] + "\n\n" + result);
    credit.add("compute_done");
    og.draw("time_gain_calculator_parlios_preview.jsx".replace(".jsx",""), input.slice(0, 140));
  };

  const exportMd = () => { downloadBlob("time_gain_calculator_parlios_preview.md", output, "text/markdown"); credit.add("export_md"); };
  const exportPng = () => {
    const url = og.toDataURL();
    if (!url) return;
    fetch(url).then(r=>r.blob()).then((b) => downloadBlob("time_gain_calculator_parlios_preview.png", b, "image/png"));
    credit.add("export_png");
  };
  const exportPdf = () => { if (refPdf.current) printAsPDF(refPdf.current); credit.add("export_pdf"); };
  const share = async () => {
    const ok = await copyToClipboard(output); credit.add("share_clicked", { copied: ok });
    try { if (navigator.share) await navigator.share({ title: "time_gain_calculator_parlios_preview.jsx", text: "Parlios — export", url: window.location.href }); } catch (e) {}
  };
  const validateBlueprint = () => { credit.add("blueprint_validated", { checkpoint: "70%" }); };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Parlios — time gain calculator parlios preview</h1>
          <div className="text-sm text-white/60">UA Patch — 2025-10-12</div>
        </header>

        <BlueprintPanel value={blueprint} onChange={setBlueprint} onValidate={validateBlueprint} />

        <section className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-white/80 text-sm">Entrée</label>
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Décris ton besoin…" className="w-full h-40 p-3 rounded-xl bg-white/5 border border-white/10" />
            <button onClick={compute} className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200">Générer</button>
          </div>
          <div className="space-y-3">
            <label className="text-white/80 text-sm">Aperçu export</label>
            <div ref={refPdf} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <article className="prose prose-invert">
                <h2>Sortie (Markdown)</h2>
                <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                <div className="mt-6 text-xs text-white/60">Créé avec Parlios™</div>
              </article>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={exportMd} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Export .md</button>
              <button onClick={exportPdf} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Export .pdf</button>
              <button onClick={exportPng} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Export .png (OG)</button>
              <button onClick={share} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">Partager</button>
            </div>
          </div>
        </section>

        <CreditLog items={credit.log} />
      </div>
    </div>
  );
}