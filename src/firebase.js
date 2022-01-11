import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoH3s7E2OvphK5KgZJTbdP92KxOOYLqyg",
    authDomain: "linkedin-139b8.firebaseapp.com",
    projectId: "linkedin-139b8",
    storageBucket: "linkedin-139b8.appspot.com",
    messagingSenderId: "959976944604",
    appId: "1:959976944604:web:8c95ce3ecb55f3b551d519"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, firebaseApp, provider};
export default db;