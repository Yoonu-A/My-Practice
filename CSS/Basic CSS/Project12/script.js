// Selecting Document Elements
const passwordInput = document.getElementById('pw');
const togglePasswordEye = document.getElementById('eye');
const validationMessage = document.getElementById('msg');
const submitLoginBtn = document.getElementById('go');

/**
 * Toggle Password Visibility Functionality
 * Switches input type between text and password and updates accessible labels.
 */
togglePasswordEye.onclick = () => {
    // Check if current type is password
    const isPasswordType = passwordInput.type === 'password';
    
    // Switch state based on boolean condition
    passwordInput.type = isPasswordType ? 'text' : 'password';
    
    // Update ARIA compliance attribute for accessibility readers
    togglePasswordEye.setAttribute('aria-label', isPasswordType ? 'Hide password' : 'Show password');
};

/**
 * Demo Form Submission Verification Functionality
 * Validates existence of data inside target text fields before executing dummy submission.
 */
submitLoginBtn.onclick = () => {
    // Trim accidental empty spaces from email field value
    const emailValue = document.getElementById('email').value.trim();
    
    // Form verification check
    if (!emailValue || !passwordInput.value) {
        validationMessage.textContent = 'Enter your email and password.';
        validationMessage.style.color = '#ff4a4a'; // Apply explicit red tint on verification failure
    } else {
        validationMessage.textContent = 'Demo only: no login happens here.';
        validationMessage.style.color = 'var(--cyan)'; // Apply customized branding color tint on verification success
    }
};