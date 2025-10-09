# MVP — Accès anticipé
Le futur de Parlios arrive: un produit unique pour accélérer ton lancement.

- Reçois l’accès anticipé
- Découvre les coulisses
- Priorité aux membres les plus actifs

<form name="parlios-mvp" method="POST" data-netlify="true">
  <input type="email" name="email" placeholder="Ton email" required />
  <input type="hidden" name="ref" id="refField" />
  <button>S’inscrire</button>
</form>

<script>
  try{
    const ref = localStorage.getItem('parlios_ref');
    if(ref){ document.getElementById('refField').value = ref; }
  }catch(e){}
</script>
