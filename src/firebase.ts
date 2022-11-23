// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDoNpHvCpIi8b-TQ4tx_8xGytfABU1EIo",
  authDomain: "todo-online-b2c28.firebaseapp.com",
  projectId: "todo-online-b2c28",
  storageBucket: "todo-online-b2c28.appspot.com",
  messagingSenderId: "1071239893318",
  appId: "1:1071239893318:web:7094f6e6575b05aba45547",
  measurementId: "G-2SHJ19NWSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export {db, storage}