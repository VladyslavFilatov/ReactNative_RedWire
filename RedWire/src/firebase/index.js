import firebase from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}
  

const firebaseApp = initializeApp(config);
const DB = getFirestore(firebaseApp);
const usersCollection = collection(DB, 'users');
const articlesCollection = collection(DB, 'articles');
const videosCollection = collection(DB, 'videos');


const auth = getAuth(firebaseApp);
  
  
  
  export {
    DB,
    firebaseApp,
    usersCollection,
    auth,
    articlesCollection,
    videosCollection,
  };

