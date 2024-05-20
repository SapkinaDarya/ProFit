import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCXCNvb1wqx4d9loV9hx3p0-X-ErXNA5JI",
  authDomain: "profit-7ff14.firebaseapp.com",
  projectId: "profit-7ff14",
  storageBucket: "profit-7ff14.appspot.com",
  messagingSenderId: "565515699311",
  appId: "1:565515699311:web:1ba5c7bbc972f8b474799a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);