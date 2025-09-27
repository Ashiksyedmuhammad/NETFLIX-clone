import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD77jK9_wLlSF-ZWlcLz4go-ZQMD_vXAQA",
  authDomain: "netflix-clone-fcbea.firebaseapp.com",
  projectId: "netflix-clone-fcbea",
  storageBucket: "netflix-clone-fcbea.firebasestorage.app",
  messagingSenderId: "902166391097",
  appId: "1:902166391097:web:9b9a2c2f520ba5d0cf60e8",
  measurementId: "G-4YGES1VFG1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user)
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const logout = async () => {
  signOut(auth);
};

export {auth, db, login, signup,logout}
