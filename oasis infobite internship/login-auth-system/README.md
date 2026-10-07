# 🔐 SecureAuth — Login Authentication System

> A complete frontend-only registration + login system with SHA-256 password hashing, protected routes, and a clean modern UI.

---

## ✨ Features

| Feature | Status |
|---------|--------|
| ✅ Registration page (username, email, password) | Done |
| ✅ Password validation: min 8 chars + at least 1 number | Done |
| ✅ Duplicate user check (email already registered → error) | Done |
| ✅ Login page with form validation | Done |
| ✅ Generic error on wrong credentials (doesn't reveal which field is wrong) | Done |
| ✅ Protected Dashboard — redirects to login if not authenticated | Done |
| ✅ Logout button clears session + redirects to login | Done |
| ✅ SHA-256 password hashing (never stored in plain text) | Done |
| ✅ Empty field validation (all fields required) | Done |
| ✅ Password strength meter on registration | Bonus |
| ✅ Password visibility toggle | Bonus |
| ✅ Auto-login after registration | Bonus |
| ✅ Responsive design (desktop, tablet, mobile) | Bonus |

---

## 📁 Project Structure

```
login-auth-system/
├── index.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Protected dashboard (requires login)
├── style.css           # All styles (separate file)
├── auth.js             # Core auth module (hashing, storage, sessions)
├── login.js            # Login page logic
├── register.js         # Registration page logic
├── dashboard.js        # Dashboard page logic + route protection
└── README.md           # This file
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup with accessibility attributes
- **CSS3** — Custom properties, Flexbox, Grid, animations, responsive design
- **JavaScript (Vanilla ES6+)** — No frameworks, no dependencies
- **Web Crypto API** — SHA-256 password hashing (browser-native)
- **localStorage** — Client-side data persistence

---

## 🔒 Security Features

### Password Hashing
Passwords are **never stored in plain text**. The system uses the browser's built-in **Web Crypto API** to compute SHA-256 hashes:

```javascript
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // Convert to hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
```

### Generic Error Messages
When login fails, the system shows:
> ❌ *"Invalid email or password. Please try again."*

It **never reveals** whether the email exists or the password is wrong — preventing enumeration attacks.

### Route Protection
The dashboard page checks for a valid session on load. If no session exists, the user is immediately redirected to the login page:

```javascript
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `> 900px` | Split-panel (brand + form side by side) |
| `640px – 900px` | Single column, 2-col stats |
| `< 640px` | Full mobile (stacked everything) |
| `< 480px` | Compact mobile |

---

## 🚀 How to Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/login-auth-system.git
   ```

2. **Open in browser**
   ```bash
   cd login-auth-system
   open index.html
   ```
   No build tools, no server, no dependencies — just open and use.

3. **Test the flow**
   - Go to **Register** → Create an account
   - Go to **Login** → Sign in with your credentials
   - View the **Dashboard** → See session info
   - Click **Logout** → Session cleared, redirected to login
   - Try accessing `dashboard.html` directly → Redirected to login

---

## 🧪 Test Scenarios

| Test Case | Expected Result |
|-----------|-----------------|
| Register with empty fields | Shows validation errors |
| Register with short password (< 8 chars) | "Password must be at least 8 characters" |
| Register with no number in password | "Password must contain at least 1 number" |
| Register with existing email | "An account with this email already exists" |
| Login with wrong email | Generic: "Invalid email or password" |
| Login with wrong password | Generic: "Invalid email or password" |
| Access dashboard without login | Redirected to login page |
| Click logout | Session cleared, redirected to login |
| Password stored in localStorage | Only SHA-256 hash stored, not plain text |

---

## 🌐 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome 63+ | ✅ |
| Firefox 57+ | ✅ |
| Safari 11.1+ | ✅ |
| Edge 79+ | ✅ |
| IE 11 | ❌ |

> Requires Web Crypto API (`crypto.subtle`) for SHA-256 hashing.

---

## ⚠️ Disclaimer

This is a **frontend-only demo** for educational purposes. In a production environment:
- Use a **backend server** with bcrypt/argon2 for password hashing
- Use **HTTP-only cookies** or **JWT tokens** for session management
- Never rely solely on localStorage for authentication
- Implement **CSRF protection** and **rate limiting**

---

## 📜 License

Open source under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">Built with 🔐 for learning authentication fundamentals</p>
