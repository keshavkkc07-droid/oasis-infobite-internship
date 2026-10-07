# ⚡ Calculus — Extraordinary Calculator

A stunning, feature-rich browser-based calculator built with **vanilla HTML, CSS & JavaScript**. No frameworks, no dependencies — just pure web tech at its finest.

![Dark Theme](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-8b5cf6?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Grid](https://img.shields.io/badge/Layout-CSS%20Grid-2965f1?style=for-the-badge&logo=css3&logoColor=white)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-22c55e?style=for-the-badge)

---

## 🚀 Quick Start

```
1. Download / Clone the project
2. Open index.html in any modern browser
3. Start calculating! ⚡
```

> No build step. No npm install. No server needed. Just open and go.

---

## ✨ Features

### 🧮 Calculator Core
| Feature | Description |
|---|---|
| **Basic Operations** | Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`) |
| **Chaining** | Continuous calculations like `5 + 3 × 2` — evaluates step by step |
| **Divide by Zero** | Graceful error handling with shake animation — no crash! |
| **Floating Point Fix** | `0.1 + 0.2 = 0.3` — not `0.30000000000000004` |
| **Percentage** | Instant `%` conversion |
| **Backspace** | Delete last digit with `⌫` |
| **Clear** | Reset everything with `C` |
| **Auto Font Sizing** | Display text shrinks as numbers get longer |
| **Number Formatting** | Thousand separators (e.g., `1,000,000`) |

### 🎨 Visual Design
- **Glassmorphism UI** — frosted glass card with backdrop blur
- **Animated Particle Background** — floating connected dots on HTML Canvas
- **Gradient Mesh Orbs** — 3 ambient floating light blobs
- **Subtle Grid Overlay** — background texture for depth
- **Ripple Effect** — material-design style ripple on every button click
- **Smooth Transitions** — buttery 0.3s animations everywhere

### 🌗 Dark / Light Theme
- Full theme system powered by CSS Custom Properties
- Toggle with the 🌙 / ☀️ button or press `T`
- Theme preference saved in `localStorage`

### 📜 History Panel
- Sliding side panel showing all past calculations
- Click any history entry to load that result
- Persistent across sessions via `localStorage`
- "Clear All" button to wipe history

### 🔊 Sound Feedback
- Subtle audio feedback using the **Web Audio API**
- Different tones for: numbers, operators, equals, clear, errors
- No audio files needed — generated in real-time

### ⌨️ Full Keyboard Support
| Key | Action |
|-----|--------|
| `0` – `9` | Number input |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate result |
| `.` | Decimal point |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `%` | Percentage |
| `T` | Toggle dark/light theme |
| `H` | Toggle history panel |

> Keyboard presses also visually highlight the corresponding button!

---

## 📁 Project Structure

```
calculator/
├── index.html    ← Everything lives here (HTML + CSS + JS)
└── README.md     ← You are here
```

> Yes, it's a **single file** application. All ~700 lines of HTML, CSS, and JavaScript in one self-contained file.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, Canvas element |
| **CSS3** | Grid layout, Custom Properties, Glassmorphism, Animations |
| **JavaScript (ES6+)** | Calculator engine, Event handling, Web Audio API, Canvas particles |
| **localStorage** | Theme preference & calculation history persistence |

### Architecture Highlights
- ✅ **CSS Grid** for button layout — clean 4-column grid
- ✅ **addEventListener** only — zero `onclick=""` in HTML
- ✅ **Event delegation** — single click listener on button container
- ✅ **OOP design** — `Calculator` and `SoundEngine` classes
- ✅ **No external dependencies** — everything is vanilla

---

## 🌐 Browser Support

| Browser | Supported |
|---|---|
| Chrome 80+ | ✅ |
| Firefox 80+ | ✅ |
| Safari 14+ | ✅ |
| Edge 80+ | ✅ |
| Opera 67+ | ✅ |
| Mobile Browsers | ✅ |

---

## 📸 Screenshots

Open `index.html` in your browser to see:
- 🌑 **Dark Mode** — Deep purple/indigo glassmorphism
- 🌕 **Light Mode** — Clean white glassmorphism
- 📜 **History Panel** — Slide-out calculation log

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">
  Made with 💜 using pure HTML, CSS & JavaScript
</p>
