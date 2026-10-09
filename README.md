
# JS-Todo-List | State-Driven Task Manager

A fully interactive, responsive To-Do List application built entirely with vanilla JavaScript. This project simulates a real-world productivity app (like Todoist or TickTick), featuring a custom state management system, LocalStorage persistence, nested dropdown menus, and a sleek UI with dark mode.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Author](#author)

## Demo
[Live Demo](https://ali-mirzaei-dev.github.io/JS-Todo-List/)

## Features
- **State-Driven DOM:** The UI is completely decoupled from the HTML. A `tasks` array acts as the single source of truth, and a `renderTask()` function dynamically rebuilds the list on every state change.
- **LocalStorage Persistence:** Tasks and user theme preferences are saved to the browser's LocalStorage. The app perfectly reconstructs its state upon page refresh.
- **Nested Dropdown Menus:** Custom-built, dynamically generated dropdown menus with a global "click-outside-to-close" event listener.
- **Priority System:** Users can assign High, Medium, or Low priorities to tasks via nested menus, with color-coded indicators that update in real-time.
- **Inline Editing:** Tasks can be edited in-place. An `isEditing` bouncer flag prevents multiple inputs from opening simultaneously.
- **Custom Modals & Checkboxes:** Pure CSS custom checkboxes with a mathematically drawn checkmark, and dynamic confirmation modals for deletes.
- **Dark Mode:** A seamlessly toggled dark mode theme that overrides CSS variables and is remembered by LocalStorage.
- **Responsive Design:** Features a sliding sidebar that acts as a full-screen overlay on mobile and a static column on desktop.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML 5 |
| Tailwind CSS |
| JavaScript |

## Project Structure

```text
JS-Todo-List/
│
├── assets/
│   ├── Font/           # Custom icon fonts
│   └── StyleSheet/
│       ├── master.css  # @theme variables & dark mode overrides
│       └── output.css # Compiled Tailwind CSS
│
└── index.html          # Main application file
```

## Author

**Ali Mirzaei** – Frontend Developer

- [GitHub](https://github.com/ali-mirzaei-dev)
- [LinkedIn](https://www.linkedin.com/in/ali-mirzaei-dev/)
- [Instagram](https://instagram.com/ali.mirzaei.dev)
- [ali.mirzaei.kt@gmail.com](mailto:ali.mirzaei.kt@gmail.com)