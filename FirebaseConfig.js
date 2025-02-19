// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4hw0JI7bHwa5Cb9kYwwqR8Rc8yvOrNJk",
  authDomain: "calendarapp-b5c71.firebaseapp.com",
  projectId: "calendarapp-b5c71",
  storageBucket: "calendarapp-b5c71.firebasestorage.app",
  messagingSenderId: "506934077686",
  appId: "1:506934077686:web:ef39a22465c5d63d2824d7",
  measurementId: "G-SDP7WCH7C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);