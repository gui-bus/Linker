import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw3tDQCvleX7TpmTKCjMlAOwzeH0ac77M",
  authDomain: "linker-b0608.firebaseapp.com",
  projectId: "linker-b0608",
  storageBucket: "linker-b0608.appspot.com",
  messagingSenderId: "822467564703",
  appId: "1:822467564703:web:b72ed27fe6909804ae3eaa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
