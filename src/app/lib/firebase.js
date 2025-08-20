import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUzjWBK3gPnQ9FKtXi4tWEvmJeFGtmr2c",
  authDomain: "my-nextjs-app-a1cea.firebaseapp.com",
  projectId: "my-nextjs-app-a1cea",
  storageBucket: "my-nextjs-app-a1cea.firebasestorage.app",
  messagingSenderId: "1068328365235",
  appId: "1:1068328365235:web:3b6170d1343149771bd4c6",
  measurementId: "G-Y27K57C2Z5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();