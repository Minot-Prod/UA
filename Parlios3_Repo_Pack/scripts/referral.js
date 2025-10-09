(function(){
  try{
    const ref = localStorage.getItem('parlios_ref');
    if(!ref) return;
    const sel = 'a[data-append-ref="true"]';
    document.querySelectorAll(sel).forEach(a=>{
      const url = new URL(a.href, window.location.origin);
      url.searchParams.set('ref', ref);
      a.href = url.toString();
    });
  }catch(e){}
})();
