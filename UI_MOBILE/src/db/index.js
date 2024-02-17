import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import {REACT_APP_FIREBASE_KEY, REACT_APP_FIREBASE_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, 
  REACT_APP_FIREBASE_STORAGE_BUCKET,REACT_APP_FIREBASE_SENDER_ID, REAC_APP_FIREBASE_ID } from '@env'
const app = firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REAC_APP_FIREBASE_ID,
});
export const auth = firebase.auth();
export const db = app.firestore();
export const st = firebase.storage();

export default app;