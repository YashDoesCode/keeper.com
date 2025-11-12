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

    const hasPlayed = sessionStorage.getItem('keeperBootPlayed');
    if (hasPlayed) {
        showHeader();
    }

    // Smooth scroll for anchor links on the same page
    const smoothScrollLinks = document.querySelectorAll('a.smooth-scroll, a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle if it's an anchor link and we're on the same page
            if (href && href.startsWith('#') && href !== '#') {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                const currentPath = window.location.pathname;
                if (targetElement && (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/'))) {
                    e.preventDefault();
                    
                    // Close mobile nav if open
                    if (mobileNav) {
                        mobileNav.classList.remove('open');
                        if (hamburgerMenu) {
                            hamburgerMenu.classList.remove('open');
                        }
                    }
                    
                    // Calculate offset for header
                    const headerHeight = document.querySelector('.header-container')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll - check for Lenis instance in scope or use native
                    setTimeout(() => {
                        if (typeof Lenis !== 'undefined' && window.lenisInstance) {
                            window.lenisInstance.scrollTo(targetElement, {
                                offset: -(headerHeight + 20),
                                duration: 1.5
                            });
                        } else {
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            }
        });
    });

    // Handle header links that should scroll to sections on homepage
    const headerLinks = document.querySelectorAll('.header .nav-link[href^="#"]');
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname;
            if (href && href.startsWith('#') && (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/'))) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header-container')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    setTimeout(() => {
                        if (typeof Lenis !== 'undefined' && window.lenisInstance) {
                            window.lenisInstance.scrollTo(targetElement, {
                                offset: -(headerHeight + 20),
                                duration: 1.5
                            });
                        } else {
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            }
        });
    });
});
