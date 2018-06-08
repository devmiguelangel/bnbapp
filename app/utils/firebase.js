import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA7VeQyxncKMnY_b-KTrzMInlI3VFhjLqQ",
  authDomain: "bnb-seguros.firebaseapp.com",
  databaseURL: "https://bnb-seguros.firebaseio.com",
  projectId: "bnb-seguros",
  storageBucket: "",
  messagingSenderId: "2658697375"
};

firebase.initializeApp(config);

export const auth = firebase.auth();