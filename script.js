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


const ownerEmail = document.body.dataset.ownerEmail || 'hello@example.com';
qs('#emailOwner')?.setAttribute('href', `mailto:${ownerEmail}?subject=Keeper%20Support`);

const footerYear = qs('#year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}


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

document.addEventListener('DOMContentLoaded', () => {
  const variants = ['pulse', 'halo', 'glimmer', 'flare', 'ripple'];
  let variantIndex = 0;
  qsa('.btn.glass').forEach(btn => {
    if (!btn.dataset.variant) {
      btn.dataset.variant = variants[variantIndex % variants.length];
      variantIndex += 1;
    }
  });

  const waitlistDrawer = qs('#waitlistDrawer');
  const waitlistClose = qs('#waitlistClose');
  const waitlistForm = qs('#waitlistForm');
  const waitlistInlineForm = qs('#waitlistInlineForm');
  const waitlistInlineEmail = qs('#waitlistInlineEmail');

  const toggleWaitlist = (show) => {
    if (!waitlistDrawer) return;
    if (show) {
      waitlistDrawer.hidden = false;
      document.body.classList.add('waitlist-open');
      requestAnimationFrame(() => {
        waitlistDrawer.style.opacity = '1';
      });
    } else {
      waitlistDrawer.style.opacity = '0';
      setTimeout(() => {
        waitlistDrawer.hidden = true;
      }, 280);
      document.body.classList.remove('waitlist-open');
    }
  };

  waitlistClose?.addEventListener('click', () => toggleWaitlist(false));
  waitlistDrawer?.addEventListener('click', (event) => {
    if (event.target === waitlistDrawer) toggleWaitlist(false);
  });

  waitlistForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = qs('#waitlistEmail').value.trim();
    const focus = qs('#waitlistUseCase').value;
    if (!email) return;
    localStorage.setItem('keeper_waitlist_email', email);
    localStorage.setItem('keeper_waitlist_focus', focus || '');
    toggleWaitlist(false);
    toast('You are locked in for early access. Watch your inbox.');
  });

  waitlistInlineForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = waitlistInlineEmail.value.trim();
    if (!email) {
      toast('Enter an email so we can notify you first.');
      return;
    }
    localStorage.setItem('keeper_waitlist_email', email);
    localStorage.setItem('keeper_waitlist_focus', 'inline');
    waitlistInlineForm.reset();
    toast('You are locked in for early access. Watch your inbox.');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleWaitlist(false);
  });

  const partnerCarousels = qsa('.partners-carousel');

  partnerCarousels.forEach(carousel => {
    const tracks = qsa('.partners-track', carousel);
    if (!tracks.length) return;

    const states = tracks.map(track => {
      const baseline = track.scrollWidth;
      const items = [...track.children];
      while (track.scrollWidth < baseline * 3) {
        items.forEach(node => track.appendChild(node.cloneNode(true)));
      }
      const direction = track.dataset.direction === 'reverse' ? 1 : -1;
      const speed = parseFloat(track.dataset.speed || '0.24');
      const initialOffset = direction === 1 ? -baseline : 0;
      track.style.transform = `translateX(${initialOffset}px)`;
      return {
        track,
        baseline,
        speed,
        direction,
        offset: initialOffset
      };
    });

    let playing = false;
    let hoverPause = false;
    let rafId = null;
    let startTimeout = null;

    const step = () => {
      if (!playing) return;
      states.forEach(state => {
        state.offset += state.speed * state.direction;
        if (state.direction === -1 && state.offset <= -state.baseline) {
          state.offset = 0;
        }
        if (state.direction === 1 && state.offset >= 0) {
          state.offset = -state.baseline;
        }
        state.track.style.transform = `translateX(${state.offset}px)`;
      });
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (!playing || hoverPause) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(step);
    };

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target !== carousel) return;
        if (entry.isIntersecting) {
          playing = true;
          clearTimeout(startTimeout);
          startTimeout = setTimeout(start, 420);
        } else {
          playing = false;
          clearTimeout(startTimeout);
          stop();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(carousel);

    carousel.addEventListener('mouseenter', () => {
      hoverPause = true;
      stop();
    });

    carousel.addEventListener('mouseleave', () => {
      if (!hoverPause) return;
      hoverPause = false;
      if (playing) {
        clearTimeout(startTimeout);
        startTimeout = setTimeout(start, 220);
      }
    });
  });
});