
document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const modePassword = document.getElementById('modePassword');
    const modePassphrase = document.getElementById('modePassphrase');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSpecialChars = document.getElementById('includeSpecialChars');
    const minNumbers = document.getElementById('minNumbers');
    const minSpecialChars = document.getElementById('minSpecialChars');
    const ambiguityFree = document.getElementById('ambiguityFree');
    const avoidRepeats = document.getElementById('avoidRepeats');
    const avoidSequences = document.getElementById('avoidSequences');
    const excludeChars = document.getElementById('excludeChars');
    const passphraseOptions = document.getElementById('passphraseOptions');
    const wordCount = document.getElementById('wordCount');
    const wordCountValue = document.getElementById('wordCountValue');
    const separator = document.getElementById('separator');
    const capitalizeWords = document.getElementById('capitalizeWords');
    const appendDigit = document.getElementById('appendDigit');
    const appendSymbol = document.getElementById('appendSymbol');
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

    const WORDS = [
      'able','acid','aged','also','area','army','away','baby','back','ball','band','bank','base','bath','bear','beat','been','beer','bell','belt','best','bill','bird','blow','blue','boat','body','bomb','bond','bone','book','boom','born','boss','both','bowl','bulk','burn','bush','busy','cake','call','calm','came','camp','card','care','case','cash','cast','cell','chat','chip','city','club','coal','coat','code','cold','come','cook','cool','cope','copy','core','cost','crew','crop','dark','data','date','dawn','days','dead','deal','debt','deep','deny','desk','dial','diet','disc','disk','does','done','door','dose','down','draw','drop','drug','dual','duke','dust','duty','each','earn','ease','east','easy','edge','else','even','ever','evil','exit','face','fact','fail','fair','fall','farm','fast','fate','fear','feed','feel','feet','file','fill','film','find','fine','fire','firm','fish','five','flat','flow','food','foot','ford','form','fort','four','free','from','fuel','full','fund','gain','game','gate','gave','gear','gene','gift','girl','give','glad','goal','goes','gold','golf','gone','good','gray','grew','grey','grow','gulf','hair','half','hall','hand','hang','hard','harm','hate','have','head','hear','heat','held','hell','help','here','hero','high','hill','hire','hold','hole','holy','home','hope','host','hour','huge','hung','hunt','hurt','idea','inch','into','iron','item','jean','join','jump','jury','just','keep','kent','kept','keys','kill','kind','king','knee','knew','know','lack','lady','laid','lake','land','lane','last','late','lead','left','less','life','lift','like','line','link','list','live','load','loan','lock','logo','long','look','lord','lose','loss','lost','love','luck','made','mail','main','make','male','many','mark','mass','matt','meal','mean','meat','meet','menu','meri','mice','mike','mile','milk','mill','mind','mine','miss','mode','mood','moon','more','most','move','much','must','name','navy','near','neck','need','news','next','nice','nick','nine','none','nose','note','okay','once','only','onto','open','oral','over','pace','pack','page','paid','pain','pair','palm','park','part','pass','past','path','peak','pick','pink','pipe','plan','play','plot','plug','plus','poll','pool','poor','port','post','pull','pure','push','race','rail','rain','rank','rare','rate','read','real','rear','rely','rent','rest','rice','rich','ride','ring','rise','risk','road','rock','role','roll','roof','room','root','rose','rule','rush','safe','said','sake','sale','salt','same','sand','save','seat','seed','seek','seem','seen','self','sell','send','sent','ship','shop','shot','show','shut','sick','side','sign','site','size','skin','slip','slow','snow','soft','soil','sold','sole','some','song','soon','sort','soul','spot','star','stay','step','stop','such','suit','sure','take','tale','talk','tall','tank','tape','task','team','tech','tell','tend','term','test','text','than','that','them','then','they','thin','this','thus','till','time','tiny','told','toll','tone','tony','took','tool','tour','town','tree','trip','true','tune','twin','type','unit','upon','used','user','vary','vast','very','vice','view','vote','wage','wait','wake','walk','wall','want','ward','warm','wash','wave','ways','weak','wear','week','well','went','were','west','what','when','whom','wide','wife','wild','will','wind','wine','wing','wire','wise','wish','with','wood','word','wore','work','yard','yeah','year','your'
    ];

    let history = JSON.parse(localStorage.getItem(storageKey) || '[]');

    const controls = [
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSpecialChars,
        ambiguityFree,
        minNumbers,
        minSpecialChars,
        avoidRepeats,
        avoidSequences,
        excludeChars,
        modePassword,
        modePassphrase,
        wordCount,
        separator,
        capitalizeWords,
        appendDigit,
        appendSymbol
    ];

    controls.forEach(control => {
        const eventType = control.type === 'number' ? 'input' : 'change';
        control.addEventListener(eventType, generatePassword);
    });

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword();
    });

    wordCount.addEventListener('input', () => {
      wordCountValue.textContent = wordCount.value;
      generatePassword();
    });

    modePassword.addEventListener('change', toggleMode);
    modePassphrase.addEventListener('change', toggleMode);

    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyToClipboard);
    clearHistoryBtn.addEventListener('click', clearHistory);

    passwordHistory.addEventListener('click', event => {
        const target = event.target;
        const row = target.closest('.generator-history-item');
        if (!row) return;
        if (target.classList.contains('history-remove')) {
            removeFromHistory(row.dataset.password);
            return;
        }
        copyFromHistory(row.dataset.password);
    });

    function toggleMode() {
      const passMode = modePassphrase.checked;
      passphraseOptions.style.display = passMode ? 'grid' : 'none';
      lengthSlider.disabled = passMode;
      includeUppercase.disabled = passMode;
      includeLowercase.disabled = passMode;
      includeNumbers.disabled = passMode;
      includeSpecialChars.disabled = passMode;
      ambiguityFree.disabled = passMode;
      minNumbers.disabled = passMode;
      minSpecialChars.disabled = passMode;
      avoidRepeats.disabled = passMode;
      avoidSequences.disabled = passMode;
      excludeChars.disabled = passMode;
      generatePassword();
    }

    function generatePassword() {
        if (modePassphrase.checked) {
          generatePassphrase();
          return;
        }
        let charset = '';
        if (includeUppercase.checked) charset += chars.uppercase;
        if (includeLowercase.checked) charset += chars.lowercase;
        if (includeNumbers.checked) charset += chars.numbers;
        if (includeSpecialChars.checked) charset += chars.special;

        if (ambiguityFree.checked) {
            charset = charset.split('').filter(char => !chars.ambiguous.includes(char)).join('');
        }

        if (excludeChars.value) {
          const blacklist = new Set(excludeChars.value.split(''));
          charset = charset.split('').filter(c => !blacklist.has(c)).join('');
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
        const needUpper = includeUppercase.checked ? 1 : 0;
        const needLower = includeLowercase.checked ? 1 : 0;
        let addedUpper = 0, addedLower = 0;

        for (let i = 0; i < minNums; i++) {
            password += chars.numbers.charAt(Math.floor(Math.random() * chars.numbers.length));
        }

        for (let i = 0; i < minSpecs; i++) {
            password += chars.special.charAt(Math.floor(Math.random() * chars.special.length));
        }

        if (needUpper) { password += chars.uppercase.charAt(Math.floor(Math.random() * chars.uppercase.length)); addedUpper = 1; }
        if (needLower) { password += chars.lowercase.charAt(Math.floor(Math.random() * chars.lowercase.length)); addedLower = 1; }

        for (let i = password.length; i < passwordLength; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        if (avoidRepeats.checked || avoidSequences.checked) {
          let attempts = 0;
          while ((!isValid(password) || (needUpper && !/[A-Z]/.test(password)) || (needLower && !/[a-z]/.test(password))) && attempts < 400) {
            let p = '';
            for (let i = 0; i < passwordLength; i++) p += charset.charAt(Math.floor(Math.random() * charset.length));
            password = p;
            attempts++;
          }
        }

        passwordDisplay.value = password;
        addToHistory(password);
        updateStrengthIndicator(password, charset.length);
        calculateCrackTime(password, charset.length);
    }

    function generatePassphrase() {
      const n = parseInt(wordCount.value, 10);
      const sep = separator.value;
      const words = [];
      for (let i = 0; i < n; i++) {
        let w = WORDS[Math.floor(Math.random() * WORDS.length)];
        if (capitalizeWords.checked) w = w.charAt(0).toUpperCase() + w.slice(1);
        words.push(w);
      }
      let pass = words.join(sep);
      if (appendDigit.checked) pass += Math.floor(Math.random() * 10);
      if (appendSymbol.checked) pass += '!@#$%^&*'[Math.floor(Math.random() * 8)];
      passwordDisplay.value = pass;
      addToHistory(pass);
      const entropy = (n * Math.log2(WORDS.length)) + (appendDigit.checked ? Math.log2(10) : 0) + (appendSymbol.checked ? Math.log2(8) : 0);
      renderStrengthFromEntropy(entropy);
      crackTimeText.textContent = estimateCrackTimeFromEntropy(entropy);
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

    function updateStrengthIndicator(password, charsetSize) {
        if (modePassphrase.checked) return;
        const length = password.length;
        const entropy = Math.log2(Math.max(charsetSize,1)) * length;
        renderStrengthFromEntropy(entropy);
    }

    function renderStrengthFromEntropy(entropy) {
      const max = 128;
      const pct = Math.min(100, Math.round((entropy / max) * 100));
      strengthIndicator.style.width = pct + '%';
      let label = 'Weak';
      let color = '#ff4d4f';
      if (entropy >= 60 && entropy < 80) { label = 'Medium'; color = '#ffa940'; }
      else if (entropy >= 80 && entropy < 100) { label = 'Strong'; color = '#52c41a'; }
      else if (entropy >= 100) { label = 'Excellent'; color = '#1ec27e'; }
      strengthText.textContent = label;
      strengthIndicator.style.backgroundColor = color;
    }

    function calculateCrackTime(password, charsetSize) {
        if (!password) {
            crackTimeText.textContent = 'Unavailable';
            return;
        }
        const entropy = Math.log2(Math.max(charsetSize,1)) * password.length;
        crackTimeText.textContent = estimateCrackTimeFromEntropy(entropy);
    }

    function estimateCrackTimeFromEntropy(entropy) {
      const guessesPerSecond = 1e10;
      const seconds = Math.pow(2, entropy) / guessesPerSecond;
      if (seconds < 60) return '< 1 minute';
      if (seconds < 3600) return Math.round(seconds / 60) + ' minutes';
      if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
      if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
      if (seconds < 3153600000) return Math.round(seconds / 31536000) + ' years';
      return 'Centuries+';
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
        passwordHistory.innerHTML = history.map(p => {
            return `<div class="generator-history-item" data-password="${p}">
              <span>${p}</span>
              <button class="history-remove" title="Remove">×</button>
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
        if (excludeChars.value) size -= new Set(excludeChars.value.split('')).size;
        return Math.max(size, 1);
    }

    function isSequential(a, b, c) {
      const codeA = a.charCodeAt(0), codeB = b.charCodeAt(0), codeC = c.charCodeAt(0);
      return (codeA + 1 === codeB && codeB + 1 === codeC) || (codeA - 1 === codeB && codeB - 1 === codeC);
    }

    function isValid(pass) {
      if (avoidRepeats.checked) {
        for (let i = 1; i < pass.length; i++) if (pass[i] === pass[i-1]) return false;
      }
      if (avoidSequences.checked) {
        for (let i = 2; i < pass.length; i++) if (isSequential(pass[i-2], pass[i-1], pass[i])) return false;
      }
      return true;
    }

    renderHistory();
    toggleMode();
});
