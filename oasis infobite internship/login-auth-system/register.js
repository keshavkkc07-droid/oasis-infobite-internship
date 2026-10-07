/* ═══════════════════════════════════════════════════════════
   SECUREAUTH — REGISTER PAGE LOGIC (register.js)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Redirect if already logged in
    if (redirectIfLoggedIn()) return;

    // Setup
    setupPasswordToggle();

    const form = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthLabel = document.getElementById('strengthLabel');

    // ── Password Strength Meter ──
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;

        if (val.length === 0) {
            strengthMeter.classList.remove('visible');
            return;
        }

        strengthMeter.classList.add('visible');
        const strength = getPasswordStrength(val);

        strengthFill.style.width = strength.width;
        strengthFill.style.background = strength.color;
        strengthLabel.textContent = strength.level;
        strengthLabel.style.color = strength.color;
    });

    // ── Form Submit ──
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        hideAlert();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // ── Validate all fields ──
        let hasError = false;

        // Username
        if (!username) {
            setFieldError('usernameGroup', 'usernameError', 'Username is required');
            hasError = true;
        } else if (username.length < 3) {
            setFieldError('usernameGroup', 'usernameError', 'Username must be at least 3 characters');
            hasError = true;
        }

        // Email
        if (!email) {
            setFieldError('emailGroup', 'emailError', 'Email is required');
            hasError = true;
        } else if (!isValidEmail(email)) {
            setFieldError('emailGroup', 'emailError', 'Please enter a valid email address');
            hasError = true;
        }

        // Password
        if (!password) {
            setFieldError('passwordGroup', 'passwordError', 'Password is required');
            hasError = true;
        } else {
            const passwordErrors = validatePassword(password);
            if (passwordErrors.length > 0) {
                setFieldError('passwordGroup', 'passwordError', passwordErrors[0]);
                hasError = true;
            }
        }

        // Confirm Password
        if (!confirmPassword) {
            setFieldError('confirmPasswordGroup', 'confirmPasswordError', 'Please confirm your password');
            hasError = true;
        } else if (password !== confirmPassword) {
            setFieldError('confirmPasswordGroup', 'confirmPasswordError', 'Passwords do not match');
            hasError = true;
        }

        if (hasError) return;

        // ── Check duplicate user ──
        const existingUser = findUserByEmail(email);
        if (existingUser) {
            showAlert('error', 'An account with this email already exists. Please login instead.');
            setFieldError('emailGroup', 'emailError', 'This email is already registered');
            return;
        }

        // ── Register ──
        setLoading(registerBtn, true);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const passwordHash = await hashPassword(password);

            const newUser = {
                username,
                email: email.toLowerCase(),
                passwordHash,
                registeredAt: new Date().toISOString(),
            };

            const users = getUsers();
            users.push(newUser);
            saveUsers(users);

            // Auto-login after registration
            createSession(newUser);

            showAlert('success', 'Account created successfully! Redirecting to dashboard...');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);

        } catch (err) {
            console.error('Registration error:', err);
            showAlert('error', 'Something went wrong. Please try again.');
            setLoading(registerBtn, false);
        }
    });

    // ── Clear field errors on input ──
    ['username', 'email', 'password', 'confirmPassword'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                const groupId = id + 'Group';
                const errorId = id + 'Error';
                clearFieldError(groupId, errorId);
            });
        }
    });
});
