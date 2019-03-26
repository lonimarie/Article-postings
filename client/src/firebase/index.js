import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOsV9f9PXQ0sCdOcIi_RIiWv3kyk5fjtU",
    authDomain: "react-e5aa3.firebaseapp.com",
    databaseURL: "https://react-e5aa3.firebaseio.com",
    projectId: "react-e5aa3",
    storageBucket: "react-e5aa3.appspot.com",
    messagingSenderId: "118826411397"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }