// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBTBapuf16thILlKyHEsycqzWuYycX3vXI",
  authDomain: "nexoeducativo-98149.firebaseapp.com",
  projectId: "nexoeducativo-98149",
  storageBucket: "nexoeducativo-98149.appspot.com",
  messagingSenderId: "1010725582007",
  appId: "1:1010725582007:web:6bded23c09575fc7670932"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

