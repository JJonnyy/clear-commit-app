# Clear Commit

Optimize your code review process with an intelligent comment-cleaning tool. Make your comments cleaner and more professional.

[LivePreview](https://clear-commit-app.vercel.app/) Frontend

![Demo](/clear-commit-frontend/public/promo.png)

## 🚀 Features

- **Automatic Code Cleanup**: Remove unnecessary comments and debug logs.
- **Dual Authentication System**:
  - Server-side (sessions + cookies)
  - Client-side via Firebase (tokens)
- **Integration with Popular Developer Tools**.
- **Adaptive Interface**: Theme support for light and dark mode.

---

## 🛠 Technologies

### Frontend (`clear-commit-frontend`)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)](https://vitejs.dev/)

- **Core stack:**
  - React
  - Vite (build tool)
  - Tailwind CSS
  - Framer Motion (animations)
  - React Router (navigation)

- **Integrations:**
  - Firebase (authentication)
  - Axios (HTTP client)

### Backend (`clear-commit-server`)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.15.0-339933?logo=nodedotjs)](https://nodejs.org/)

- **Core stack:**
  - Node.js + Express.js (server)
  - PostgreSQL (database)
  - Multer (file processing)
  - JWT + bcryptjs (security)
  - Express Session

- **Features:**
  - Session authentication
  - CORS policies
  - Request logging

---

## 📦 Installation

### 1. Clone the repository

```sh
git clone https://github.com/your-username/clear-commit.git
cd clear-commit
```

### 2. Backend Setup

```
cd clear-commit-server
cp .env.example
``` 
#### .env # Update environment variables
#### Run database migrations
``` 
npm install
npm run migrate 
npm start
```

### 3. Frontend Setup

#### Update environment variables
#### Before starting, make sure to set the following keys in the .env file:
#### VITE_API_URL=http://localhost:8000
#### VITE_API_URL_UPLOADS=http://localhost:8000/uploads
#### VITE_API_GOOGLE_OAUTH_KEY=""
```
cd clear-commit-frontend
npm install
npm run dev
```

---

## 📝 Scripts

### Frontend

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Lint the code            |
| `npm run preview` | Preview production build |

### Backend

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm start`         | Start the backend server       |
| `npm run migrate`   | Run database migrations        |
| `npm run start:dev` | Start the backend with nodemon |


---

## 🔐 Authentication

This project supports both **session-based authentication** (server-side) and **JWT authentication** (client-side via Firebase).

