document.addEventListener('DOMContentLoaded', function() {
  const keeperText = document.querySelector('.animated-keeper-text');
  if (keeperText) {
    anime({
      targets: keeperText,
      translateY: [50, 0], // From 50px down to its original position
      opacity: [0, 1],     // From invisible to fully visible
      easing: 'easeOutQuad',
      duration: 2000,      // 2 seconds animation
      delay: 500           // 0.5 second delay before starting
    });
  }
});