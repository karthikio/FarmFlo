// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5axY4Iy9-OsmGKpENrkX8T-5737B0k4Y",
  authDomain: "farmflo-8e19e.firebaseapp.com",
  projectId: "farmflo-8e19e",
  storageBucket: "farmflo-8e19e.appspot.com",
  messagingSenderId: "705465625123",
  appId: "1:705465625123:web:6a8ce50eaf866ea3759f96",
  measurementId: "G-JVKY4DER3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
