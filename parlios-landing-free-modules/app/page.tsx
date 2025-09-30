'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function copy(text: string) {
  navigator.clipboard.writeText(text).catch(()=>{});
}

function scoreTitle(t: string) {
  const lenScore = Math.max(0, 30 - Math.abs(30 - t.length)); // best near 30 chars
  const digits = /\d/.test(t) ? 10 : 0;
  const power = /(ultime|guide|checklist|secrets?|boost|gagne|rapide|gratuit|IA|pro)/i.test(t) ? 15 : 0;
  const action = /(comment|pourquoi|découvre|optimise|gagne|apprends)/i.test(t) ? 10 : 0;
  const uniq = new Set(t.toLowerCase().replace(/[^a-z]/g,'').split('')).size;
  const uniqScore = Math.min(15, Math.max(0, uniq - 10));
  return Math.min(100, lenScore + digits + power + action + uniqScore);
}

function variantsFromTitle(t: string) {
  const base = t.trim();
  const withNumber = /\d/.test(base) ? base : `7 raisons de ${base.toLowerCase()}`;
  const benefit = base.match(/:/) ? base : `${base}: gagne du temps avec l’IA`;
  const question = base.endsWith('?') ? base : `Comment ${base.toLowerCase()} ?`;
  return [withNumber, benefit, question];
}

