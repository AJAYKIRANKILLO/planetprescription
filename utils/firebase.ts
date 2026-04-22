
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVsKKqofg2kQ8yMrMhZ7NwVzLLaQgKhkE",
  authDomain: "planetprescription-55486-1fde6.firebaseapp.com",
  projectId: "planetprescription-55486-1fde6",
  storageBucket: "planetprescription-55486-1fde6.appspot.com",
  messagingSenderId: "570528970360",
  appId: "1:570528970360:web:f80feea93770a1b0105f8d",
  measurementId: "G-WR2VC8VF89"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
