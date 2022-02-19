import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxKH_2ChV_S9iQ5Dd5JeUgEYQFAVM14WY",
  authDomain: "sql-demos-e3a3a.firebaseapp.com",
  projectId: "sql-demos-e3a3a",
  storageBucket: "sql-demos-e3a3a.appspot.com",
  messagingSenderId: "542254127403",
  appId: "1:542254127403:web:01be5f1da2f713901acd6e",
  measurementId: "G-790MPV6CBY",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
