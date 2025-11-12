document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  if (video) {
    video.onended = () => {
      video.pause();
    };
  }
});

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


qs('#year').textContent = new Date().getFullYear();
const ownerEmail = document.body.dataset.ownerEmail || 'hello@example.com';
qs('#emailOwner')?.setAttribute('href', `mailto:${ownerEmail}?subject=Keeper%20Support`);


qsa('.btn.dl').forEach(btn => {
  btn.addEventListener('click', () => {
    const os = btn.dataset.os || 'your platform';
    toast(`${os} build: Coming soon`);
  });
});


const themeBtn = qs('#themeToggle');
let alt = false;
themeBtn?.addEventListener('click', ()=>{
  alt = !alt;
  document.documentElement.style.setProperty('--accent', alt ? '#00e0a4' : '#7a5cff');
  document.documentElement.style.setProperty('--accent-2', alt ? '#7a5cff' : '#00e0a4');
});