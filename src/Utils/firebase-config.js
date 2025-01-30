// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider,GithubAuthProvider} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBVh45sfNZ8jzSoe5fUj5jh63YfAO2tcls",
    authDomain: "template-forge.firebaseapp.com",
    projectId: "template-forge",
    storageBucket: "template-forge.firebasestorage.app",
    messagingSenderId: "291617426552",
    appId: "1:291617426552:web:4d9ae17efb8efba5fb318d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth()
export const googleProvider=await new GoogleAuthProvider();
export const githubProvider=await new GithubAuthProvider();