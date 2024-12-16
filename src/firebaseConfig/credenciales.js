// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, collection, addDoc} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoCwCdl7LqGSMdAVetCpGGntbb4Sv3jaQ",
  authDomain: "todoreact-26381.firebaseapp.com",
  projectId: "todoreact-26381",
  storageBucket: "todoreact-26381.firebasestorage.app",
  messagingSenderId: "636402403769",
  appId: "1:636402403769:web:7f56751be6926a34860e68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth = getAuth();

export {createUserWithEmailAndPassword};
export {signInWithEmailAndPassword};
export {onAuthStateChanged }

export {db}
