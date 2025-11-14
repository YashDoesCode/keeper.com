document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const mainContent = document.querySelector('.main-content');
  if (!hero || !mainContent) return;

  let sequenceTriggered = false;

  const enableScroll = () => {
    if (window.smoothScrollInstance) {
      window.smoothScrollInstance.isScrolling = false;
    }
  };

  const disableScroll = () => {
    if (window.smoothScrollInstance) {
      window.smoothScrollInstance.isScrolling = true;
    }
  };

  const runSequence = () => {
    if (sequenceTriggered) return;
    sequenceTriggered = true;
    disableScroll();
    hero.classList.add('hero-motion');
    requestAnimationFrame(() => {
      mainContent.classList.add('content-arrived');
    });
    setTimeout(() => {
      hero.classList.remove('hero-motion');
      enableScroll();
    }, 1100);
  };

  const wheelHandler = (event) => {
    if (sequenceTriggered) return;
    if (event.deltaY > 0) {
      event.preventDefault();
      runSequence();
    }
  };

  const touchHandler = () => {
    runSequence();
  };

  hero.addEventListener('wheel', wheelHandler, { passive: false });
  hero.addEventListener('touchmove', touchHandler, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      runSequence();
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!sequenceTriggered && entry.intersectionRatio < 0.6) runSequence();
    });
  }, { threshold: 0.6 });

  observer.observe(hero);

  if (window.scrollY > hero.offsetHeight * 0.6) {
    runSequence();
  }

  setTimeout(() => {
    if (!sequenceTriggered) runSequence();
  }, 8000);
});
