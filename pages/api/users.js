import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';


// Login function
const login = async (email, password, notifToken) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's document with the notification token
    await setDoc(doc(db, "users", user.uid), { notifToken: notifToken }, { merge: true });
    
    // Return the user object on successful login and Firestore update
    const userData = await getDoc(doc(db, "users", user.uid));
    console.log(userData.data());
    return userData.data();
  } catch (error) {
    // Handle or return the error appropriately
    console.error("Login error:", error);
    if (error.code == "auth/invalid-email") Alert.alert("Invalid Email");
    throw error; // Or return a specific message or object
  }
};

const signup = async (email, password, fname, lname, phoneNumber, interests) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const data = {
      uid: user.uid,
      fname: fname,
      lname: lname,
      email: email,
      phone: phoneNumber,
      admin: false,
      birthday: 0,
      devToken: 0,
      downloadURL: "",
      notifications: [],
      gender: "",
      interests: interests
    };
    await setDoc(doc(db, "users", user.uid), data);

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); 
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    }, reject);
  });
};

const getCurrentUserData = async () => {
  // console.log(auth.currentUser);
  const userRef = await getDoc(doc(db, "users", auth.currentUser.uid));
  // console.log(userRef.data());
  // userRef.forEach((doc) => {
  //   console.log(doc.data());
  // })
  return userRef.data();
}


export { login, signup , getCurrentUser, getCurrentUserData};