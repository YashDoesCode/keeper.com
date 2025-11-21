![Navigation Bar](https://github.com/user-attachments/assets/ad68646c-14ff-4499-8b16-c3a5fc1d709d)

# Project Keeper -Encryped. Empowered. Eternal
#### A Standalone Security Solution

DOM Structure  [Latest]
html
└── body
    ├── #app (Main Wrapper)
    │   ├── header (Injected via JS)
    │   │   ├── nav.glass
    │   │   └── mobile-menu
    │   │
    │   ├── section#home-hero
    │   │   ├── video#hero-video (Background)
    │   │   └── div.hero-content
    │   │       ├── h1 (Title)
    │   │       └── form.waitlist-inline
    │   │
    │   ├── section#partners
    │   │   └── div.partners-track (Infinite Scroll)
    │   │
    │   ├── section#features
    │   │   └── div.capabilities-grid
    │   │       ├── card (Password Manager)
    │   │       ├── card (VPN)
    │   │       └── card (File Encryption)
    │   │
    │   ├── section#ai-defense
    │   │   └── div.visual-overlay
    │   │
    │   └── section#download
    │       └── div.device-gallery
    │
    ├── dialog#waitlistDrawer (Hidden Popup)
    │   └── form#waitlistForm
    │
    └── div#toast (Notification Popups)
```
*   **JSX**: Writing HTML inside JavaScript.
*   **Props**: Passing data down to components (like passing a title to a Card).
*   **Hooks**: `useState` (for variables that change) and `useEffect` (for things like the scroll observer).
