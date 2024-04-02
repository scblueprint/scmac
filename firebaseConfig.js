import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkqrT3nByTUhGITQQscLKhMpYstS8U2cw",
  authDomain: "blueprint-scmac.firebaseapp.com",
  projectId: "blueprint-scmac",
  storageBucket: "blueprint-scmac.appspot.com",
  messagingSenderId: "1038327778671",
  appId: "1:1038327778671:web:1d326ad8e79f18be11ac9a",
  measurementId: "G-WX6CMZNQB3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

// module.exports = { db, auth, storage };
export { db };