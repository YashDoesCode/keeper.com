document.addEventListener('DOMContentLoaded', () => {
<<<<<<< Updated upstream
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
=======
  const reveals = document.querySelectorAll('.feature-card');
  if (reveals.length) {
    reveals.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
>>>>>>> Stashed changes
    });
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate([
            { opacity: 0, transform: 'translateY(40px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 700, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' });
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => revObs.observe(el));
  }

  const caps = document.querySelectorAll('.cap-card');
  if (caps.length) {
    caps.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(40px)'; });
    const capObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate([
            { opacity: 0, transform: 'translateY(40px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 700, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' });
          capObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    caps.forEach(el => capObs.observe(el));
  }

  
});
