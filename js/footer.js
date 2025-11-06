fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
        document.getElementById('year').textContent = new Date().getFullYear();
    });