// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Needed for login
import { getFirestore } from "firebase/firestore"; // ✅ If you're using Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA3b5gNwlz_6LFympnH_FLQmR5X_3GXW44",
  authDomain: "elearn-clone-dev.firebaseapp.com",
  projectId: "elearn-clone-dev",
  storageBucket: "elearn-clone-dev.appspot.com",  // <-- corrected
  messagingSenderId: "572982114599",
  appId: "1:572982114599:web:548428b485a3eef89cd102",
  measurementId: "G-6NL40PMR8L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ These are important for sign-in and DB
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
