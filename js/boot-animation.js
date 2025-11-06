document.addEventListener('DOMContentLoaded', () => {
    const GIF_PATH = 'Assets/Logomark/Keeper-Hover Metal Animation.gif';
    const STORAGE_KEY = 'keeperBootPlayed';
    const ANIMATION_DURATION = 2500; // ms

    const hasPlayed = sessionStorage.getItem(STORAGE_KEY);

    if (hasPlayed) {
        return; // Don't play the animation again in this session
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
        window.headerLoaded.then(header => {
            header.classList.remove('hidden');
        });
        setTimeout(() => {
            bootScreen.remove();
        }, 500); // Corresponds to the transition duration in style.css
    }, ANIMATION_DURATION);

    sessionStorage.setItem(STORAGE_KEY, '1');
});