import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTHDOMAIN,
  projectId:process.env.REACT_APP_PROJECTID,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
  appId:process.env.REACT_APP_APPID
  // apiKey: "AIzaSyCl4wvV1PHDRiLtG7CxfEdmv3IZ9UenZ5g",
  // authDomain: "fir-chat-93f48.firebaseapp.com",
  // projectId: "fir-chat-93f48",
  // storageBucket: "fir-chat-93f48.appspot.com",
  // messagingSenderId: "1055955907691",
  // appId: "1:1055955907691:web:4c533b4e87aff535356d2e"
};

console.log(firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();