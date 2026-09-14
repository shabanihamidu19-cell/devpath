# DevPath 🚀

**Social network kwa programming learners Afrika Mashariki.**

Badala ya kuwa "Instagram for programmers," DevPath ni social network inayozunguka **mchakato wa kujifunza** — sio success, bali journey yenyewe.

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18 + Vite             |
| Routing    | React Router v6             |
| State      | Zustand                     |
| Mobile     | Capacitor 6 (Android + iOS) |
| Styling    | CSS Modules + Design System |

---

## Kuanza (Development)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Kujenga APK (Android)

### Mahitaji
- Node.js 18+
- Android Studio + Android SDK
- Java JDK 17+

### Hatua

```bash
# 1. Build web assets
npm run build

# 2. Ongeza Android platform (mara ya kwanza tu)
npm run cap:add:android

# 3. Sync files to native project
npm run cap:sync

# 4. Fungua Android Studio
npm run cap:open:android
```

Kwenye Android Studio:
- **Build → Generate Signed Bundle / APK** (kwa release)
- **Run → Run 'app'** (kwa testing)

> **Note:** Capacitor hutumia folder `dist/` (baada ya `vite build`) kama `webDir`. Hii ndiyo standard ya kisasa (siyo `www/` kama Cordova ya zamani).

---

## Muundo wa Project

```
devpath/
├── src/
│   ├── components/        # Shared components
│   │   ├── BottomNav.jsx
│   │   ├── Icons.jsx         # Icon system
│   │   └── PostCard.jsx
│   ├── pages/             # Screens zote
│   │   ├── FeedPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── ChallengesPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   └── ProfilePage.jsx
│   ├── stores/
│   │   └── useAppStore.js   # Zustand global state
│   ├── styles/
│   │   └── global.css       # Design system tokens
│   ├── App.jsx
│   └── main.jsx
├── capacitor.config.json
├── vite.config.js
└── index.html
```

---

## Features (MVP)

- ✅ **Feed** — Posts za aina 6: learn, bug, project, question, challenge, progress
- ✅ **Compose** — Andika post mpya na code block
- ✅ **Explore** — Study buddies + Projects showcase
- ✅ **Challenges** — 30-day learning tracks na day tracker
- ✅ **Notifications** — Arifa + unread badge
- ✅ **Profile** — Journey, Projects, Badges, Streak
- ✅ **Icon System** — Clean inline SVG icons

---

## Roadmap (Next Steps)

- [ ] Backend API (Supabase au Firebase)
- [ ] Auth (phone number + OTP — kwa East Africa)
- [ ] M-Pesa / Airtel Money integration kwa premium features
- [ ] Push notifications (Capacitor Push)
- [ ] Real-time feed (WebSockets)
- [ ] Kiswahili full i18n
- [ ] Offline mode + local persistence
- [ ] Code syntax highlighting (Prism.js / highlight.js)

---

## Mchango (Contributing)

PR zote zinakaribishwa!

---

## Leseni

MIT License — Huru kutumia, kubadilisha, na kusambaza.

---

*Ulioundwa na moyo wa East Africa 🌍*
