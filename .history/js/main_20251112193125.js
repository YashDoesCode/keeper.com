
document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.createElement('div');
  headerPlaceholder.setAttribute('id', 'header-placeholder');
  document.body.prepend(headerPlaceholder);

  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });
});
