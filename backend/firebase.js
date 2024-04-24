// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJgyOGj-5wE5oJUve3an3JWLOFJeqOEqU",
  authDomain: "lingio-connect.firebaseapp.com",
  projectId: "lingio-connect",
  storageBucket: "lingio-connect.appspot.com",
  messagingSenderId: "1053916892280",
  appId: "1:1053916892280:web:cc9f56fcb41f7522a1718d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app