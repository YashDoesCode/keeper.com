const headerState = { bound: false };

function smoothScrollToElement(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    const headerHeight = document.querySelector('.header-container')?.offsetHeight || 0;
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (mobileNav) mobileNav.classList.remove('open');
    if (hamburgerMenu) hamburgerMenu.classList.remove('open');
    const offset = -headerHeight - 20;
    if (window.smoothScrollInstance) window.smoothScrollInstance.scrollToElement(targetElement, offset);
}

function isHomePage() {
  const currentPath = window.location.pathname;
  return currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath.includes('index.html');
}

function bindHeaderInteractions() {
  if (headerState.bound) return;
  const header = document.querySelector('.header');
  if (!header) return;
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburgerMenu && mobileNav) {
    hamburgerMenu.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      hamburgerMenu.classList.toggle('open');
    });
  }
  document.querySelectorAll('a.smooth-scroll, a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        if (isHomePage()) {
          event.preventDefault();
          const targetId = href.substring(1);
          smoothScrollToElement(targetId);
        } else {
          event.preventDefault();
          window.location.href = 'index.html' + href;
        }
      }
    });
  });
  document.querySelectorAll('.header .nav-link[href^="#"], .mobile-nav .nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        if (isHomePage()) {
          event.preventDefault();
          const targetId = href.substring(1);
          smoothScrollToElement(targetId);
        } else {
          event.preventDefault();
          window.location.href = 'index.html' + href;
          setTimeout(() => {
            const targetId = href.substring(1);
            smoothScrollToElement(targetId);
          }, 100);
        }
      }
    });
  });
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', event => {
        event.preventDefault();
<<<<<<< Updated upstream
        item.classList.toggle('open');
      });
    }
  });
=======
        const dropdown = item.querySelector('.dropdown');
        const backdrop = document.querySelector('.nav-backdrop');
        const opened = item.classList.toggle('open');
        document.querySelectorAll('.has-dropdown').forEach(i=>{ if(i!==item) i.classList.remove('open'); });
        if (dropdown) {
          if (opened) {
            const r = item.getBoundingClientRect();
            dropdown.classList.add('floating');
            dropdown.style.top = Math.round(r.bottom + 8) + 'px';
            dropdown.style.left = Math.round(r.left + r.width/2 - dropdown.offsetWidth/2) + 'px';
          } else {
            dropdown.classList.remove('floating');
            dropdown.style.top = dropdown.style.left = '';
          }
        }
        if (backdrop) backdrop.classList.toggle('show', opened);
      });
    }
  });
  document.querySelector('.nav-backdrop')?.addEventListener('click', ()=>{
    document.querySelectorAll('.has-dropdown').forEach(i=>i.classList.remove('open'));
    document.querySelector('.nav-backdrop')?.classList.remove('show');
  });
  const closeDropdowns=()=>{
    document.querySelectorAll('.has-dropdown').forEach(i=>{
      i.classList.remove('open');
      const d=i.querySelector('.dropdown');
      if(d){d.classList.remove('floating');d.style.top='';d.style.left='';}
    });
    document.querySelector('.nav-backdrop')?.classList.remove('show');
  };
  window.addEventListener('scroll', closeDropdowns, { passive:true });
  window.addEventListener('resize', closeDropdowns);
>>>>>>> Stashed changes
  headerState.bound = true;
}

if (document.readyState !== 'loading') {
  bindHeaderInteractions();
}

document.addEventListener('headerLoaded', bindHeaderInteractions);