document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'keeperBootPlayed';

    const hasPlayed = localStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        document.body.style.opacity = '1';
        return;
    }

    const hero = document.querySelector('.hero');
    const headerContainer = document.querySelector('.header-container');

    if (hero) {
        hero.classList.add('loading');
    }
    if (headerContainer) {
        headerContainer.classList.add('loading');
    }

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.body.style.overflow = '';
        localStorage.setItem(STORAGE_KEY, '1');
    }, 2500);
});

