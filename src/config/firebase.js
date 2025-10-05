// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzi7gl-ZtZOmj_Todorx6d3_rplZ-ogow",
    authDomain: "auth-system-a00e3.firebaseapp.com",
    projectId: "auth-system-a00e3",
    storageBucket: "auth-system-a00e3.firebasestorage.app",
    messagingSenderId: "1083591686961",
    appId: "1:1083591686961:web:c53ee73e469e3503bece10",
    measurementId: "G-SQ576DDGE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Set custom parameters to help with CORS issues
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export default app;