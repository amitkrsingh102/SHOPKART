import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrNB9OuKIw-AuAybGgNOIJj9LPX0wWgPM",
  authDomain: "shopping-app-f335b.firebaseapp.com",
  projectId: "shopping-app-f335b",
  storageBucket: "shopping-app-f335b.appspot.com",
  messagingSenderId: "568932617301",
  appId: "1:568932617301:web:c60027ad80ceb40e3258dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
