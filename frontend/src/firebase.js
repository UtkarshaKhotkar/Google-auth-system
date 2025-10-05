import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzi7gl-ZtZOmj_Todorx6d3_rplZ-ogow",
  authDomain: "auth-system-a00e3.firebaseapp.com",
  projectId: "auth-system-a00e3",
  storageBucket: "auth-system-a00e3.firebasestorage.app",
  messagingSenderId: "1083591686961",
  appId: "1:1083591686961:web:c53ee73e469e3503bece10",
  measurementId: "G-SQ576DDGE5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

