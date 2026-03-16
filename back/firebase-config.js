import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCBJUoOYmB_vTSB972aoAtTpnw8TEZTx90",
    authDomain: "to-do-app-d16ba.firebaseapp.com",
    projectId: "to-do-app-d16ba",
    storageBucket: "to-do-app-d16ba.firebasestorage.app",
    messagingSenderId: "621745383338",
    appId: "1:621745383338:web:cff8c8bf0e91ae153fedd3",
    measurementId: "G-TK90Q59JJ2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };