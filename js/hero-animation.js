document.addEventListener('DOMContentLoaded', () => {
    const heroArt = document.querySelector('.hero-art img');
    if (!heroArt) return;

    const originalGifSrc = heroArt.src;
    const staticImageSrc = 'Assets/Logomark/Keeper-Rebrand.png';

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

    fetch(originalGifSrc)
        .then(resp => resp.arrayBuffer())
        .then(buf => {
            const duration = parseGifDuration(buf);
            if (duration > 0) {
                setTimeout(() => {
                    heroArt.src = staticImageSrc;
                }, duration);
            }
        })
        .catch(err => {
            console.error('Failed to load or parse hero GIF:', err);
        });
});
