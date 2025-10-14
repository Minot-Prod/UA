
/* UA Front Adapter v1 */
(function(){
  const $ = (s)=>document.querySelector(s);
  const out = $("#out");
  const intentSel = document.createElement('select');
  ["DEMO","PING","RUN"].forEach(x=>{ const o=document.createElement('option'); o.value=x; o.textContent=x; intentSel.appendChild(o); });
  intentSel.id="intent";
  const payload = document.createElement('textarea');
  payload.id="payload"; payload.rows=6; payload.placeholder='{"input":"texte..."}';
  const card = document.querySelector(".card.grid");
  const row = document.createElement('div'); row.className="grid";
  const lbl1=document.createElement('label'); lbl1.textContent="Intent"; lbl1.appendChild(intentSel);
  const lbl2=document.createElement('label'); lbl2.textContent="Payload JSON"; lbl2.appendChild(payload);
  row.appendChild(lbl1); row.appendChild(lbl2);
  card.insertBefore(row, $("#out"));

  function uaBase(){
    const urlParam = new URLSearchParams(location.search).get("ua");
    if (urlParam) return urlParam;
    if (window.UA_BASE) return window.UA_BASE;
    const v = localStorage.getItem("UA_BASE");
    return v || "";
  }
  function setStatus(msg){ if(out) out.textContent = msg; }

  const segs = location.pathname.split('/').filter(Boolean);
  const idx = Math.max(0, segs.indexOf('apps'));
  const appId = segs[idx+1] || 'preview';

  const localImpl = {
    "copyforge-ai": (data)=>{
      const txt = String(data.input||"").trim()||"Texte exemple Parlios";
      const variants = [txt, txt.replace(/\btrès\b/gi,""), ("✅ "+txt)].slice(0,3);
      return {title:"CopyForge Variants", variants};
    },
    "adset-builder": (data)=>{
      const p = data.product||"Produit X";
      const aud = data.audience||"Audience Y";
      return {adset:{product:p,audience:aud,budget_daily:20,placements:["Feed","Reels"],kpis:["CTR","CPL"]}};
    },
    "budgetbuddy-lite": (data)=>{
      const income=Number(data.income||3000), rent=Number(data.rent||900), other=Number(data.other||800);
      const remain=income-rent-other;
      return {summary:{income,rent,other,remain,save:Math.max(0,Math.round(remain*0.2))}};
    },
    "articlecraft-lite": (data)=>{
      const topic = data.topic||"IA et productivité";
      return {outline:[`Intro: ${topic}`, "3 points clés", "Conclusion actionnable"]};
    },
    "emailflow-ai": (data)=>{
      const subj = data.subject||"Proposition";
      return {email:{subject:`[Parlios] ${subj}`, body:`Bonjour,\nVoici la version générée pour '${subj}'.\nCordialement.`}};
    }
  };

  async function run(){
    const ua = uaBase();
    const intent = (document.getElementById('intent')||{}).value || "DEMO";
    let data={};
    try{ data = JSON.parse(document.getElementById('payload').value||"{}"); }catch{ data = {}; }
    setStatus("Exécution...");
    // Prefer backend if configured
    if (ua){
      try{
        const resp = await fetch(ua, {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({app_id: appId, intent, payload: data})
        });
        const j = await resp.json().catch(()=>({status:resp.status}));
        setStatus("Backend: "+JSON.stringify(j,null,2));
        return;
      }catch(e){
        // fallback to local
      }
    }
    // Local fallback
    const fn = localImpl[appId] || ((d)=>({echo:d, note:"fallback local"}));
    const res = fn(data);
    setStatus("Local: "+JSON.stringify({app_id:appId,intent,res},null,2));
  }

  const genBtn = document.getElementById('gen');
  if (genBtn){ genBtn.onclick = run; }
})();
