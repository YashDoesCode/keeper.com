document.addEventListener('DOMContentLoaded', () => {
    const GIF_PATH = 'Assets/Logomark/Keeper-Hover Metal Animation.gif';
    const STORAGE_KEY = 'keeperBootPlayed';
    const ANIMATION_DURATION = 2500; 

    const hasPlayed = sessionStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        return; 
    }

    const bootScreen = document.createElement('div');
    bootScreen.id = 'boot';
    const logo = document.createElement('img');
    logo.className = 'boot-media';
    logo.src = GIF_PATH;
    logo.alt = 'Keeper';
    bootScreen.appendChild(logo);
    document.body.appendChild(bootScreen);

    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        if (typeof showHeader === 'function') {
            showHeader();
        }
        setTimeout(() => {
            bootScreen.remove();
        }, 500); 
    }, ANIMATION_DURATION);

    sessionStorage.setItem(STORAGE_KEY, '1');
});
