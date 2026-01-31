(function(){
  const $ = (sel) => document.querySelector(sel);

  // Active nav highlight
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href').toLowerCase() === path) a.classList.add('active');
  });

  // Toast helper
  function toast(title, msg){
    const t = $('#toast');
    if(!t) return;
    t.innerHTML = `<strong>${title}</strong><div>${msg}</div>`;
    t.style.display = 'block';
    setTimeout(()=> t.style.display='none', 3500);
  }
  window.__toast = toast;

  // Shoe value estimator
  const form = $('#valueForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const brand = $('#brand').value;
      const type = $('#type').value;
      const cond = $('#condition').value;
      const box = $('#box').value;
      const hype = $('#hype').value;

      const brandBoost = {
        "Jordan":[120,360],
        "Nike":[80,240],
        "Adidas":[60,190],
        "New Balance":[70,220],
        "Yeezy":[150,430],
        "Other":[35,150]
      }[brand] || [40,120];

      const typeBoost = {
        "Retro / Classic":[25,90],
        "Performance (running/bball)":[10,70],
        "Designer / Collab":[90,260],
        "Slides / Sandals":[-15,25]
      }[type] || [0,0];

      let baseLow = brandBoost[0] + typeBoost[0];
      let baseHigh = brandBoost[1] + typeBoost[1];

      const condMult = {
        "Deadstock (New)":1.00,
        "Like New":0.86,
        "Gently Used":0.72,
        "Used":0.56,
        "Heavily Worn":0.36
      }[cond] || 0.65;

      const boxAdj = (box === "Yes") ? 1.05 : 0.95;
      const hypeAdj = {
        "Standard":1.0,
        "High Demand":1.15,
        "Grailed / Rare":1.35
      }[hype] || 1.0;

      let low = Math.round(baseLow * condMult * boxAdj * hypeAdj);
      let high = Math.round(baseHigh * condMult * boxAdj * hypeAdj);
      low = Math.max(15, low);
      high = Math.max(low + 20, high);

      const out = $('#valueOutput');
      if(out){
        out.innerHTML = `
          <div class="card" style="padding:14px;margin-top:12px">
            <div class="kicker">Estimated Trade / Cash Offer Range</div>
            <div style="font-size:34px;font-weight:950;margin:10px 0 4px">$${low} – $${high}</div>
            <div class="note">Estimate only. Final offer depends on photos, authenticity checks, and current demand.</div>
          </div>
        `;
      }
      toast("Estimate ready ✅", "Scroll down and send photos for a real offer.");
      const lead = $('#sellLead');
      if(lead) lead.scrollIntoView({behavior:"smooth", block:"start"});
    });
  }

  // Netlify forms UX
  document.querySelectorAll('form[data-toast]').forEach(f=>{
    f.addEventListener('submit', ()=>{
      toast("Sent ✅", "Your message was submitted. We’ll reply ASAP.");
    });
  });
})();

  
     
    
