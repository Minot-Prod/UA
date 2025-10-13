
function seededRandom(seed) { let x = Math.sin(seed) * 10000; return x - Math.floor(x); }
function pick(arr, r){ return arr[Math.floor(r*arr.length) % arr.length]; }
function synonymsPool(){
  return {
    hooks: [
      "Et si vous passiez au niveau supérieur ?",
      "Prêt à gagner du temps dès aujourd’hui ?",
      "Votre audience attend déjà la suite.",
      "Transformez une idée en impact concret."
    ],
    benefits: [
      "Gain de temps x3 sur vos tâches quotidiennes",
      "Expérience premium sans complexité",
      "Plus de clarté, moins de friction",
      "Des résultats mesurables en quelques jours"
    ],
    proofs: [
      "Déjà adopté par des entrepreneurs à Montréal et Paris",
      "Backlog et KPIs intégrés",
      "A11y AA et performance élevées",
      "Design system cohérent, exportable"
    ],
    ctas: {
      portfolio: ["Voir mon portfolio", "Découvrir mes projets", "Explorer mes réalisations"],
      booking: ["Réserver une séance", "Prendre rendez-vous", "Planifier un appel"],
      table: ["Réserver une table", "Voir le menu", "Commander maintenant"],
      generic: ["Commencer maintenant", "Essayer la démo", "Créer ma version"]
    }
  };
}
function toneModifiers(tone){
  const map = {
    friendly: { adjs:["simple","fluide","clair","humain"], len: 1.0 },
    pro: { adjs:["efficace","structuré","robuste","mesurable"], len: 0.95 },
    fun: { adjs:["énergique","percutant","amusant","vif"], len: 0.9 },
    direct: { adjs:["concret","rapide","net","précis"], len: 0.85 }
  };
  return map[tone] || map.pro;
}
function goalTemplates(goal){
  const base = {
    portfolio: ["{hook} Découvrez un aperçu {adj} de vos projets. {benefit}. {proof}. {cta} →"],
    booking: ["{hook} Passez à l’action avec un parcours {adj}. {benefit}. {proof}. {cta} →"],
    table: ["{hook} Une expérience {adj} pour vos clients. {benefit}. {proof}. {cta} →"],
    generic: ["{hook} Une solution {adj} alignée sur vos objectifs. {benefit}. {proof}. {cta} →"]
  };
  return base[goal] || base.generic;
}
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const cost = (a[i-1]===b[j-1])?0:1;
      dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost);
    }
  }
  return dp[m][n];
}
export function generateVariants({seed, tone="pro", goal="generic", count=5, length="medium"}){
  const pool = synonymsPool();
  const mod = toneModifiers(tone);
  const templates = goalTemplates(goal);
  const seedBase = typeof seed==="number"? seed : Date.now();
  const out = [];
  let tries = 0;
  while(out.length < count && tries < 200){
    const s = seedBase + tries*17 + (out.length*999);
    const r1 = seededRandom(s);
    const r2 = seededRandom(s+1);
    const r3 = seededRandom(s+2);
    const r4 = seededRandom(s+3);
    const adj = pick(mod.adjs, r1);
    const hook = pick(pool.hooks, r2);
    const benefit = pick(pool.benefits, r3);
    const proof = pick(pool.proofs, r4);
    let ctaList = pool.ctas[goal] || pool.ctas.generic;
    const cta = pick(ctaList, seededRandom(s+4));
    const t = pick(templates, seededRandom(s+5))
      .replace("{hook}", hook)
      .replace("{adj}", adj)
      .replace("{benefit}", benefit)
      .replace("{proof}", proof)
      .replace("{cta}", cta);
    const targetLen = length==="short"? 120 : length==="long"? 260 : 180;
    const ratio = targetLen / Math.max(60, t.length);
    let final = t;
    if(ratio<0.9) final = t.split(" ").slice(0, Math.floor(t.split(" ").length*0.85)).join(" ");
    if(ratio>1.2) final = t + " " + benefit + ".";
    const uniqueEnough = out.every(x => {
      const dist = levenshtein(x, final);
      const avgLen = (x.length + final.length)/2;
      return (dist/avgLen) > 0.35;
    });
    if(uniqueEnough) out.push(final + ` (${tone})`);
    tries++;
  }
  return out;
}
