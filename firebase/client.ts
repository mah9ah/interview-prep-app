// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI3al_So47Wtjgr6rXA32GprFnoA28Bjs",
  authDomain: "preppath-b8c49.firebaseapp.com",
  projectId: "preppath-b8c49",
  storageBucket: "preppath-b8c49.firebasestorage.app",
  messagingSenderId: "119903498009",
  appId: "1:119903498009:web:b478fb33c7f729b9979f88",
  measurementId: "G-98RTTP6Y01"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)