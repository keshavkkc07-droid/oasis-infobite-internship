/* ═══════════════════════════════════════════════════════════
   SECUREAUTH — DASHBOARD PAGE LOGIC (dashboard.js)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ── Route Protection — redirect if not logged in ──
    if (!requireAuth()) return;

    const session = getSession();
    if (!session) return;

    // ── Populate Dashboard Data ──
    const username = session.username || 'User';
    const initial = username.charAt(0).toUpperCase();

    // Nav
    const navAvatar = document.getElementById('navAvatar');
    const navUsername = document.getElementById('navUsername');
    if (navAvatar) navAvatar.textContent = initial;
    if (navUsername) navUsername.textContent = username;

    // Welcome
    const dashUsername = document.getElementById('dashUsername');
    if (dashUsername) dashUsername.textContent = username;

    // Date
    const dashDate = document.getElementById('dashDate');
    if (dashDate) {
        const now = new Date();
        dashDate.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    // Login time
    const loginTime = document.getElementById('loginTime');
    if (loginTime && session.loginAt) {
        const time = new Date(session.loginAt);
        loginTime.textContent = time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Total users
    const totalUsers = document.getElementById('totalUsers');
    if (totalUsers) {
        const users = getUsers();
        totalUsers.textContent = users.length;
    }

    // Session info
    const infoUsername = document.getElementById('infoUsername');
    const infoEmail = document.getElementById('infoEmail');
    const infoRegistered = document.getElementById('infoRegistered');
    const infoSession = document.getElementById('infoSession');
    const infoHash = document.getElementById('infoHash');

    if (infoUsername) infoUsername.textContent = username;
    if (infoEmail) infoEmail.textContent = session.email || '—';
    if (infoRegistered && session.registeredAt) {
        infoRegistered.textContent = new Date(session.registeredAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
    if (infoSession) infoSession.textContent = session.sessionId || '—';
    if (infoHash) infoHash.textContent = session.passwordHash || '—';

    // ── Logout ──
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            destroySession();
            window.location.href = 'index.html';
        });
    }
});
