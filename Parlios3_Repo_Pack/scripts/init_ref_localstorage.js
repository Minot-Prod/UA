(function(){
  try{
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if(ref){ localStorage.setItem('parlios_ref', ref); }
  }catch(e){}
})();
