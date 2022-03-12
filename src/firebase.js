// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQTuF-Xt6Wngjpe_32jmTSY-xOPLIK-NE",
  authDomain: "cuidateapp-27dc8.firebaseapp.com",
  databaseURL: "https://cuidateapp-27dc8-default-rtdb.firebaseio.com",
  projectId: "cuidateapp-27dc8",
  storageBucket: "cuidateapp-27dc8.appspot.com",
  messagingSenderId: "276780710604",
  appId: "1:276780710604:web:2245d7ad974bb2dc496069",
  measurementId: "G-2BY7J762HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);