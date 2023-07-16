// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxcNAkjascgd5rcLepZV8d2h5Hk51rAp4",
  authDomain: "mygamelist-37437.firebaseapp.com",
  projectId: "mygamelist-37437",
  storageBucket: "mygamelist-37437.appspot.com",
  messagingSenderId: "453600735541",
  appId: "1:453600735541:web:f2ac7d954191d375b95c7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
