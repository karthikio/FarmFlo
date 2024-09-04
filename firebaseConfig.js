// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


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


export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
