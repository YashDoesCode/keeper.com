
document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSpecialChars = document.getElementById('includeSpecialChars');
    const minNumbers = document.getElementById('minNumbers');
    const minSpecialChars = document.getElementById('minSpecialChars');
    const ambiguityFree = document.getElementById('ambiguityFree');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const strengthText = document.getElementById('strengthText');
    const crackTimeText = document.getElementById('crackTime');
    const passwordHistory = document.getElementById('passwordHistory');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    const storageKey = 'keeperSentinelPasswordHistory';
    const chars = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        ambiguous: 'l1IO0',
    };

    let history = JSON.parse(localStorage.getItem(storageKey) || '[]');

    const controls = [
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSpecialChars,
        ambiguityFree,
        minNumbers,
        minSpecialChars,
    ];

    controls.forEach(control => {
        const eventType = control.type === 'number' ? 'input' : 'change';
        control.addEventListener(eventType, generatePassword);
    });

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword();
    });

    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);
    clearHistoryBtn.addEventListener('click', clearHistory);

    passwordHistory.addEventListener('click', event => {
        const target = event.target;
        if (target.dataset.action === 'copy') {
            copyFromHistory(target.dataset.password);
        } else if (target.dataset.action === 'use') {
            useFromHistory(target.dataset.password);
        } else if (target.dataset.action === 'remove') {
            removeFromHistory(target.dataset.password);
        }
    });

    function generatePassword() {
        let charset = '';
        if (includeUppercase.checked) charset += chars.uppercase;
        if (includeLowercase.checked) charset += chars.lowercase;
        if (includeNumbers.checked) charset += chars.numbers;
        if (includeSpecialChars.checked) charset += chars.special;

        if (ambiguityFree.checked) {
            charset = charset.split('').filter(char => !chars.ambiguous.includes(char)).join('');
        }

        if (!charset) {
            passwordDisplay.value = 'Select at least one character set';
            strengthIndicator.style.width = '0%';
            strengthText.textContent = 'Weak';
            crackTimeText.textContent = 'Unavailable';
            return;
        }

        let password = '';
        const passwordLength = parseInt(lengthSlider.value, 10);
        const minNums = parseInt(minNumbers.value, 10);
        const minSpecs = parseInt(minSpecialChars.value, 10);

        for (let i = 0; i < minNums; i++) {
            password += chars.numbers.charAt(Math.floor(Math.random() * chars.numbers.length));
        }

        for (let i = 0; i < minSpecs; i++) {
            password += chars.special.charAt(Math.floor(Math.random() * chars.special.length));
        }

        for (let i = password.length; i < passwordLength; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        passwordDisplay.value = password;
        addToHistory(password);
        updateStrengthIndicator(password);
        calculateCrackTime(password, charset.length);
    }

    function copyToClipboard() {
        const pass = passwordDisplay.value;
        if (!pass || pass === 'Select at least one character set') {
            generatePassword();
            return;
        }
        navigator.clipboard.writeText(pass).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 2000);
        });
    }

    function updateStrengthIndicator(password) {
        const length = password.length;
        let strength = 0;
        if (length >= 8) strength++;
        if (length >= 12) strength++;
        if (length >= 16) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const percentage = Math.min(strength / 6, 1) * 100;
        strengthIndicator.style.width = percentage + '%';

        if (strength <= 2) {
            strengthText.textContent = 'Weak';
            strengthIndicator.style.backgroundColor = '#ff4d4f';
        } else if (strength <= 4) {
            strengthText.textContent = 'Medium';
            strengthIndicator.style.backgroundColor = '#ffa940';
        } else {
            strengthText.textContent = 'Strong';
            strengthIndicator.style.backgroundColor = '#52c41a';
        }
    }

    function calculateCrackTime(password, charsetSize) {
        if (!password) {
            crackTimeText.textContent = 'Unavailable';
            return;
        }
        const combinations = Math.pow(charsetSize, password.length);
        const guessesPerSecond = 1e9;
        const seconds = combinations / guessesPerSecond;
        if (seconds < 60) {
            crackTimeText.textContent = '< 1 minute';
        } else if (seconds < 3600) {
            crackTimeText.textContent = Math.round(seconds / 60) + ' minutes';
        } else if (seconds < 86400) {
            crackTimeText.textContent = Math.round(seconds / 3600) + ' hours';
        } else if (seconds < 31536000) {
            crackTimeText.textContent = Math.round(seconds / 86400) + ' days';
        } else if (seconds < 3153600000) {
            crackTimeText.textContent = Math.round(seconds / 31536000) + ' years';
        } else {
            crackTimeText.textContent = 'Centuries+';
        }
    }

    function addToHistory(password) {
        history = history.filter(item => item !== password);
        history.unshift(password);
        if (history.length > 12) {
            history = history.slice(0, 12);
        }
        localStorage.setItem(storageKey, JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        if (!history.length) {
            passwordHistory.innerHTML = '<div class="generator-history-item">No passwords generated yet.</div>';
            return;
        }
        passwordHistory.innerHTML = history.map(password => {
            return `<div class="generator-history-item">
              <div>${password}</div>
              <div class="generator-actions" style="margin-top:0.75rem;">
                <button class="btn glass secondary" data-variant="halo" data-action="copy" data-password="${password}">Copy</button>
                <button class="btn glass tertiary" data-variant="flare" data-action="use" data-password="${password}">Use</button>
                <button class="btn glass tertiary" data-variant="flare" data-action="remove" data-password="${password}">Remove</button>
              </div>
            </div>`;
        }).join('');
    }

    function clearHistory() {
        history = [];
        localStorage.removeItem(storageKey);
        renderHistory();
    }

    function copyFromHistory(password) {
        navigator.clipboard.writeText(password);
    }

    function useFromHistory(password) {
        passwordDisplay.value = password;
        updateStrengthIndicator(password);
        calculateCrackTime(password, getCharsetSize());
    }

    function removeFromHistory(password) {
        history = history.filter(item => item !== password);
        localStorage.setItem(storageKey, JSON.stringify(history));
        renderHistory();
    }

    function getCharsetSize() {
        let size = 0;
        if (includeUppercase.checked) size += chars.uppercase.length;
        if (includeLowercase.checked) size += chars.lowercase.length;
        if (includeNumbers.checked) size += chars.numbers.length;
        if (includeSpecialChars.checked) size += chars.special.length;
        if (ambiguityFree.checked) {
            size -= chars.ambiguous.length;
        }
        return Math.max(size, 1);
    }

    renderHistory();
    generatePassword();
});
