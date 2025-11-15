function waitForHeader() {
  if (document.querySelector('.header')) return Promise.resolve();
  return new Promise(resolve => document.addEventListener('headerLoaded', resolve, { once: true }));
}

function seq(target, keyframes, options) {
  if (!target) return Promise.resolve();
  const opts = Object.assign({ fill: 'forwards' }, options || {});
  const anim = target.animate(keyframes, opts);
  return anim.finished.catch(() => {});
}

function stagger(elements, build, baseDelay, gap) {
  const tasks = [];
  elements.forEach((el, i) => tasks.push(seq(el, build(el), { delay: baseDelay + i * gap, duration: 260, easing: 'cubic-bezier(.22,.61,.36,1)' })));
  return Promise.all(tasks);
}

function animateHeader() {
  const headerContainer = document.querySelector('.header-container');
  const headerCore = document.querySelector('[data-boot-nav-core]');
  const navWave = document.querySelector('.nav-wave');
  const navLinks = [...document.querySelectorAll('.header .nav-link')];
  const navActions = [...document.querySelectorAll('.header .hamburger-menu')];
  const keeperLogo = document.querySelector('[data-boot-logo]');
  const topRightButtons = document.querySelector('[data-boot-actions]');
  if (!headerContainer || !headerCore) return;

  headerContainer.style.willChange = 'transform, opacity';
  headerCore.style.willChange = 'transform, opacity';
  if (navWave) navWave.style.willChange = 'transform, opacity';
  navLinks.forEach(l => l.style.willChange = 'transform, opacity');
  navActions.forEach(a => a.style.willChange = 'transform, opacity');

  const start = [
    seq(headerContainer, [
      { opacity: 0, transform: 'translateY(-120%) scale(1)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 620, easing: 'cubic-bezier(.22,.61,.36,1)' }),
    seq(headerCore, [
      { opacity: 0, transform: 'scaleX(.4)' },
      { opacity: 1, transform: 'scaleX(1)' }
    ], { duration: 420, easing: 'cubic-bezier(.22,.61,.36,1)', delay: 180 })
  ];

  Promise.all(start).then(() => {
    if (navWave) seq(navWave, [
      { opacity: 0, transform: 'scaleX(0)' },
      { opacity: 1, transform: 'scaleX(1)' },
      { opacity: 0, transform: 'scaleX(1)' }
    ], { duration: 420, easing: 'ease-out' });

    if (navLinks.length) {
      const centerIndex = Math.floor((navLinks.length - 1) / 2);
      const groups = [[navLinks[centerIndex]]];
      for (let o = 1; o <= navLinks.length; o += 1) {
        const left = navLinks[centerIndex - o];
        const right = navLinks[centerIndex + o];
        const g = [];
        if (left) g.push(left);
        if (right) g.push(right);
        if (g.length) groups.push(g);
      }
      groups.forEach((g, idx) => {
        g.forEach(el => seq(el, [
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 260, easing: 'cubic-bezier(.22,.61,.36,1)', delay: 460 + idx * 140 }));
      });
    }

    if (navActions.length) {
      stagger(navActions, () => ([
        { opacity: 0, transform: 'translateY(-8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ]), 640, 60);
    }

    const extras = [keeperLogo, topRightButtons].filter(Boolean);
    if (extras.length) {
      stagger(extras, () => ([
        { opacity: 0, transform: 'translateY(-6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ]), 820, 90);
    }
  }).finally(() => {
    headerContainer.style.willChange = '';
    headerCore.style.willChange = '';
    if (navWave) navWave.style.willChange = '';
    navLinks.forEach(l => l.style.willChange = '');
    navActions.forEach(a => a.style.willChange = '');
    headerContainer.style.pointerEvents = 'auto';
    headerCore.style.pointerEvents = 'auto';
    if (keeperLogo) keeperLogo.style.pointerEvents = 'auto';
    if (topRightButtons) topRightButtons.style.pointerEvents = 'auto';
    headerContainer.style.opacity = '1';
    headerCore.style.opacity = '1';
    if (keeperLogo) keeperLogo.style.opacity = '1';
    if (topRightButtons) topRightButtons.style.opacity = '1';
  });
}

function startBootSequence() {
  const isHomePage = location.pathname.endsWith('/') || location.pathname.endsWith('index.html');
  if (isHomePage) {
    const heroIntro = document.querySelector('.hero-intro');
    const waitlistForm = document.querySelector('.waitlist-inline');
    const heroMetrics = document.querySelector('.hero-metrics');
    const mainContent = document.querySelector('.main-content');
    const heroSubtitle = document.querySelector('.hero-subtitle-section');

    setTimeout(() => {
      if (heroIntro) { heroIntro.style.opacity = 1; heroIntro.style.transform = 'translateY(0)'; heroIntro.style.pointerEvents = 'auto'; }
      if (waitlistForm) { waitlistForm.style.opacity = 1; waitlistForm.style.transform = 'translateY(0)'; waitlistForm.style.pointerEvents = 'auto'; }
      if (heroMetrics) { heroMetrics.style.opacity = 1; heroMetrics.style.transform = 'translateY(0)'; heroMetrics.style.pointerEvents = 'auto'; }
      if (heroSubtitle) { heroSubtitle.style.opacity = 1; heroSubtitle.style.transform = 'translateY(0)'; heroSubtitle.style.pointerEvents = 'auto'; }
      if (mainContent) { mainContent.style.opacity = 1; mainContent.classList.add('content-arrived'); }
      animateHeader();
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  waitForHeader().then(startBootSequence);
});

(function(){
  const app = document.getElementById('app');
  if (!app) return;
  app.style.visibility = 'visible';
})();
