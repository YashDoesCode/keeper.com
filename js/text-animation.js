document.addEventListener('DOMContentLoaded', () => {
  // Wrap every letter in a span
  var textWrapper = document.querySelector('.hero-content h1');
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.hero-content h1 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
      }).add({
        targets: '.hero-content .subtitle, .hero-content .cta-buttons',
        opacity: [0,1],
        translateY: [20, 0],
        easing: "easeOutExpo",
        duration: 1000,
        offset: '-=1000' // Starts 1s before the previous animation ends
      });
  }
});
