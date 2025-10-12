
const header = document.querySelector('header');
window.addEventListener('scroll', ()=>{
  header.style.boxShadow = window.scrollY>6 ? '0 6px 18px rgba(0,0,0,.25)' : 'none';
});
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
