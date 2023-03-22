import { usersCollection, articlesCollection, DB, videosCollection } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { collection, doc, getDoc ,setDoc, updateDoc, query, where, orderBy, limit, getDocs, startAfter} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const auth = getAuth();
export const registerUser = async ({ email, password }) => {
  try {
    
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log('user created')
    console.log('Response:', response);
    const { user } = response;

    console.log('good3')
    const userProfile = {
      uid: user.uid,
      email: email,
    };

    // Create a reference to the user document in Firestore
const userRef = doc(collection(DB, 'users'), user.uid);

// Save the user data to Firestore
await setDoc(userRef, userProfile);

    console.log('good4', usersCollection);
    console.log('test')
    const docRef = doc(DB, "users", user.uid);
    const docData = await getDoc(docRef);
    console.log(user)
    console.log(docData.data())
    return { isAuth: true, user: userProfile };
  } catch (error) {
    console.log('Error creating user:', error.message);
    return { error: error.message};
  }
};


export const loginUser = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in');
    console.log('Response:', response);
    const { user } = response;

    const userRef = doc(collection(DB, 'users'), user.uid);
    const docData = await getDoc(userRef);

    const userProfile = {
      uid: user.uid,
      email: user.email,
      ...docData.data(),
    };

    // Store the user authentication state in AsyncStorage
    await AsyncStorage.setItem('userAuthState', JSON.stringify(userProfile));

    return { isAuth: true, user: userProfile };
  } catch (error) {
    console.log('Error logging in user:', error.message);
    return { error: error.message };
  }
};

export const autoSignIn = async () => {
  return new Promise(async (resolve, reject) => {
    // Check if the user authentication state is stored in AsyncStorage
    const userAuthState = await AsyncStorage.getItem('userAuthState');
    if (userAuthState) {
      const user = JSON.parse(userAuthState);
      console.log('User authenticated:', user);
      const userRef = doc(collection(DB, 'users'), user.uid);
      const docData = await getDoc(userRef);

      const userProfile = {
        uid: user.uid,
        email: user.email,
        ...docData.data(),
      };

      resolve({ isAuth: true, user: userProfile });
    } else {
      console.log('User not authenticated');
      resolve({ isAuth: false, user: null });
    }
  });
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    
    // Clear the user authentication state from AsyncStorage
    await AsyncStorage.removeItem('userAuthState');

    return { success: true };
  } catch (error) {
    console.log('Error signing out user:', error.message);
    return { error: error.message };
  }
};


export const updateUserData = async (values, user) => {
  try {
    const userRef = doc(DB, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      await updateDoc(userRef, {
        ...values,
      });

      const updatedUserData = {
        ...userSnapshot.data(),
        ...values,
      };

      return { user: updatedUserData, error: null };
    } else {
      throw new Error('User does not exist in the database.');
    }
  } catch (error) {
    console.log('Error', error);
    return { user: user, error: error };
  }
};

///// articles

export const getArticles = async() => {
    try{
        const q = query(collection(DB, 'articles'), where('public', '==', 1), orderBy('createdAt'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const lastPostVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return { posts: articles, lastPostVisible: lastPostVisible };
    } catch(error){
        console.log(error);
        return error;
    }
}

export const getMoreArticles = async(articles) => {
    let posts = [...articles.posts];
    let lastPostVisible = articles.lastPostVisible;

    try {
        if (lastPostVisible) {
            const q = query(
                collection(DB, 'articles'),
                where('public', '==', 1),
                orderBy('createdAt'),
                startAfter(lastPostVisible),
                limit(2)
            );

            const response = await getDocs(q);

            lastPostVisible = response.docs[response.docs.length-1];
            const newArticles = response.docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return { posts:[...posts,...newArticles], lastPostVisible };
        }
        return { posts, lastPostVisible };
    } catch(error) {
        console.log(error);
        return { posts, lastPostVisible };
    }
}

///// videos

export const getVideos = async() => {
  try{
      const q = query(collection(DB, 'videos'), where('public', '==', 1), orderBy('createdAt'), limit(3));
      const querySnapshot = await getDocs(q);
      
      const lastVideoVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const videos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
      }));

      return { videos: videos, lastVideoVisible: lastVideoVisible };
  } catch(error){
      console.log(error);
      return error;
  }
}

export const getMoreVideos = async(articles) => {
  let videos = [...articles.videos];
  let lastVideoVisible = articles.lastVideoVisible;

  try {
      if (lastVideoVisible) {
          const q = query(
              collection(DB, 'videos'),
              where('public', '==', 1),
              orderBy('createdAt'),
              startAfter(lastVideoVisible),
              limit(2)
          );

          const response = await getDocs(q);

          lastVideoVisible = response.docs[response.docs.length-1];
          const newArticles = response.docs.map( doc => ({
              id: doc.id,
              ...doc.data()
          }));
          return { videos:[...videos,...newArticles], lastVideoVisible };
      }
      return { videos, lastVideoVisible };
  } catch(error) {
      console.log(error);
      return { videos, lastVideoVisible };
  }
}
