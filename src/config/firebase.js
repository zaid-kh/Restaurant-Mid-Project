// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvXyvmPvYfXPnYGwXM0Hl73Fd5ae4hBGU",
  authDomain: "restaurant-react-appleseeds.firebaseapp.com",
  projectId: "restaurant-react-appleseeds",
  storageBucket: "restaurant-react-appleseeds.appspot.com",
  messagingSenderId: "360103964538",
  appId: "1:360103964538:web:e5fd6cf49cad639a29b0c3",
  measurementId: "G-XRBD7SCD9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
