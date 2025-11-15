
document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.createElement('div');
  headerPlaceholder.setAttribute('id', 'header-placeholder');
  document.body.prepend(headerPlaceholder);

  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailField = document.getElementById('newsletterEmail');
      const email = emailField?.value.trim();
      if (!email) return;
      localStorage.setItem('newsletter_subscribed', 'true');
      localStorage.setItem('newsletter_email', email);
      window.location.href = 'newsletter-subscribed.html';
    });
  }

  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          el.setAttribute('src', el.getAttribute('data-src'));
          el.removeAttribute('data-src');
          io.unobserve(el);
        }
      })
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => io.observe(img));
  }
});
