import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDuOvaEdxohEImLFvDj2oK_7sBMxo9qHY",
    authDomain: "todoapp-4f247.firebaseapp.com",
    projectId: "todoapp-4f247",
    storageBucket: "todoapp-4f247.appspot.com",
    messagingSenderId: "777444148219",
    appId: "1:777444148219:web:be89f1a2dd9e1be3cf415e",
    measurementId: "G-619DCS0XKP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);