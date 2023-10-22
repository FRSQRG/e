// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSymu1I15EwBVI6CVlRoH_zRp2FfK1Er4",
  authDomain: "employeemanagement-fr.firebaseapp.com",
  projectId: "employeemanagement-fr",
  storageBucket: "employeemanagement-fr.appspot.com",
  messagingSenderId: "928835735608",
  appId: "1:928835735608:web:46c182dcddc3bca94b16cd",
  measurementId: "G-4QVY26NP06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics.app.automaticDataCollectionEnabled = true

// Initialize Firebase services
export const AUTH = getAuth(app);
export const GOOGLEAUTH = new GoogleAuthProvider();
export const PHONEAUTH = new PhoneAuthProvider(AUTH);
export const FIRESTORE = getFirestore(app);
export const STORAGE = getStorage(app);
export const USER = AUTH.currentUser;
