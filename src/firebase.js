import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBCP8zyM-IOpUl7LeZYlMyOrJLnjW1tQq8",
  authDomain: "mail-box-feaa3.firebaseapp.com",
  databaseURL: "https://mail-box-feaa3-default-rtdb.firebaseio.com",
  projectId: "mail-box-feaa3",
  storageBucket: "mail-box-feaa3.appspot.com",
  messagingSenderId: "60053835149",
  appId: "1:60053835149:web:58575f3681437c589001c4",
  measurementId: "G-QW79376S6H"
};

const app = initializeApp(firebaseConfig);
const  firestore = getFirestore(app);

export default firestore;
