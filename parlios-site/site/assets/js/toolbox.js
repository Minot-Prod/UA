
const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const count = document.getElementById('count');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const frame = document.getElementById('frame');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.getElementById('closeBtn');

let tools = [];
let filtered = [];

async function loadTools(){
  try{
    const res = await fetch('/toolbox/index.json', {cache:'no-store'});
    tools = await res.json();
    if(!Array.isArray(tools)) throw new Error('index.json doit être un tableau');
  }catch(e){
    console.warn('Problème index.json', e);
    tools = [];
  }
  filtered = tools;
  render();
}

function render(){
  grid.innerHTML = '';
  if(filtered.length === 0){
    grid.style.display = 'none'; empty.style.display = 'block';
    count.textContent = '0 outil';
    return;
  }
  grid.style.display = 'grid'; empty.style.display = 'none';
  filtered.forEach(tool => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="body">
        <h3>${tool.title || tool.id || 'Sans titre'}</h3>
        <p class="small" style="color:var(--muted)">${tool.description || ''}</p>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn primary" data-id="${tool.id}">Ouvrir</button>
          <a class="btn" href="/apps/${tool.id}/public/embed.html" target="_blank" rel="noopener" data-analytics="tool-newtab" data-id="${tool.id}">Plein onglet</a>
        </div>
      </div>`;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => openTool(tool));
    grid.appendChild(card);
  });
  count.textContent = `${filtered.length} ${filtered.length>1?'outils':'outil'}`;
}

function openTool(tool){
  modalTitle.textContent = tool.title || tool.id || 'Outil';
  frame.src = `/apps/${tool.id}/public/embed.html`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  if (window.trackEvent) window.trackEvent('tool-open', { id: tool.id });
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  frame.src = 'about:blank';
  if (window.trackEvent) window.trackEvent('modal-close', {});
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

// ESC support
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

search.addEventListener('input', ()=>{
  const q = search.value.toLowerCase().trim();
  filtered = tools.filter(t => (t.title||'').toLowerCase().includes(q) || (t.id||'').toLowerCase().includes(q));
  render();
});

document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[data-analytics="tool-newtab"]');
  if(a && window.trackEvent){
    window.trackEvent('tool-newtab', { id: a.getAttribute('data-id') });
  }
});

loadTools();
