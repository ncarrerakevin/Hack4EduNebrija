// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTsq6aUHLt66oAYMyBymJy_fMrCNGfe8Q",
  authDomain: "hack4edu-6c83c.firebaseapp.com",
  projectId: "hack4edu-6c83c",
  storageBucket: "hack4edu-6c83c.appspot.com",
  messagingSenderId: "439258650343",
  appId: "1:439258650343:web:a5dbe2ad7f4c1112337442",
  measurementId: "G-DF27ZFRVDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
