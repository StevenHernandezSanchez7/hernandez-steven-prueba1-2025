import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwMFSerObsZmfBCbIpYdRf0q1YrQXHGA8",
  authDomain: "hernandez-steven-prueba1-2191c.firebaseapp.com",
  projectId: "hernandez-steven-prueba1-2191c",
  storageBucket: "hernandez-steven-prueba1-2191c.firebasestorage.app",
  messagingSenderId: "284592690302",
  appId: "1:284592690302:web:2edf6e7ba2a1026bc8f42f",
  measurementId: "G-16S9YM1NH4"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };