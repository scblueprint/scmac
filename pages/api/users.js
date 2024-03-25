import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Login function
const login = async (email, password, notifToken) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's document with the notification token
    await setDoc(doc(db, "users", user.uid), { notifToken: notifToken }, { merge: true });
    
    // Return the user object on successful login and Firestore update
    return user;
  } catch (error) {
    // Handle or return the error appropriately
    console.error("Login error:", error);
    throw error; // Or return a specific message or object
  }
};

const signup = async (email, password, fname, lname, phoneNumber) => {
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


export { login, signup , getCurrentUser};