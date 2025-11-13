document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'keeperBootPlayed';
    const hasPlayed = localStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        document.body.style.opacity = '1';
        return;
    }

    // Phase 1: Blur effect on background GIF
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-backdrop-image');
    const heroContent = document.querySelector('.hero-intro');
    const heroButtons = document.querySelector('.hero-secondary-actions');
    const heroMetrics = document.querySelector('.hero-metrics');

    if (hero) {
        hero.classList.add('loading');
    }

    // Phase 2: Cinematic text animation
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.animation = 'textCinematic 1.5s ease-out forwards';
        }
        if (heroButtons) {
            heroButtons.style.animation = 'buttonCinematic 1s ease-out 0.3s forwards';
        }
        if (heroMetrics) {
            heroMetrics.style.animation = 'buttonCinematic 1s ease-out 0.6s forwards';
        }
    }, 1500);

    // Phase 3: Navigation bar expansion
    const headerContainer = document.querySelector('.header-container');
    const header = document.querySelector('.header');

    setTimeout(() => {
        if (headerContainer) {
            headerContainer.classList.add('loading');
            if (header) {
                header.style.animation = 'navExpand 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                setTimeout(() => {
                    header.style.animation = 'navWave 0.8s ease-out forwards';
                }, 600);
            }
        }
    }, 2500);

    // Phase 4: Logo and buttons fade in
    const keeperLogo = document.querySelector('.header-container img');
    const topRightButtons = document.querySelector('.top-right-buttons');

    setTimeout(() => {
        if (keeperLogo) {
            keeperLogo.style.animation = 'fadeInCinematic 0.5s ease-out forwards';
        }
        if (topRightButtons) {
            topRightButtons.style.animation = 'fadeInCinematic 0.5s ease-out 0.2s forwards';
        }
    }, 3500);

    // Remove loading classes and enable scrolling
    setTimeout(() => {
        document.body.style.overflow = '';
        if (hero) hero.classList.remove('loading');
        if (headerContainer) headerContainer.classList.remove('loading');
        localStorage.setItem(STORAGE_KEY, '1');
    }, 4000);
});

