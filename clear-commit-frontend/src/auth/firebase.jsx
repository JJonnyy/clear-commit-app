import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const API_KEY = import.meta.env.VITE_API_GOOGLE_OAUTH_KEY;

let firebaseInitialized = false;
let app;
let googleAuthProvider;

if (API_KEY) {
  try {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: "react-2badb.firebaseapp.com",
      projectId: "react-2badb",
      storageBucket: "react-2badb.firebasestorage.app",
      messagingSenderId: "965082478972",
      appId: "1:965082478972:web:564d9016981a950ab48cf9"
    };

    app = initializeApp(firebaseConfig);
    googleAuthProvider = new GoogleAuthProvider();
    firebaseInitialized = true;
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { app, googleAuthProvider, firebaseInitialized };