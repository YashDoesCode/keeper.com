document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'keeperBootPlayed';
    const hasPlayed = localStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        document.body.style.opacity = '1';
        document.querySelectorAll('.boot-hidden').forEach(el => el.classList.remove('boot-hidden'));
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.classList.add('content-arrived');
        return;
    }

    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-backdrop-image');
    const heroContent = document.querySelector('.hero-intro');
    const heroButtons = document.querySelector('.hero-secondary-actions');
    const heroMetrics = document.querySelector('.hero-metrics');

    if (hero) {
        hero.classList.add('loading');
    }

    setTimeout(() => {
        if (heroContent) {
            heroContent.classList.remove('boot-hidden');
            heroContent.style.animation = 'textCinematic 1.5s ease-out forwards';
        }
        if (heroButtons) {
            heroButtons.classList.remove('boot-hidden');
            heroButtons.style.animation = 'buttonCinematic 1s ease-out 0.3s forwards';
        }
        if (heroMetrics) {
            heroMetrics.classList.remove('boot-hidden');
            heroMetrics.style.animation = 'buttonCinematic 1s ease-out 0.6s forwards';
        }
    }, 2000);

    const headerContainer = document.querySelector('.header-container');
    const header = document.querySelector('.header');

    setTimeout(() => {
        if (headerContainer) {
            headerContainer.classList.remove('boot-hidden');
            headerContainer.classList.add('loading');
            if (header) {
                header.style.animation = 'navSlideIn 2s ease-out forwards';
            }
        }
    }, 3500);

    const keeperLogo = document.querySelector('.header-container img');
    const topRightButtons = document.querySelector('.top-right-buttons');

    setTimeout(() => {
        if (keeperLogo) {
            keeperLogo.classList.remove('boot-hidden');
            keeperLogo.style.animation = 'fadeInCinematic 0.5s ease-out forwards';
        }
        if (topRightButtons) {
            topRightButtons.classList.remove('boot-hidden');
            topRightButtons.style.animation = 'fadeInCinematic 0.5s ease-out 0.2s forwards';
        }
    }, 4500);

    setTimeout(() => {
        document.body.style.overflow = '';
        if (hero) hero.classList.remove('loading');
        if (headerContainer) headerContainer.classList.remove('loading');
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.classList.add('content-arrived');
        localStorage.setItem(STORAGE_KEY, '1');
    }, 6000);
});

