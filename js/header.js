window.headerLoaded = new Promise(resolve => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            const header = document.querySelector('.header');
            const hasPlayed = sessionStorage.getItem('keeperBootPlayed');
            if (hasPlayed) {
                header.classList.remove('hidden');
            }
            resolve(header);
        });
});