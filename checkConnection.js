import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeNshS54GEJmg98syy9b63XktJUmVhIyA",
  authDomain: "team18-pd.firebaseapp.com",
  projectId: "team18-pd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkConnection() {
  const docRef = doc(db, "test", "connection");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Raspberry Pi is connected!");
  } else {
    console.log("No connection detected.");
  }
}

checkConnection();
