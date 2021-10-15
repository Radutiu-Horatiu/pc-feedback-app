import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgRg1rfmdugSi7JkvJoWu2JFJYLqdLqHI",
  authDomain: "pc-feedback-app.firebaseapp.com",
  projectId: "pc-feedback-app",
  storageBucket: "pc-feedback-app.appspot.com",
  messagingSenderId: "894728594198",
  appId: "1:894728594198:web:6041ffc74f6eeaf6a4a637"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { auth, db };
