# ⚡ TaskFlow — Your Daily Productivity Hub

A beautifully crafted, feature-rich To-Do Web Application built with pure **HTML**, **CSS**, and **JavaScript**. No frameworks, no dependencies — just open and go!

![TaskFlow](https://img.shields.io/badge/Version-1.0-8b5cf6?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🚀 Getting Started

1. **Download** or **clone** this repository.
2. Open `index.html` in any modern web browser.
3. Start adding tasks and stay productive!

> No server, no build tools, no installation required. It just works.

---

## ✨ Features

### Core Functionality

| Feature            | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **Add Task**       | Type your task and press Enter or click the "Add Task" button.     |
| **Mark Complete**  | Click the circular checkbox to mark a task as done.                |
| **Edit Task**      | Click the pencil icon to edit any pending task inline.             |
| **Delete Task**    | Click the trash icon to remove a task with a smooth animation.     |
| **Live Counters**  | Displays real-time Pending, Completed, and Total task counts.      |
| **Filter Tabs**    | Switch between All, Pending, and Completed views.                  |
| **Search**         | Instantly search through all your tasks.                           |

### Bonus & Extraordinary Features

| Feature                  | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| **localStorage**         | All tasks are saved in the browser. Data persists even after refresh.    |
| **Timestamps**           | Every task shows a human-friendly time (e.g., "5m ago", "2h ago").      |
| **Priority Levels**      | Assign Low 🟢, Medium 🟡, or High 🔴 priority to each task.            |
| **Progress Bar**         | A visual progress bar shows your daily completion percentage.            |
| **Confetti Animation**   | A fun confetti burst plays every time you complete a task! 🎊            |
| **Toast Notifications**  | Elegant pop-up notifications for every action (add, edit, delete, etc.). |
| **Glassmorphism UI**     | Modern dark theme with animated gradient orbs and grid overlay.          |
| **Responsive Design**    | Works perfectly on desktop, tablet, and mobile devices.                  |
| **Friendly Empty States**| Motivational messages when your task lists are empty.                    |
| **Keyboard Shortcuts**   | Power-user shortcuts for fast task management.                           |

---

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action                         |
| -------------- | ------------------------------ |
| `Enter`        | Add a new task                 |
| `Ctrl + K`     | Focus the search bar           |
| `1`            | Set priority to Low            |
| `2`            | Set priority to Medium         |
| `3`            | Set priority to High           |
| `Escape`       | Cancel editing a task          |

> **Note:** Number shortcuts (`1`, `2`, `3`) only work when the cursor is not inside an input field.

---

## 🗂️ Project Structure

```
taskflow/
├── index.html      # Complete application (HTML + CSS + JS in one file)
└── README.md       # This documentation file
```

---

## 🛠️ Technology Stack

- **HTML5** — Semantic markup and structure
- **CSS3** — Custom properties, animations, glassmorphism, responsive grid
- **Vanilla JavaScript** — DOM manipulation, localStorage API, Canvas API (for confetti)

No external libraries or frameworks are used. The entire application is contained in a single HTML file for maximum portability.

---

## 📱 Browser Support

| Browser          | Supported |
| ---------------- | --------- |
| Google Chrome    | ✅        |
| Mozilla Firefox  | ✅        |
| Microsoft Edge   | ✅        |
| Safari           | ✅        |
| Opera            | ✅        |

---

## 📸 How to Use

1. **Adding a Task** — Type your task in the input field, select a priority level (Low / Medium / High), and press `Enter` or click "Add Task".
2. **Completing a Task** — Click the circular checkbox next to any task. It will move to the "Completed" section with a confetti celebration.
3. **Editing a Task** — Hover over a pending task and click the pencil (✏️) icon. Edit the text and click "Save" or press `Enter`.
4. **Deleting a Task** — Hover over any task and click the trash (🗑️) icon. The task will slide out smoothly.
5. **Filtering Tasks** — Use the "All", "Pending", or "Completed" tabs to filter your view.
6. **Searching Tasks** — Use the search bar (or press `Ctrl + K`) to find specific tasks instantly.

---

## 📝 Data Storage

All tasks are stored in your browser's **localStorage** under the key `taskflow_tasks`. This means:

- ✅ Your tasks survive page refreshes.
- ✅ Your tasks survive browser restarts.
- ❌ Tasks are browser-specific (not synced across devices).
- ❌ Clearing browser data will remove saved tasks.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it.

---

## 🙌 Credits

Built with ❤️ for productivity enthusiasts.

---

> *"The secret of getting ahead is getting started."* — Mark Twain
