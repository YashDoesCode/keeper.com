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

    const chars = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        ambiguous: 'l1IO0',
    };

    let history = [];

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword();
    });

    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSpecialChars.addEventListener('change', generatePassword);
    minNumbers.addEventListener('input', generatePassword);
    minSpecialChars.addEventListener('input', generatePassword);
    ambiguityFree.addEventListener('change', generatePassword);

    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);

    function generatePassword() {
        const passwordContainer = document.querySelector('.password-display-container');
        passwordContainer.classList.add('generating');

        setTimeout(() => {
            let charset = '';
            if (includeUppercase.checked) charset += chars.uppercase;
            if (includeLowercase.checked) charset += chars.lowercase;
            if (includeNumbers.checked) charset += chars.numbers;
            if (includeSpecialChars.checked) charset += chars.special;

            if (ambiguityFree.checked) {
                charset = charset.split('').filter(char => !chars.ambiguous.includes(char)).join('');
            }

            if (charset === '') {
                passwordDisplay.value = 'Select at least one character set';
                passwordContainer.classList.remove('generating');
                return;
            }

            let password = '';
            let passwordLength = lengthSlider.value;
            let minNums = parseInt(minNumbers.value, 10);
            let minSpecs = parseInt(minSpecialChars.value, 10);

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
            updateStrengthIndicator();
            calculateCrackTime();
            passwordContainer.classList.remove('generating');
        }, 500);
    }

    function copyToClipboard() {
        passwordDisplay.select();
        document.execCommand('copy');
        copyButton.classList.add('copied');
        copyButton.textContent = 'Copied!';

        setTimeout(() => {
            copyButton.classList.remove('copied');
            copyButton.textContent = 'Copy';
        }, 2000);
    }

    function updateStrengthIndicator() {
        const length = passwordDisplay.value.length;
        let strength = 0;
        if (length > 8) strength++;
        if (length > 12) strength++;
        if (includeNumbers.checked) strength++;
        if (includeUppercase.checked) strength++;
        if (includeLowercase.checked) strength++;
        if (includeSpecialChars.checked) strength++;

        let strengthLabel = '';
        let color = '';
        if (strength <= 2) {
            strengthLabel = 'Weak';
            color = 'red';
        } else if (strength <= 4) {
            strengthLabel = 'Medium';
            color = 'orange';
        } else {
            strengthLabel = 'Strong';
            color = 'green';
        }

        strengthIndicator.style.width = (strength / 6 * 100) + '%';
        strengthIndicator.style.backgroundColor = color;
        strengthText.textContent = strengthLabel;
    }

    function calculateCrackTime() {
        const password = passwordDisplay.value;
        const charsetSize = getCharsetSize();
        const combinations = Math.pow(charsetSize, password.length);
        const guessesPerSecond = 1e9; // 1 billion guesses per second
        const seconds = combinations / guessesPerSecond;

        if (seconds < 60) {
            crackTimeText.textContent = '< 1 minute';
        } else if (seconds < 3600) {
            crackTimeText.textContent = Math.round(seconds / 60) + ' minutes';
        } else if (seconds < 86400) {
            crackTimeText.textContent = Math.round(seconds / 3600) + ' hours';
        } else if (seconds < 31536000) {
            crackTimeText.textContent = Math.round(seconds / 86400) + ' days';
        } else {
            crackTimeText.textContent = Math.round(seconds / 31536000) + ' years';
        }
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
        return size;
    }

    function addToHistory(password) {
        history.unshift(password);
        if (history.length > 10) {
            history.pop();
        }
        renderHistory();
    }

    function renderHistory() {
        passwordHistory.innerHTML = '';
        history.forEach(password => {
            const li = document.createElement('li');
            li.textContent = password;
            passwordHistory.appendChild(li);
        });
    }

    generatePassword();
});