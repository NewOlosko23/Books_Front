import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx4fXTOxz3BLll9bzbAVBkI0AQLLSqJ3E",
  authDomain: "books-8d701.firebaseapp.com",
  projectId: "books-8d701",
  storageBucket: "books-8d701.appspot.com",
  messagingSenderId: "735715747489",
  appId: "1:735715747489:web:455aa2b5613b2eee7e32e0",
  measurementId: "G-F66P7650RB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Storage (if needed)
