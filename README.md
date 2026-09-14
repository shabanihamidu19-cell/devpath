<<<<<<< HEAD
# devpath
=======
# DevPath 🚀

**Social network kwa programming learners Afrika Mashariki.**

Badala ya kuwa "Instagram for programmers," DevPath ni social network inayozunguka **mchakato wa kujifunza** — sio success, bali journey yenyewe.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| State | Zustand |
| Mobile | Capacitor 6 (Android + iOS) |
| Styling | CSS Modules |

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
# 1. Build project
npm run build

# 2. Ongeza Android platform
npm run cap:add:android

# 3. Sync files
npm run cap:sync

# 4. Fungua Android Studio
npm run cap:open:android
```

Kwenye Android Studio:
- **Build → Generate Signed APK** (kwa release)
- **Run → Run 'app'** (kwa testing)

---

## Muundo wa Project

```
devpath/
├── src/
│   ├── components/        # Shared components
│   │   ├── BottomNav.jsx  # Navigation ya chini
│   │   └── PostCard.jsx   # Post card component
│   ├── pages/             # Screens zote
│   │   ├── FeedPage.jsx       # Home feed
│   │   ├── ExplorePage.jsx    # Discover & buddies
│   │   ├── ChallengesPage.jsx # Learning challenges
│   │   ├── NotificationsPage.jsx
│   │   └── ProfilePage.jsx    # Developer journey
│   ├── stores/
│   │   └── useAppStore.js # Zustand global state
│   ├── styles/
│   │   └── global.css     # Design system tokens
│   ├── App.jsx
│   └── main.jsx
├── capacitor.config.json  # Capacitor settings
├── vite.config.js
└── index.html
```

---

## Features (MVP)

- ✅ **Feed** — Posts za aina 6: learn, bug, project, question, challenge, progress
- ✅ **Compose** — Andika post mpya na code block
- ✅ **Explore** — Study buddies + Projects showcase
- ✅ **Challenges** — 30-day learning tracks na day tracker
- ✅ **Notifications** — Arifa za real-time
- ✅ **Profile** — Journey, Projects, Badges, Streak

---

## Roadmap (Next Steps)

- [ ] Backend API (Supabase au Firebase)
- [ ] Auth (phone number + OTP — kwa East Africa)
- [ ] M-Pesa / Airtel Money integration kwa premium features
- [ ] Push notifications (Capacitor Push)
- [ ] Real-time feed (WebSockets)
- [ ] Kiswahili full i18n
- [ ] Offline mode
- [ ] Code syntax highlighting (Prism.js)

---

## Mchango (Contributing)

PR zote zinakaribishwa! Angalia `CONTRIBUTING.md` kwa maelezo.

---

## Leseni

MIT License — Huru kutumia, kubadilisha, na kusambaza.

---

*Ulioundwa na moyo wa East Africa 🌍*
>>>>>>> 0581705 (Initial commit)
