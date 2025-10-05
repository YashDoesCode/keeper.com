const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => [...r.querySelectorAll(s)];
const toast = (msg) => {
  const t = qs('#toast');
  t.textContent = msg;
  t.style.opacity = 1;
  t.style.transform = 'translateY(0)';
  clearTimeout(window.__t);
  window.__t = setTimeout(() => {
    t.style.opacity = 0; t.style.transform = 'translateY(10px)';
  }, 1800);
};

(function(){
  const boot = document.getElementById('boot');
  if(!boot) return;

  const v = document.getElementById('bootVideo');
  const g = document.getElementById('bootGif');

  document.documentElement.classList.add('booting');
  document.body.classList.add('booting');

  const finish = () => {
    boot.style.opacity = 0;
    setTimeout(()=>{
      boot.remove();
      document.documentElement.classList.remove('booting');
      document.body.classList.remove('booting');
      try{ v?.pause(); }catch(e){}
    }, 520);
  };


  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish(); return;
  }


  if (v && v.getAttribute('src')) {
    v.addEventListener('loadedmetadata', () => {
      v.removeAttribute('loop');
      v.play().catch(()=>{ useGif(); });
    });
    v.addEventListener('ended', finish, {once:true}); 
    setTimeout(()=>{ if(!v.currentTime || v.paused) useGif(); }, 1000);
  } else {
    useGif();
  }

  function useGif(){
    if (!g) { finish(); return; }
    v?.parentElement && (v.style.display = 'none');
    g.style.display = 'block';
    const d = Number(g.getAttribute('data-duration') || 3.5);
    if (g.complete) setTimeout(finish, d * 1000);
    else g.addEventListener('load', () => setTimeout(finish, d * 1000), {once:true});
  }
})();

/* Year + mail link */
qs('#year').textContent = new Date().getFullYear();
const ownerEmail = document.body.dataset.ownerEmail || 'hello@example.com';
qs('#emailOwner')?.setAttribute('href', `mailto:${ownerEmail}?subject=Keeper%20Support`);

/* Download buttons toast */
qsa('.btn.dl').forEach(btn => {
  btn.addEventListener('click', () => {
    const os = btn.dataset.os || 'your platform';
    toast(`${os} build: Coming soon`);
  });
});

/* Theme toggle: swap accents */
const themeBtn = qs('#themeToggle');
let alt = false;
themeBtn?.addEventListener('click', ()=>{
  alt = !alt;
  document.documentElement.style.setProperty('--accent', alt ? '#00e0a4' : '#7a5cff');
  document.documentElement.style.setProperty('--accent-2', alt ? '#7a5cff' : '#00e0a4');
});
