import React, { useMemo, useState } from "react";
import {
  Gauge,
  Layers,
  ListTodo,
  Search,
  Wand2,
  Link as LinkIcon,
  BarChart3,
  Users2,
  MessageSquare,
  Rocket,
  DollarSign,
  Sparkles,
  Workflow,
  Trophy,
  BrainCircuit,
  TrendingUp,
  Award,
  Flame,
  Target,
  ChartLine,
  PieChart as PieIcon,
  BarChart2,
  Bell,
  CalendarDays,
  FileText,
  Plus,
  Star,
  CheckCircle2,
  ThumbsUp,
  Send,
  ChevronRight
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const makeData = (days: number) => Array.from({ length: days }, (_, i) => ({ d: i + 1, value: Math.max(2, Math.round(4 + Math.sin(i / 2) * 3 + (i % 5))) }));
const makeSales = (days: number) => Array.from({ length: days }, (_, i) => ({ d: i + 1, value: Math.max(200, Math.round(220 + Math.sin(i / 3) * 60 + (i % 7) * 12)) }));

const tabs = [
  { key: "overview", label: "Aperçu", icon: Gauge },
  { key: "finance", label: "Tableau de bord Finances", icon: DollarSign },
  { key: "tasks", label: "Tâches", icon: ListTodo },
  { key: "content", label: "Contenu", icon: Layers },
  { key: "apps", label: "Apps IA", icon: Rocket },
  { key: "automations", label: "Automatisations", icon: Workflow },
  { key: "avatar", label: "Assistant Parlios", icon: BrainCircuit }
] as const;

type TabKey = typeof tabs[number]["key"];

export default function ParliosHubPreview() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [range, setRange] = useState<number>(30);
  const kpiData = useMemo(() => makeData(range), [range]);
  const salesData = useMemo(() => makeSales(range), [range]);

  return (
    <section className="relative w-full border-t border-white/10 bg-[#0B0B0F] text-zinc-100 overflow-hidden">
      {/* HALO / AURA BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-lime-300/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <SuccessBanner />
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 text-lime-300 drop-shadow-[0_0_12px_rgba(159,237,140,0.25)]">
          Tableau de bord Parlios — Succès en progression 🚀
        </h2>
        <ProgressTracker />
        <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
          <nav aria-label="Navigation du hub" className="rounded-xl border border-white/10 bg-white/5/50 backdrop-blur-md p-2 shadow-[0_0_30px_rgba(127,212,255,0.15)]">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition ${
                  tab === key ? "border-sky-400 text-white shadow-[0_0_20px_rgba(127,212,255,0.25)]" : "border-transparent text-zinc-300 hover:border-white/20 hover:text-white"
                }`}
                aria-pressed={tab === key}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5/50 backdrop-blur-md p-3 shadow-[0_0_40px_rgba(159,237,140,0.12)]">
              {tab === "overview" && <Overview kpiData={kpiData} salesData={salesData} />}
              {tab === "finance" && <Finance />}
              {tab === "tasks" && <Tasks />}
              {tab === "content" && <Content />}
              {tab === "apps" && <Apps />}
              {tab === "automations" && <Automations />}
              {tab === "avatar" && <AvatarAI />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessBanner() {
  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-gradient-to-r from-lime-300/15 via-sky-400/10 to-fuchsia-400/10 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-lime-300" />
          <span className="text-zinc-300">Croissance hebdo : </span>
          <strong className="text-lime-300">+18%</strong>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Flame className="h-4 w-4 text-orange-300" />
          <span className="text-zinc-300">Série de réussite : </span>
          <strong className="text-orange-300">12 jours</strong>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-sky-300" />
          <span className="text-zinc-300">Score Parlios : </span>
          <strong className="text-sky-300">842 pts</strong>
        </div>
      </div>
    </div>
  );
}

function ProgressTracker() {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>Progression : 72%</span>
        <span>Prochain palier : 1500 pts</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-lime-300 to-sky-400 transition-all"></div>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
        <Target className="h-3.5 w-3.5 text-lime-300" /> Objectif du mois : débloquer l'app #6
      </div>
    </div>
  );
}

function Overview({ kpiData, salesData }: { kpiData: { d: number; value: number }[]; salesData: { d: number; value: number }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold flex items-center gap-2 text-lime-300">
        <Trophy className="h-5 w-5" /> Statistiques de réussite
      </h3>

      {/* KPIs principaux (ajustés) */}
      <div className="grid gap-3 md:grid-cols-3">
        {/* % d'optimisation */}
        <article className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
          <p className="text-sm text-zinc-400">Optimisation du business</p>
          <p className="text-2xl font-bold text-lime-300">76%</p>
          <p className="text-xs text-zinc-400 mt-1">Mises en place vs. potentiel total</p>
        </article>
        {/* Clients satisfaits (référence) */}
        <article className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
          <p className="text-sm text-zinc-400">Satisfaction clients</p>
          <p className="text-2xl font-bold text-lime-300">4.8/5</p>
          <p className="text-xs text-zinc-400 mt-1">Moyenne d’avis (Google/Trustpilot)</p>
        </article>
        {/* Revenus annuels estimés */}
        <article className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
          <p className="text-sm text-zinc-400">Revenus annuels estimés</p>
          <p className="text-2xl font-bold text-emerald-300">$58.4K</p>
          <p className="text-xs text-emerald-300 mt-1">+22% vs. l’an dernier</p>
        </article>
      </div>

      {/* Mini-sections supplémentaires visibles dès l'arrivée */}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {/* CA / tendance explicite */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <h4 className="mb-2 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-sky-300"/> Chiffre d’affaires (tendance)</h4>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ left: 0, right: 0, top: 2, bottom: 0 }}>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #334155" }} labelFormatter={() => ""} />
                <Line type="monotone" dataKey="value" stroke="#9EE37D" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-sm text-zinc-300">Croissance CA 30j : <span className="text-emerald-300 font-semibold">+14%</span></p>
        </div>

        {/* Leads récents */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <h4 className="mb-2 flex items-center gap-2 font-semibold"><Users2 className="h-4 w-4 text-sky-300"/> Leads récents</h4>
          <ul className="space-y-2 text-sm text-zinc-200">
            {[
              { name: "Camille R.", note: "Demande devis site" },
              { name: "Ousmane K.", note: "RDV découverte" },
              { name: "Maya P.", note: "Intéressée par IA contenu" }
            ].map((l) => (
              <li key={l.name} className="flex items-center justify-between gap-2">
                <span>{l.name}</span>
                <span className="text-zinc-400">{l.note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Flux social avec croissance */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <h4 className="mb-2 flex items-center gap-2 font-semibold"><MessageSquare className="h-4 w-4 text-sky-300"/> Flux social</h4>
          <ol className="list-disc space-y-1 pl-5 text-sm text-zinc-200">
            <li>+8% abonnés (30j) – <span className="text-zinc-400">LinkedIn</span></li>
            <li>+320 abonnés ce mois – <span className="text-zinc-400">Instagram</span></li>
            <li>Taux d’engagement : <span className="text-emerald-300 font-semibold">5.4%</span></li>
          </ol>
        </div>
      </div>

      {/* Prochaines actions + Conseils + Actus + Communauté */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <NextActions />
        <div className="grid gap-3">
          <AdviceAndNews />
          <CommunityPanel />
        </div>
      </div>

      {/* Wins feed (on garde) */}
      <div className="mt-4">
        <WinsFeed />
      </div>
    </div>
  );
}

function NextActions() {
  const tasks = [
    { date: "12/10", item: "Soumettre devis ‘Site pro’", type: "Dossier" },
    { date: "13/10", item: "Réunion client — 10:30", type: "Réunion" },
    { date: "14/10", item: "Publication post LinkedIn", type: "Réseaux" }
  ];
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <h4 className="mb-2 font-semibold flex items-center gap-2"><CalendarDays className="h-4 w-4 text-sky-300"/> Prochaines actions</h4>
      <div className="grid gap-2">
        {tasks.map((t) => (
          <div key={t.item} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-2 text-sm">
            <span className="text-zinc-400">{t.date}</span>
            <span>{t.item}</span>
            <span className="text-xs text-zinc-400">{t.type}</span>
          </div>
        ))}
      </div>
      <button className="mt-3 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200 hover:border-white/25">
        <Plus className="h-3.5 w-3.5"/> Ajouter une action
      </button>
    </div>
  );
}

function AdviceAndNews() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <h4 className="mb-2 font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-fuchsia-300"/> Conseils & Opportunités</h4>
      <div className="grid gap-2 text-sm">
        <div className="rounded-md border border-white/10 bg-white/5 p-2">
          <p className="text-zinc-300 font-medium">Conseils de l’Assistant Parlios</p>
          <ul className="mt-1 list-disc pl-5 text-zinc-200">
            <li>Automatise ta demande d’avis clients après chaque vente.</li>
            <li>Réutilise tes meilleurs posts en carrousels (format 5 slides).</li>
          </ul>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-2">
          <p className="text-zinc-300 font-medium">Subventions à découvrir</p>
          <ul className="mt-1 list-disc pl-5 text-zinc-200">
            <li>Programme Numérique PME — jusqu’à 2 400$ (exemple)</li>
            <li>Crédit innovation — prototype IA (exemple)</li>
          </ul>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-2">
          <p className="text-zinc-300 font-medium">Actualités & opportunités</p>
          <ul className="mt-1 list-disc pl-5 text-zinc-200">
            <li>Appel à projets — Marketplace locaux</li>
            <li>Partenariat outils IA — accès anticipé</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function CommunityPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5/50 backdrop-blur-md p-3 shadow-[0_0_24px_rgba(127,212,255,0.12)]">
      <h4 className="mb-2 font-semibold flex items-center gap-2"><Users2 className="h-4 w-4 text-sky-300"/> Communauté</h4>
      <div className="rounded-md border border-white/10 bg-white/10 p-2 text-sm hover:shadow-[0_0_20px_rgba(127,212,255,0.20)] transition-shadow">
        <p className="mb-1"><strong>Nouveau message</strong> — "Bienvenue ! Tu peux rejoindre le live de jeudi."</p>
        <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200 hover:border-white/25">
          Ouvrir la messagerie <ChevronRight className="h-3.5 w-3.5"/>
        </button>
      </div>
      <div className="mt-2 grid gap-2 text-sm">
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/10 p-2 hover:shadow-[0_0_20px_rgba(159,237,140,0.18)] transition-shadow">
          <span>Événement virtuel — Atelier IA</span>
          <span className="text-zinc-400">16/10 18:00</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/10 p-2 hover:shadow-[0_0_20px_rgba(159,237,140,0.18)] transition-shadow">
          <span>Meetup Montréal — Parlios</span>
          <span className="text-zinc-400">22/10 19:00</span>
        </div>
      </div>
    </div>
  );
}

function WinsFeed() {
  const wins = [
    { t: "09:20", msg: "+1 client signé (Forfait Starter)" },
    { t: "Hier", msg: "+3 rendez-vous planifiés via Calendly" },
    { t: "Avant-hier", msg: "Article de blog publié avec Content Planner" }
  ];
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <h4 className="mb-2 font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-fuchsia-300"/> Tes dernières victoires</h4>
      <ul className="space-y-2 text-sm text-zinc-200">
        {wins.map((w, idx) => (
          <li key={idx} className="flex items-center justify-between gap-2">
            <span className="text-zinc-400">{w.t}</span>
            <span>{w.msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Finance() {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold flex items-center gap-2 text-sky-300">
        <DollarSign className="h-5 w-5" /> Tableau de bord Finances
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: "Revenus récurrents (MRR)", value: "$2,340", color: "text-lime-300" },
          { label: "Cash disponible", value: "$8,920", color: "text-sky-300" },
          { label: "Dépenses mensuelles", value: "$1,450", color: "text-red-400" }
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {[
          { label: "Marge brute", value: "62%" },
          { label: "ARPU", value: "$47" },
          { label: "CAC (est.)", value: "$18" },
          { label: "LTV (est.)", value: "$420" },
          { label: "Conversion lead→client", value: "8.2%" },
          { label: "Factures en attente", value: "3" }
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">{k.label}</p>
            <p className="text-xl font-semibold text-zinc-100">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">Générer une facture</button>
        <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">Simuler la marge</button>
        <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">Exporter CSV</button>
      </div>
    </div>
  );
}

function Tasks() {
  const calendar = [
    { day: "12", items: ["Soumission dossier Subvention IA", "Publier post IG"] },
    { day: "13", items: ["Réunion client 10:30", "Appeler fournisseur"] },
    { day: "14", items: ["Proposition commerciale v2", "Post LinkedIn 11:00"] },
    { day: "15", items: ["Relance devis #1042"] },
  ];
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Calendrier & Tâches</h3>
      <div className="grid gap-3 md:grid-cols-4">
        {calendar.map((c) => (
          <div key={c.day} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
            <p className="mb-2 font-semibold text-sky-300">{c.day}/10</p>
            <ul className="space-y-1">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-zinc-500"/>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-zinc-500" placeholder="Nouvelle tâche…"/>
        <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"><Plus className="h-4 w-4"/></button>
      </div>
    </div>
  );
}

function Content() {
  const blocks = [
    { title: "Idées de contenu (IA)", desc: "10 hooks + titres pour la semaine" },
    { title: "Calendrier éditorial", desc: "Plan multi‑canal 30 jours" },
    { title: "Bibliothèque médias", desc: "Visuels, vidéos courtes, carrousels" },
    { title: "Prompts sauvegardés", desc: "Templates réutilisables Parlios" }
  ];
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Contenu</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {blocks.map((b) => (
          <article key={b.title} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="font-semibold">{b.title}</p>
            <p className="text-sm text-zinc-400">{b.desc}</p>
            <button className="mt-2 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200 hover:border-white/25">
              Ouvrir <ChevronRight className="h-3.5 w-3.5"/>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function Apps() {
  const apps = [
    { name: "MessageCraft AI", desc: "Emails, DM et scripts en ton style.", icon: <FileText className="h-4 w-4"/> },
    { name: "Vision Marché", desc: "Niches, personas, analyse rapide.", icon: <BarChart2 className="h-4 w-4"/> },
    { name: "Teaser Builder", desc: "Visuels & teasers instantanés.", icon: <PieIcon className="h-4 w-4"/> },
    { name: "Studio Express", desc: "Mini‑sites en 5 min.", icon: <Layers className="h-4 w-4"/> },
    { name: "Content Planner", desc: "Plan multi‑canal.", icon: <CalendarDays className="h-4 w-4"/> },
    { name: "Inbox IA", desc: "Réponses assistées.", icon: <Send className="h-4 w-4"/> },
    { name: "CreatorHub AI", desc: "Templates & actifs.", icon: <Star className="h-4 w-4"/> },
    { name: "MarketGenius", desc: "Idéation offres.", icon: <Rocket className="h-4 w-4"/> },
  ];
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Apps IA</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {apps.map((a) => (
          <article key={a.name} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-md border border-white/10 bg-white/5 p-1">{a.icon}</span>
              <p className="font-semibold">{a.name}</p>
            </div>
            <p className="text-sm text-zinc-300">{a.desc}</p>
            <div className="mt-2 flex gap-2">
              <button className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">Preview</button>
              <button className="rounded-md border border-lime-300/40 bg-gradient-to-b from-lime-300/20 to-lime-300/10 px-2 py-1 text-xs">Ajouter</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Automations() {
  const flows = [
    { name: "Capture → Notion CRM", desc: "Formulaire → base clients (auto)", stack: ["Parlios Forms", "Notion"] },
    { name: "Lead → Email d’accueil", desc: "Nouveau lead → séquence 3 emails", stack: ["Parlios", "Gmail"] },
    { name: "Panier abandonné", desc: "Relance auto 2 étapes", stack: ["Shopify", "Mailing"] },
    { name: "Cross‑post social", desc: "Un post → 3 réseaux", stack: ["Planner", "Buffer"] },
    { name: "Commande → Facture", desc: "Shopify → Stripe + PDF", stack: ["Shopify", "Stripe"] },
    { name: "RDV → Rappel SMS", desc: "Rappel 24h avant", stack: ["Calendly", "SMS"] },
    { name: "Lead scoring", desc: "Priorise automatiquement", stack: ["Sheets", "Parlios IA"] },
    { name: "Alertes Slack", desc: "Ventes / mentions", stack: ["Slack", "Parlios"] },
    { name: "Backup Notion", desc: "Sync hebdo", stack: ["Notion", "Drive"] }
  ];
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Automatisations</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {flows.map((f) => (
          <article key={f.name} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-semibold">{f.name}</p>
              <span className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-zinc-300">Prochainement</span>
            </div>
            <p className="text-sm text-zinc-300">{f.desc}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-300">{s}</span>
              ))}
            </div>
            <button className="mt-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">Choisir</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function AvatarAI() {
  const [typing, setTyping] = React.useState(true);
  const [showSecond, setShowSecond] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setTyping(false), 900);
    const s = setTimeout(() => setShowSecond(true), 1100);
    return () => { clearTimeout(t); clearTimeout(s); };
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5/50 backdrop-blur-md p-5 shadow-[0_0_36px_rgba(159,237,140,0.12)]">
      <h3 className="mb-3 text-lg font-semibold text-lime-300 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(159,237,140,0.25)]">
        <BrainCircuit className="h-5 w-5" /> Assistant Parlios (IA du Hub)
      </h3>
      <div className="flex items-start gap-3">
        {/* Avatar simple */}
        <div className="relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-lime-300/70 to-sky-400/70">
          <div className="absolute inset-0 rounded-full shadow-[0_0_24px_rgba(127,212,255,0.35)]" aria-hidden="true" />
        </div>
        <div className="flex-1">
          {/* Chat bubbles mock */}
          <div className="mb-2 inline-block max-w-[90%] rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm">
            Bonjour ! Je suis l’Assistant Parlios. Dis‑moi sur quoi tu veux avancer aujourd’hui : visibilité, ventes, ou organisation ?
          </div>

          {typing && (
            <div className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-300"></span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-300 [animation-delay:150ms]"></span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-300 [animation-delay:300ms]"></span>
            </div>
          )}

          {showSecond && (
            <div className="inline-block max-w-[90%] rounded-2xl border border-lime-300/30 bg-lime-300/10 px-3 py-2 text-sm shadow-[0_0_22px_rgba(159,237,140,0.18)]">
              Commence par relier ton formulaire de contact à Notion CRM, puis planifie 2 posts pour demain — je te prépare les textes.
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-zinc-500" placeholder="Écrire un message…"/>
            <button className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"><Send className="h-4 w-4"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
