// firebaseConfig.js
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOknjaCySh31wgv0k9qbJ-KmAxzd6bPGI",      // <key>API_KEY</key>
  authDomain: "carx-9719d.firebaseapp.com",                // обычно формируется как projectId.firebaseapp.com
  projectId: "carx-9719d",                                 // <key>PROJECT_ID</key>
  storageBucket: "carx-9719d.firebasestorage.app",         // <key>STORAGE_BUCKET</key>
  messagingSenderId: "745026637842",                       // <key>GCM_SENDER_ID</key>
  appId: "1:745026637842:ios:4b140b3c6e9c1d72a388cb",     // <key>GOOGLE_APP_ID</key>
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
