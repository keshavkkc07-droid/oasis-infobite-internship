/* ═══════════════════════════════════════════════════════════
   SECUREAUTH — LOGIN PAGE LOGIC (login.js)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Redirect if already logged in
    if (redirectIfLoggedIn()) return;

    // Setup
    setupPasswordToggle();

    const form = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        hideAlert();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // ── Validate empty fields ──
        let hasError = false;

        if (!email) {
            setFieldError('emailGroup', 'emailError', 'Email is required');
            hasError = true;
        } else if (!isValidEmail(email)) {
            setFieldError('emailGroup', 'emailError', 'Please enter a valid email');
            hasError = true;
        }

        if (!password) {
            setFieldError('passwordGroup', 'passwordError', 'Password is required');
            hasError = true;
        }

        if (hasError) return;

        // ── Authenticate ──
        setLoading(loginBtn, true);

        // Simulate network delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const user = findUserByEmail(email);

            if (!user) {
                // Generic error — don't reveal if email exists or not
                showAlert('error', 'Invalid email or password. Please try again.');
                setLoading(loginBtn, false);
                return;
            }

            const hashedInput = await hashPassword(password);

            if (hashedInput !== user.passwordHash) {
                // Generic error — same message for wrong password
                showAlert('error', 'Invalid email or password. Please try again.');
                setLoading(loginBtn, false);
                return;
            }

            // ── Success — create session and redirect ──
            createSession(user);
            showAlert('success', 'Login successful! Redirecting...');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 600);

        } catch (err) {
            console.error('Login error:', err);
            showAlert('error', 'Something went wrong. Please try again.');
            setLoading(loginBtn, false);
        }
    });

    // ── Clear field errors on input ──
    document.getElementById('email').addEventListener('input', () => {
        clearFieldError('emailGroup', 'emailError');
    });

    document.getElementById('password').addEventListener('input', () => {
        clearFieldError('passwordGroup', 'passwordError');
    });
});
