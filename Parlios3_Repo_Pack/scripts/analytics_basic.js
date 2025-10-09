(function(){
  const log = (type, detail) => {
    console.info('[ParliosAnalytics]', type, detail);
  };
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a,button');
    if(!a) return;
    const lbl = a.getAttribute('data-analytics') || (a.textContent||'').trim().slice(0,60);
    log('click', lbl);
  });
})();
