

document.addEventListener('DOMContentLoaded', () => {
    const GIF_PATH = 'Assets/Logomark/Keeper Animation GIF (last-out).gif';
    const STORAGE_KEY = 'keeperBootPlayed';
    const FALLBACK_MS = 2500; 

        
        const urlParams = new URLSearchParams(window.location.search);
        const forcePlay = urlParams.get('boot') === '1' || urlParams.get('replayBoot') === '1' || urlParams.get('forceBoot') === '1';

        
        try {
            if (!forcePlay && localStorage.getItem(STORAGE_KEY) === '1') return;
            
            if (forcePlay) {
                try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
            }
        } catch (e) {
            
        }

    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    
    const bootScreen = document.createElement('div');
    bootScreen.className = 'boot-screen';
    const logo = document.createElement('img');
    logo.className = 'boot-logo';
    logo.src = GIF_PATH;
    logo.alt = 'Keeper';
    bootScreen.appendChild(logo);
    document.body.appendChild(bootScreen);
    
    mainContent.style.visibility = 'hidden';

    
    function parseGifDuration(buffer) {
        try {
            const bytes = new Uint8Array(buffer);
            let i = 0;
            const len = bytes.length;
            let totalDelayCentiseconds = 0;

            
            i = 13;
            
            const gctFlag = (bytes[10] & 0x80) !== 0;
            if (gctFlag) {
                const gctSize = 3 * Math.pow(2, (bytes[10] & 0x07) + 1);
                i += gctSize;
            }

            while (i < len) {
                const blockId = bytes[i];
                if (blockId === 0x21 && bytes[i + 1] === 0xF9) {
                    
                    
                    const delayLo = bytes[i + 4];
                    const delayHi = bytes[i + 5];
                    const delay = delayLo + (delayHi << 8); 
                    totalDelayCentiseconds += delay;
                    i += 8; 
                } else if (blockId === 0x2C) {
                    
                    
                    i += 9 + 1; 
                    const lctFlag = (bytes[i - 1] & 0x80) !== 0;
                    if (lctFlag) {
                        const lctSize = 3 * Math.pow(2, (bytes[i - 1] & 0x07) + 1);
                        i += lctSize;
                    }
                    
                    i += 1;
                    
                    while (i < len) {
                        const blockLen = bytes[i];
                        i += 1;
                        if (blockLen === 0) break;
                        i += blockLen;
                    }
                } else if (blockId === 0x3B) {
                    
                    break;
                } else if (blockId === 0x21) {
                    
                    const label = bytes[i + 1];
                    i += 2;
                    
                    while (i < len) {
                        const blockLen = bytes[i];
                        i += 1;
                        if (blockLen === 0) break;
                        i += blockLen;
                    }
                } else {
                    i += 1;
                }
            }

            
            if (totalDelayCentiseconds === 0) return 0;
            return totalDelayCentiseconds * 10; 
        } catch (err) {
            return 0;
        }
    }

    
    fetch(GIF_PATH).then(resp => resp.arrayBuffer()).then(buf => {
        const dur = parseGifDuration(buf) || FALLBACK_MS;
        
        const playMs = Math.max(dur, 800);

        
        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            mainContent.style.visibility = 'visible';
            mainContent.classList.add('visible');
            setTimeout(() => {
                bootScreen.remove();
            }, 360);

            try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
        }, playMs);
    }).catch(err => {
        
        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            mainContent.style.visibility = 'visible';
            mainContent.classList.add('visible');
            setTimeout(() => bootScreen.remove(), 360);
            try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
        }, FALLBACK_MS);
    });
});