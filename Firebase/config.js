import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    //Paste Your firebase config here
   
    apiKey: "AIzaSyAAN81w_51XNVW2bACvHBTRHQc64-vLx3M",
    authDomain: "acube-d0771.firebaseapp.com",
    projectId: "acube-d0771",
    storageBucket: "acube-d0771.appspot.com",
    messagingSenderId: "322072078310",
    appId: "1:322072078310:web:c5347e6e1994975ad9d827"
    
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



