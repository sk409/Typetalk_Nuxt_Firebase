import firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: "chatnuxtfirebase.firebaseapp.com",
  databaseURL: "https://chatnuxtfirebase.firebaseio.com",
  projectId: "chatnuxtfirebase",
  storageBucket: "chatnuxtfirebase.appspot.com",
  messagingSenderId: "97924586402",
  appId: "1:97924586402:web:9c2f7a8b97adcbd56870fb",
  measurementId: "G-ZJEKN7SRLT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
