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

            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop) {
                    // Scroll Down
                    header.classList.add('hidden');
                } else {
                    // Scroll Up
                    header.classList.remove('hidden');
                }
                lastScrollTop = scrollTop;
            });

            resolve(header);
        });
});