function TitleEvaluator() {
  const [title, setTitle] = useState('Optimise ton temps avec Parlios');
  const score = useMemo(()=>scoreTitle(title), [title]);
  const tips = useMemo(()=>{
    const tipsArr = [];
    if (!/\d/.test(title)) tipsArr.push('Ajoute un nombre (ex: 5 étapes)');
    if (!/(comment|pourquoi)/i.test(title)) tipsArr.push('Formule en question pour la curiosité');
    if (!/(IA|Parlios)/i.test(title)) tipsArr.push('Rappelle la valeur IA / marque');
    if (title.length < 20) tipsArr.push('Allonge un peu pour donner du contexte');
    if (title.length > 60) tipsArr.push('Raccourcis pour rester percutant');
    return tipsArr.slice(0,3);
  }, [title]);
  const vars = useMemo(()=>variantsFromTitle(title), [title]);

  return (
    <Card>
      <CardHeader><CardTitle>Évaluateur titre & accroche</CardTitle></CardHeader>
      <CardContent>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Entre ton titre..." />
        <div className="flex items-center gap-3">
          <div className="badge">Score</div>
          <div className="text-2xl font-bold">{score}/100</div>
        </div>
        <ul className="list-disc pl-5 text-gray-300">{tips.map((t,i)=>(<li key={i}>{t}</li>))}</ul>
        <div className="grid md:grid-cols-3 gap-3">
          {vars.map((v,i)=>(
            <div key={i} className="card p-3">
              <div className="font-semibold">{v}</div>
              <div className="mt-2">
                <Button onClick={()=>copy(v)}>Copier</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PersonaExpress() {
  const [secteur, setSecteur] = useState('SaaS');
  const [audience, setAudience] = useState('Freelances & PME');
  const [offre, setOffre] = useState('Planificateur IA + Automations');

  const persona = useMemo(()=>{
    const pains = [
      'Manque de temps & priorisation',
      'Trop d’outils, pas d’intégration',
      'Visibilité faible / acquisition irrégulière'
    ];
    const goals = [
      'Gagner 5–10h/semaine',
      'Pipeline client régulier',
      'Clarté & focus hebdo'
    ];
    const message = `Parlios aide ${audience.toLowerCase()} dans le ${secteur.toLowerCase()} à ${offre.toLowerCase()} pour gagner du temps et accélérer la croissance.`;
    return { pains, goals, message };
  }, [secteur, audience, offre]);

  return (
    <Card>
      <CardHeader><CardTitle>Persona Express</CardTitle></CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="input" value={secteur} onChange={e=>setSecteur(e.target.value)} placeholder="Secteur" />
          <input className="input" value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Audience" />
          <input className="input" value={offre} onChange={e=>setOffre(e.target.value)} placeholder="Offre" />
        </div>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div className="card p-3">
            <div className="font-semibold mb-2">Pain points</div>
            <ul className="list-disc pl-5 text-gray-300">
              {persona.pains.map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
          </div>
          <div className="card p-3">
            <div className="font-semibold mb-2">Objectifs</div>
            <ul className="list-disc pl-5 text-gray-300">
              {persona.goals.map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
          </div>
          <div className="card p-3">
            <div className="font-semibold mb-2">Message clé</div>
            <p className="text-gray-200">{persona.message}</p>
            <div className="mt-2"><Button onClick={()=>copy(persona.message)}>Copier</Button></div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">Export PDF/Partage → versions pro (non inclus ici).</div>
      </CardContent>
    </Card>
  );
}

const RISK_KEYWORDS = [
  'pénalité','indemnisation','responsabilité limitée','limitation de responsabilité','arbitrage',
  'juridiction','compétence exclusive','résiliation unilatérale','frais','intérêts','non-concurrence',
  'confidentialité','cessibilité','renonciation','forclusion','force majeure'
];

function detectRisks(text: string) {
  const found = RISK_KEYWORDS.filter(k => new RegExp(k, 'i').test(text));
  const risks = found.slice(0,3).map(k => ({
    term: k,
    why: `La clause contient un élément sensible (“${k}”), pouvant créer un déséquilibre contractuel.`
  }));
  while (risks.length < 3) risks.push({ term: '—', why: 'Aucun risque majeur détecté dans les mots-clés connus.' });
  const safer = "Formulation suggérée: équilibrer les obligations, préciser limites raisonnables, ajouter délais/conditions clairs et voies de recours symétriques.";
  return { risks, safer };
}

function ClauseRiskDetector() {
  const [txt, setTxt] = useState('Le prestataire décline toute responsabilité limitée et impose une juridiction exclusive à Montréal.');
  const result = useMemo(()=>detectRisks(txt), [txt]);

  return (
    <Card>
      <CardHeader><CardTitle>Détecteur de risques de clause</CardTitle></CardHeader>
      <CardContent>
        <textarea className="input" value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Collez une clause contractuelle..."/>
        <div className="grid md:grid-cols-3 gap-3">
          {result.risks.map((r,i)=>(
            <div key={i} className="card p-3">
              <div className="text-sm text-gray-400">Risque #{i+1}</div>
              <div className="font-semibold">{r.term}</div>
              <div className="text-gray-300 text-sm mt-1">{r.why}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 card p-3">
          <div className="font-semibold mb-1">Reformulation</div>
          <div className="text-gray-200 text-sm">{result.safer}</div>
        </div>
        <div className="mt-2 text-xs text-amber-300">⚠️ Info générale, ne remplace pas un conseil juridique.</div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="container-xl py-16">
          <div className="flex items-center gap-4">
            <img src="/brand/logo-parlios.svg" alt="Parlios" className="h-12 w-12" />
            <h1 className="text-4xl font-[Montserrat] font-bold">Parlios</h1>
          </div>
          <p className="mt-3 text-gray-300 max-w-2xl">Optimise ton temps, libère ton potentiel.</p>
          <div className="mt-5">
            <a href="#free" className="btn-primary">Essayer gratuitement</a>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
          <svg viewBox="0 0 1200 600" className="h-full w-full">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6A00FF"/>
                <stop offset="100%" stopColor="#1E3AFF"/>
              </linearGradient>
            </defs>
            <path d="M0,450 C200,380 400,520 600,470 C800,420 1000,520 1200,460 L1200,600 L0,600 Z" fill="url(#lg)"/>
          </svg>
        </div>
      </section>

      <section id="free" className="container-xl py-12">
        <div className="mb-6">
          <div className="badge">Essayez gratuitement</div>
          <h2 className="text-2xl font-bold mt-2">3 outils instantanés</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <TitleEvaluator />
          <PersonaExpress />
          <ClauseRiskDetector />
        </div>

        <div className="mt-10 card p-6">
          <h3 className="text-xl font-bold mb-2">Passez Pro</h3>
          <p className="text-gray-300">Débloquez la sauvegarde, l’export PDF, l’historique et les intégrations.</p>
          <div className="mt-3">
            <a href="#pro" className="btn-primary">Essayer la version Pro</a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Parlios — Branding obligatoire · Tracking GA actif
        </div>
      </section>
    </main>
  );
}
