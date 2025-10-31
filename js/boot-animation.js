document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.createElement('div');
    bootScreen.className = 'boot-screen';
    
    const logo = document.createElement('img');
    logo.src = 'Assets/Logomark/Keeper-Rebrand.png';
    logo.alt = 'Keeper';
    logo.className = 'boot-logo';
    bootScreen.appendChild(logo);
    
    document.body.appendChild(bootScreen);
    
    const mainContent = document.querySelector('.main-content');
    mainContent.style.visibility = 'hidden';
    
    const bootDuration = 1500;
    
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        mainContent.style.visibility = 'visible';
        mainContent.classList.add('visible');
        
        setTimeout(() => {
            bootScreen.remove();
        }, 300);
    }, bootDuration);
    
    sessionStorage.setItem('hasLoaded', 'true');
});