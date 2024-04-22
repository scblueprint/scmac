import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
import messaging from '@react-native-firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyDkqrT3nByTUhGITQQscLKhMpYstS8U2cw",
  authDomain: "blueprint-scmac.firebaseapp.com",
  projectId: "blueprint-scmac",
  storageBucket: "blueprint-scmac.appspot.com",
  messagingSenderId: "1038327778671",
  appId: "1:1038327778671:web:1d326ad8e79f18be11ac9a",
  measurementId: "G-WX6CMZNQB3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
console.log('Firebase initializedd:', app.name);

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
console.log("Firebase Auth Initialized: ", auth);
const firebaseMessaging = messaging();

// Optionally, you may want to request user permission for notifications
// This is typically done at the time of app launch or during the appropriate user flow
async function requestUserPermission() {
  const authorizationStatus = await firebaseMessaging.requestPermission({
    provisional: false,
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    criticalAlert: false,
    sound: true,
  });

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('Authorization status:', authorizationStatus);
  }
}

// You may want to call this function in your app's component lifecycle
requestUserPermission();
const storage = getStorage(app);

module.exports = { app, db, auth, storage, firebaseMessaging };
