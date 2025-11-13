document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-intro h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        anime({
          targets: heroTitle,
          textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 30px rgba(255,255,255,1)'],
          duration: 1000,
          easing: 'easeInOutQuad'
        });
      }
    };
    setTimeout(typeWriter, 500);
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    anime({
      targets: heroSubtitle,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 2000
    });
  }

  const heroActions = document.querySelector('.hero-secondary-actions');
  if (heroActions) {
    const buttons = heroActions.querySelectorAll('a');
    anime({
      targets: buttons[0],
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 3000
    });
    anime({
      targets: buttons[1],
      translateX: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 3200
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form-inline');
  if (newsletterForm) {
    anime({
      targets: newsletterForm,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutBounce',
      delay: 4000
    });
  }

  const waitlistForm = document.querySelector('.waitlist-inline');
  if (waitlistForm) {
    anime({
      targets: waitlistForm,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 2500
    });
  }

  const heroMetrics = document.querySelector('.hero-metrics');
  if (heroMetrics) {
    const metrics = heroMetrics.querySelectorAll('.metric');
    anime({
      targets: metrics,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200, {start: 3500}),
      duration: 600,
      easing: 'easeOutQuad'
    });
  }
});
