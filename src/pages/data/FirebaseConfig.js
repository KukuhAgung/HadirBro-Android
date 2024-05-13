import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLIdA6cGR0t3h6YHhe0c_jK9qCAF6u-sA",
  authDomain: "hadirbro-af5e2.firebaseapp.com",
  projectId: "hadirbro-af5e2",
  storageBucket: "hadirbro-af5e2.appspot.com",
  messagingSenderId: "853743232968",
  appId: "1:853743232968:web:1ecfc121631a46e66442fd",
  measurementId: "G-GDLKQVHFBN",
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);