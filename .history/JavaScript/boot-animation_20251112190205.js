document.addEventListener('DOMContentLoaded', () => {
    const GIF_PATH = 'Assets/Logomark/Keeper-Hover Metal Animation.gif';
    const STORAGE_KEY = 'keeperBootPlayed';
    const ANIMATION_DURATION = 3500;

    const hasPlayed = localStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        document.body.style.opacity = '1';
        if (typeof showHeader === 'function') {
            showHeader();
        }
        return;
    }

    const bootScreen = document.createElement('div');
    bootScreen.id = 'boot-screen';
    bootScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.8s ease-out;
    `;
    
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    `;
    
    const logo = document.createElement('img');
    logo.className = 'boot-media';
    logo.src = GIF_PATH;
    logo.alt = 'Keeper';
    logo.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        width: auto;
        height: auto;
        object-fit: contain;
        animation: fadeInBoot 0.5s ease-in;
    `;
    
    logoContainer.appendChild(logo);
    bootScreen.appendChild(logoContainer);
    document.body.appendChild(bootScreen);
    document.body.style.overflow = 'hidden';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInBoot {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        #boot-screen {
            pointer-events: all;
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        bootScreen.style.opacity = '0';
        document.body.style.overflow = '';
        if (typeof showHeader === 'function') {
            showHeader();
        }
        setTimeout(() => {
            bootScreen.remove();
            style.remove();
            localStorage.setItem(STORAGE_KEY, '1');
        }, 800);
    }, ANIMATION_DURATION);
});

