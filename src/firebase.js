// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJp3jV5h6ROO3xNmjLKUsadJyJjL3vpVo",
  authDomain: "pure-stronghold-454710-h0.firebaseapp.com",
  projectId: "pure-stronghold-454710-h0",
  storageBucket: "pure-stronghold-454710-h0.firebasestorage.app",
  messagingSenderId: "1014177963292",
  appId: "1:1014177963292:web:e5d5bed4b2cae0f90e2ed9",
  measurementId: "G-LJ2DY9XKYL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);
const auth=getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db,storage,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword };