// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAS5XgS0x3o8CTxFaw-Jp3eBXmJvi7ass",
  authDomain: "melaknow-a2f95.firebaseapp.com",
  projectId: "melaknow-a2f95",
  storageBucket: "melaknow-a2f95.appspot.com",
  messagingSenderId: "899997257467",
  appId: "1:899997257467:web:ed851ab222f2a0a6d16a5e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

