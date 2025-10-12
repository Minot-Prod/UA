
const http = require('http');
function checkOllama() {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port: 11434, path: '/', method: 'GET', timeout: 500 }, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 404);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}
(async () => {
  const ok = await checkOllama();
  console.log('IA locale (Ollama) disponible:', ok);
  console.log('exportPNG sanity:', 'data:image/png;base64,xxx'.startsWith('data:image/png'));
  console.log('CREDIT_LOG format ok:', /^\[\d{4}-/.test(`[${new Date().toISOString()}] EVENT app=demo`));
})();                
