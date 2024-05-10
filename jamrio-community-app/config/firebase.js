// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAc-lBlDTK5Rdxe97e4FCRu8DECI9m1Rlo',
  authDomain: 'jamrio-community.firebaseapp.com',
  projectId: 'jamrio-community',
  storageBucket: 'jamrio-community.appspot.com',
  messagingSenderId: '645340176056',
  appId: '1:645340176056:web:8c20c836e10fa6a3a51e4d',
  measurementId: 'G-RETE21MK8C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
