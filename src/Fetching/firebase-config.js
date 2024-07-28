// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK_QckpPKuiCeMTqE2lHp8YVDfc3_7Ngc",
  authDomain: "financialsmotorsdb.firebaseapp.com",
  projectId: "financialsmotorsdb",
  storageBucket: "financialsmotorsdb.appspot.com",
  messagingSenderId: "788119858973",
  appId: "1:788119858973:web:c5a53ee615c82f2b1bbbf4",
  measurementId: "G-LM22J3QFJ8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);