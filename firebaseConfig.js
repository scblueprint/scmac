// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqrT3nByTUhGITQQscLKhMpYstS8U2cw",
  authDomain: "blueprint-scmac.firebaseapp.com",
  projectId: "blueprint-scmac",
  storageBucket: "blueprint-scmac.appspot.com",
  messagingSenderId: "1038327778671",
  appId: "1:1038327778671:web:1d326ad8e79f18be11ac9a",
  measurementId: "G-WX6CMZNQB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);