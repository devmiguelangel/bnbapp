import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAyl_x4qirQMnZKplWCD374_q27j8-BGxI",
  authDomain: "bnb-seguros-prod.firebaseapp.com",
  databaseURL: "https://bnb-seguros-prod.firebaseio.com",
  projectId: "bnb-seguros-prod",
  storageBucket: "",
  messagingSenderId: "525382114250",
};

const settings = {
  timestampsInSnapshots: true
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export const auth = firebase.auth();
export const db = firebase.firestore();