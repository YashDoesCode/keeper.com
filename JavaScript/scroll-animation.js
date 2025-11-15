document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.feature-card');
  if (reveals.length) {
    reveals.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
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
