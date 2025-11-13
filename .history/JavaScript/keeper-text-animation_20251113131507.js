document.addEventListener('DOMContentLoaded', function() {
  const keeperText = document.querySelector('.animated-keeper-text');
  if (keeperText) {
    anime({
      targets: keeperText,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 2000,
      delay: 500
    });
  }
});