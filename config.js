import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyD7_AfXtX2jM2OaB2aDKrQLmog-J2H37IE",
    authDomain: "barter-app-28f3b.firebaseapp.com",
    databaseURL: "https://barter-app-28f3b.firebaseio.com",
    projectId: "barter-app-28f3b",
    storageBucket: "barter-app-28f3b.appspot.com",
    messagingSenderId: "687430326567",
    appId: "1:687430326567:web:8afec68bb223c74de73102"
    
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();