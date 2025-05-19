// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// import{getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: String(import.meta.env.VITE_API_KEY),
//   authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
//   projectId: String(import.meta.env.VITE_PROJECTID),
//   storageBucket: String(import.meta.env.VITE_STROAGEBUCKET),
//   messagingSenderId: String(import.meta.env.VITE_MSG),
//   appId: String(import.meta.env.VITE_APPID)
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app); 
// const db = getFirestore(app); // Firestore
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// export { storage, db ,auth,provider, signInWithPopup};
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential, // ✅ Add this
} from "firebase/auth";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_STROAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_MSG),
  appId: String(import.meta.env.VITE_APPID),
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  storage,
  db,
  auth,
  provider,
  signInWithPopup,
  signInWithCredential, // ✅ Export it for use in login
  GoogleAuthProvider      // ✅ Export it directly for advanced use if needed
};

