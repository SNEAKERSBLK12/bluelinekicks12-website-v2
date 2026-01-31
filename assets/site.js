(function(){
  const $ = (sel) => document.querySelector(sel);

  // Active nav highlight
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href').toLowerCase() === path) a.classList.add('active');
  });

  // Mobile nav (only if you later add hamburger markup)
  const hamb = $('#hamburger');
  const links = $('#navlinks');
  if(hamb && links){
    hamb.addEventListener('click', ()=> links.classList.toggle('open'));
  }
})();

