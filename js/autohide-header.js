
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header') || document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { 
      if (window.scrollY > lastScrollY) {
        
        header.classList.add('hidden');
      } else {
        
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

  window.addEventListener('mousemove', (e) => {
    if (e.clientY < 100) {
      header.classList.remove('hidden');
    }
  });
});
