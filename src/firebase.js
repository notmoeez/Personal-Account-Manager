import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCdjH1wPqoQOU8ZFB3HDaDnLeSNMEiqjeQ",
    authDomain: "account-manager-app-f4abe.firebaseapp.com",
    projectId: "account-manager-app-f4abe",
    storageBucket: "account-manager-app-f4abe.appspot.com",
    messagingSenderId: "338016000707",
    appId: "1:338016000707:web:46c5dfd4b7d1c01929a076"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);