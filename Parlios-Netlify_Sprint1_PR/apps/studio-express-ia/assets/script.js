// Demo script — plug your real AI endpoints in assets/config.js
const btn = document.getElementById('runBtn');
const statusEl = document.getElementById('status');
const preview = document.getElementById('preview');
const link = document.getElementById('downloadLink');

async function fakeWait(ms){ return new Promise(r=>setTimeout(r, ms)); }

btn.addEventListener('click', async () => {
  statusEl.textContent = 'Génération en cours…';
  const start = performance.now();
  // Simulate a fast generation (<10s)
  await fakeWait(1200 + Math.random()*1200);
  // Render a simple canvas preview and export
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createLinearGradient(0,0,1080,1080);
  grd.addColorStop(0,'#0f1318'); grd.addColorStop(1,'#1a2030');
  ctx.fillStyle = grd; ctx.fillRect(0,0,1080,1080);
  ctx.fillStyle = '#ff2d55'; ctx.font = 'bold 64px Inter, system-ui';
  ctx.fillText('Studio Express IA', 60, 160);
  ctx.fillStyle = '#E6F1FF'; ctx.font = '28px Inter, system-ui';
  const text = document.getElementById('promptInput').value || 'Parlios — Mode Démo';
  wrapText(ctx, text, 60, 240, 960, 36);
  const url = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = url; img.alt = 'render';
  img.style.maxWidth = '90%';
  preview.innerHTML = ''; preview.appendChild(img);
  link.href = url;
  const elapsed = ((performance.now()-start)/1000).toFixed(2);
  statusEl.textContent = 'OK ('+elapsed+'s) — prêt à télécharger.';
});

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
