const passwordEl = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!.;~^´`@#$[]()";

// Atualiza o texto do tamanho conforme o range é mexido
lengthEl.addEventListener("input", (e) => {
    lengthValue.innerText = e.target.value;
});

function getChars() {
    let chars = "";
    if (uppercaseEl.checked) chars += upperLetters;
    if (lowercaseEl.checked) chars += lowerLetters;
    if (numbersEl.checked) chars += numbers;
    if (symbolsEl.checked) chars += symbols;
    return chars;
}

function evaluateStrength(password) {
    let score = 0;

    if (!password || password.includes("Selecione") || password.includes("Pressione")) {
        strengthBar.style.width = "0%";
        strengthText.innerText = "Força da senha";
        return;
    }

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (uppercaseEl.checked) score += 1;
    if (lowercaseEl.checked) score += 1;
    if (numbersEl.checked) score += 1;
    if (symbolsEl.checked) score += 1;

    if (score <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#ef4444"; // Vermelho (Fraca)
        strengthText.innerText = "Fraca 🔴";
    } else if (score <= 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#f59e0b"; // Amarela (Média)
        strengthText.innerText = "Média 🟡";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#10b981"; // Verde (Forte)
        strengthText.innerText = "Forte 🟢";
    }
}

function generatePassword() {
    const length = +lengthEl.value;
    const chars = getChars();

    if (chars === "") {
        passwordEl.innerText = "Selecione ao menos um item!";
        evaluateStrength("");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    passwordEl.innerText = password;
    evaluateStrength(password);
}

// Copiar para a área de transferência
copyBtn.addEventListener("click", () => {
    const password = passwordEl.innerText;
    if (!password || password.includes("Selecione") || password.includes("Pressione")) return;

    navigator.clipboard.writeText(password);
    copyBtn.innerText = "✅";
    setTimeout(() => {
        copyBtn.innerText = "📋";
    }, 1500);
});

generateBtn.addEventListener("click", generatePassword);
