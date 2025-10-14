(function(){
  function mount(el, opts){
    var src=(opts && opts.src) || (location.origin+ (opts && opts.path ? opts.path : "/embed.html"));
    if(opts && opts.ua){ src += (src.indexOf('?')>0?'&':'?') + "ua="+encodeURIComponent(opts.ua); }
    var iframe=document.createElement('iframe');
    iframe.setAttribute('title','Parlios Widget');
    iframe.style.width= (opts&&opts.width)||'100%';
    iframe.style.height=(opts&&opts.height)||'420px';
    iframe.style.border='0';
    iframe.loading='lazy';
    iframe.src = src;
    el.innerHTML='';
    el.appendChild(iframe);
    return iframe;
  }
  window.ParliosWidget = { mount: mount };
})();