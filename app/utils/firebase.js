import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyA7VeQyxncKMnY_b-KTrzMInlI3VFhjLqQ",
  authDomain: "bnb-seguros.firebaseapp.com",
  databaseURL: "https://bnb-seguros.firebaseio.com",
  projectId: "bnb-seguros",
  storageBucket: "",
  messagingSenderId: "2658697375"
};

const settings = {
  timestampsInSnapshots: true
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export const auth = firebase.auth();
export const db = firebase.firestore();