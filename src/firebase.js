
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdv_J6D2jfUdwCqydIhkwsdsVG5ot3kPE",
  authDomain: "web-app-b7f01.firebaseapp.com",
  projectId: "web-app-b7f01",
  storageBucket: "web-app-b7f01.appspot.com",
  messagingSenderId: "877176817288",
  appId: "1:877176817288:web:9b23853e92d4ce9b36c13d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
