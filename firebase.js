// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeNshS54GEJmg98syy9b63XktJUmVhIyA",
  authDomain: "team18-pd.firebaseapp.com",
  databaseURL: "https://team18-pd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "team18-pd",
  storageBucket: "team18-pd.appspot.com",
  messagingSenderId: "1060805753867",
  appId: "1:1060805753867:web:209fc5d637bcd1fae9db0e",
  measurementId: "G-SJ3JX7SHRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, storage, database };
