document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(response => response.text())
    .then(markup => {
      document.body.insertAdjacentHTML('afterbegin', markup);
      document.dispatchEvent(new CustomEvent('headerLoaded'));
    });
});

