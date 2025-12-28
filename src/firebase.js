import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBycnXHt2xQL4J6AQRWVc-4uG026c9Muis",
    authDomain: "querypopquiz.firebaseapp.com",
    projectId: "querypopquiz",
    storageBucket: "querypopquiz.firebasestorage.app",
    messagingSenderId: "585845404922",
    appId: "1:585845404922:web:107e79f14959aff3afc543",
    measurementId: "G-2NCMGQLNZL"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
