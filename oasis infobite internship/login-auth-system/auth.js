/* ═══════════════════════════════════════════════════════════
   SECUREAUTH — CORE AUTHENTICATION MODULE (auth.js)
   Shared utilities: hashing, storage, session, alerts
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ─── CONSTANTS ───
const STORAGE_KEYS = {
    USERS: 'secureauth_users',
    SESSION: 'secureauth_session',
};

// ─── SHA-256 HASHING (Web Crypto API) ───
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// ─── USER STORAGE ───
function getUsers() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USERS);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// ─── SESSION MANAGEMENT ───
function createSession(user) {
    const session = {
        username: user.username,
        email: user.email,
        registeredAt: user.registeredAt,
        passwordHash: user.passwordHash,
        loginAt: new Date().toISOString(),
        sessionId: generateSessionId(),
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    return session;
}

function getSession() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SESSION);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function destroySession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
}

function isLoggedIn() {
    return getSession() !== null;
}

function generateSessionId() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

// ─── ROUTE PROTECTION ───
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// ─── VALIDATION HELPERS ───
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least 1 number');
    }
    return errors;
}

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 'weak', color: '#ef4444', width: '20%' };
    if (score <= 2) return { level: 'fair', color: '#f59e0b', width: '40%' };
    if (score <= 3) return { level: 'good', color: '#3b82f6', width: '65%' };
    if (score <= 4) return { level: 'strong', color: '#10b981', width: '85%' };
    return { level: 'excellent', color: '#059669', width: '100%' };
}

// ─── ALERT SYSTEM ───
function showAlert(type, message) {
    const alertBox = document.getElementById('alertBox');
    const alertIcon = document.getElementById('alertIcon');
    const alertMessage = document.getElementById('alertMessage');

    if (!alertBox) return;

    alertBox.className = `alert show alert--${type}`;
    alertIcon.textContent = type === 'error' ? '⚠️' : '✅';
    alertMessage.textContent = message;

    // Auto-hide after 6 seconds
    clearTimeout(window.__alertTimer);
    window.__alertTimer = setTimeout(hideAlert, 6000);
}

function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    if (alertBox) {
        alertBox.classList.remove('show');
    }
}

// ─── PASSWORD TOGGLE ───
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        const eyeOpen = toggleBtn.querySelector('.eye-open');
        const eyeClosed = toggleBtn.querySelector('.eye-closed');

        if (eyeOpen && eyeClosed) {
            eyeOpen.style.display = isPassword ? 'none' : 'block';
            eyeClosed.style.display = isPassword ? 'block' : 'none';
        }
    });
}

// ─── FORM ERROR HELPERS ───
function setFieldError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const error = document.getElementById(errorId);
    if (group) group.classList.add('error');
    if (error) error.textContent = message;
}

function clearFieldError(groupId, errorId) {
    const group = document.getElementById(groupId);
    const error = document.getElementById(errorId);
    if (group) group.classList.remove('error');
    if (error) error.textContent = '';
}

function clearAllErrors() {
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
}

// ─── LOADING STATE ───
function setLoading(button, loading) {
    if (!button) return;
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}
