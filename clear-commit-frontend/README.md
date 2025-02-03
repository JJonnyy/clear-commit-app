# Clear Commit

✨ **Optimize your code review process** with an intelligent comment-cleaning tool. Make your comments cleaner and more professional.

![Demo](https://ibb.co/WN5QnxfC) <!-- Replace with actual screenshot -->

## 🚀 Features
- **Automatic code cleanup:** Remove unnecessary comments and debug logs
- **Dual authentication system:**
  - Server-side (sessions + cookies)
  - Client-side via Firebase (tokens)
- Integration with popular developer tools
- Adaptive interface with theme support

## 🛠 Technologies

### Frontend (`clear-commit-frontend`)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)](https://vitejs.dev/)
[![Mantine](https://img.shields.io/badge/Mantine-7.16.2-339AF0?logo=mantine)](https://mantine.dev/)

- **Core stack:**
  - React + TypeScript
  - Vite (build tool)
  - Tailwind CSS + Mantine (styling)
  - Framer Motion (animations)
  - React Router (navigation)

- **Integrations:**
  - Firebase (authentication)
  - Axios (HTTP client)

### Backend (`clear-commit`)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-5.1.7-003B57?logo=sqlite)](https://www.sqlite.org/)

- **Core stack:**
  - Express.js (server)
  - SQLite3 (database)
  - Multer (file processing)
  - JWT + bcryptjs (security)

- **Features:**
  - Session authentication
  - CORS policies
  - Request logging

## ⚙️ Installation

### Frontend
```bash
cd clear-commit-frontend
npm install
npm run dev
```

### Backend
```bash
cd clear-commit-server
npm install
npm run start
```