
// Light analytics without cookies — sends POST to optional n8n endpoint if configured
window.trackEvent = function(name, payload={}){
  try{
    const endpoint = window.PARLIOS_N8N_ENDPOINT || '';
    if(!endpoint) return;
    fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name, payload, ts: Date.now() })});
  }catch(e){}
}
