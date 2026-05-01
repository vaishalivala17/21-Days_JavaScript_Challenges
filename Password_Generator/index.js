const passwordDisplay = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copyBtn');
const copyIcon = document.getElementById('copyIcon');
const checkIcon = document.getElementById('checkIcon');
const strengthText = document.getElementById('strengthText');
const strengthBar = document.getElementById('strengthBar');
const errorMsg = document.getElementById('errorMsg');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Update length display when range was changed
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrength();
});

// Generate Password
generateBtn.addEventListener('click', () => {
    errorMsg.classList.add('hidden');
    
    const length = parseInt(lengthSlider.value);
    let charset = '';
    
    if (includeUppercase.checked) charset += uppercaseChars;
    if (includeLowercase.checked) charset += lowercaseChars;
    if (includeNumbers.checked) charset += numberChars;
    if (includeSymbols.checked) charset += symbolChars;
    
    if (charset.length === 0) {
        errorMsg.classList.remove('hidden');
        passwordDisplay.value = '';
        strengthText.textContent = 'No Options';
        strengthBar.style.width = '0%';
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset.charAt(array[i] % charset.length);
    }
    
    passwordDisplay.value = password;
    updateStrength();
});

copyBtn.addEventListener('click', async () => {
    const password = passwordDisplay.value;
    
    if (!password) return;
    
    try {
        await navigator.clipboard.writeText(password);
        console.log(navigator.clipboard);

        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        
        setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

function updateStrength() {
    const password = passwordDisplay.value;
    let strength = 0;
    let message = '';
    let color = '';
    
    if (password.length === 0) {
        strengthText.textContent = 'Generate Password';
        strengthBar.style.width = '0%';
        return;
    }
    
    // Calculate strength 
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;
    if (password.length >= 20) strength += 10;
    
    if (includeUppercase.checked) strength += 15;
    if (includeLowercase.checked) strength += 15;
    if (includeNumbers.checked) strength += 10;
    if (includeSymbols.checked) strength += 10;
    
    if (strength < 30) {
        message = 'Weak';
        color = '#E94560';
    } else if (strength < 50) {
        message = 'Fair';
        color = '#747769';
    } else if (strength < 70) {
        message = 'Good';
        color = '#A9B388';
    } else {
        message = 'Strong';
        color = '#c9a179';
    }
    
    strengthText.textContent = message;
    strengthText.style.color = color;
    strengthBar.style.backgroundColor = color;
    strengthBar.style.width = Math.min(strength, 100) + '%';
}

updateStrength();
