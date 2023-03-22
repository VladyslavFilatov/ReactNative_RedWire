import firebase from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyDXM69_Gu5fujPsO71epKV9foVIyufUYZg",
    authDomain: "redwire-89a48.firebaseapp.com",
    projectId: "redwire-89a48",
    storageBucket: "redwire-89a48.appspot.com",
    messagingSenderId: "626267553389",
    appId: "1:626267553389:web:e30440fa3ab02dff91c964",
    measurementId: "G-6DE4VQX5L6"
}

//firebase.initializeApp(config);

/* const firebaseApp = initializeApp(config);
const DB = getFirestore(firebaseApp);
const usersCollection = collection(DB, 'users');

export {
  firebaseApp,
  usersCollection
} */

// Importing the default export

/* if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } */
  

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

