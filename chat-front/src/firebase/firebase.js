import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAgxnwvkLGbKDd9hKAfAdnZIPHBLqDCYAw",
    authDomain: "react-chat-13e83.firebaseapp.com",
    projectId: "react-chat-13e83",
    storageBucket: "react-chat-13e83.appspot.com",
    messagingSenderId: "227495926693",
    appId: "1:227495926693:web:9dd705ab5a15a7a631a64c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
