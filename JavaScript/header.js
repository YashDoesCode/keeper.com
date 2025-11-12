function showHeader() {
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = 1;
        header.style.pointerEvents = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });
    }

    const hasPlayed = localStorage.getItem('keeperBootPlayed');
    if (hasPlayed) {
        showHeader();
    }

    function smoothScrollToElement(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const headerHeight = document.querySelector('.header-container')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        if (mobileNav) {
            mobileNav.classList.remove('open');
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('open');
            }
        }

        if (typeof Lenis !== 'undefined' && window.lenisInstance) {
            window.lenisInstance.scrollTo(targetElement, {
                offset: -(headerHeight + 20),
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    function isHomePage() {
        const currentPath = window.location.pathname;
        return currentPath === '/index.html' || currentPath === '/' || 
               currentPath.endsWith('index.html') || currentPath.endsWith('/') ||
               currentPath.includes('index.html');
    }

    document.querySelectorAll('a.smooth-scroll, a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                if (isHomePage()) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    smoothScrollToElement(targetId);
                } else if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    window.location.href = 'index.html' + href;
                }
            }
        });
    });

    document.querySelectorAll('.header .nav-link[href^="#"], .mobile-nav .nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                if (isHomePage()) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    smoothScrollToElement(targetId);
                } else {
                    e.preventDefault();
                    window.location.href = 'index.html' + href;
                    setTimeout(() => {
                        const targetId = href.substring(1);
                        smoothScrollToElement(targetId);
                    }, 100);
                }
            }
        });
    });

    document.querySelectorAll('.has-dropdown').forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
});

