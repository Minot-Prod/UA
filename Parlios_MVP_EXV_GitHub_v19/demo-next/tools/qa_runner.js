// Lightweight QA runner (no deps) — checks routes, headers, TTFB
const http = require('http'); const https = require('https'); const { URL } = require('url');

const ORIGIN = process.env.QA_ORIGIN || 'http://localhost:3000';
const ROUTES = ['/', '/billing', '/api/telemetry/health', '/api/qa/headers'];
const REQ_HEADERS = [
  ['x-content-type-options','nosniff'],
  ['x-frame-options','DENY'],
  ['referrer-policy','strict-origin-when-cross-origin'],
  ['content-security-policy', null],
  ['permissions-policy', null]
];
const BUDGETS = { ttfb_ms: 800 };

function get(u){
  return new Promise((resolve, reject)=>{
    const url = new URL(u); const h = url.protocol==='https:'?https:http;
    const start = Date.now();
    const req = h.request(url, res=>{
      const ttfb = Date.now() - start;
      const chunks = [];
      res.on('data', d=>chunks.push(d));
      res.on('end', ()=>{
        resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8'), ttfb });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async function(){
  let ok = true;
  for (const r of ROUTES){
    const url = ORIGIN + r;
    const { status, headers, ttfb } = await get(url);
    const passTTFB = ttfb <= BUDGETS.ttfb_ms;
    const headerResults = REQ_HEADERS.map(([k, v])=>{
      const got = headers[k];
      return [k, v ? (got===v) : !!got];
    });
    const passHeaders = headerResults.every(([,p])=>p);
    const passStatus = status>=200 && status<400;
    const pass = passStatus && passHeaders && passTTFB;
    ok = ok && pass;
    console.log(`• ${r} — status=${status} ttfb=${ttfb}ms headers=${passHeaders?'OK':'KO'} ${pass?'✅':'❌'}`);
    if(!pass){
      console.log('  Header details:', Object.fromEntries(headerResults));
    }
  }
  process.exit(ok?0:1);
})().catch(e=>{ console.error(e); process.exit(1); });
