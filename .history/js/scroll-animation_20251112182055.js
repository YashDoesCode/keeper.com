document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const mainContent = document.querySelector('.main-content');

  if (!hero || !mainContent) return;

  const heroHeight = hero.offsetHeight; // Height of the hero section

  // Initially position the main content below the hero
  mainContent.style.transform = `translateY(${heroHeight}px)`;
  mainContent.style.transition = 'transform 0.1s ease-out'; // Smooth transition

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Calculate the new translateY for mainContent
    // It should move from heroHeight down to 0 (relative to its initial position)
    // but accelerate.
    // When scrollY is 0, mainContent should be at heroHeight.
    // When scrollY is heroHeight, mainContent should be at 0.
    // The acceleration means it moves faster than the scroll.

    // Let's define a scroll range over which the acceleration happens.
    // For simplicity, let's say the acceleration happens over the first heroHeight of scroll.
    const scrollProgress = Math.min(1, scrollY / heroHeight); // 0 to 1

    // We want the mainContent to move from heroHeight to 0.
    // If scrollProgress is 0, translateY should be heroHeight.
    // If scrollProgress is 1, translateY should be 0.
    // To accelerate, we can use a power function or similar.
    const acceleratedProgress = Math.pow(scrollProgress, 0.7); // Adjust exponent for acceleration curve

    const translateY = heroHeight * (1 - acceleratedProgress);

    mainContent.style.transform = `translateY(${translateY}px)`;
  });
});