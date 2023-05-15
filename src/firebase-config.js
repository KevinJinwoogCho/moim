// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfe1I-J2BQ442_IadTKsuMS15j5o0r1Nw",
  authDomain: "assembly-kc.firebaseapp.com",
  projectId: "assembly-kc",
  storageBucket: "assembly-kc.appspot.com",
  messagingSenderId: "399809699798",
  appId: "1:399809699798:web:ce3f1e015808b092f88e77",
  measurementId: "G-W2594YHNKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// export so we can access db variable outside the file
export const db = getFirestore(app)
