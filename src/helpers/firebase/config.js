import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw2iMV5OZ0SXx0m6eExOp97ufCbjcnEvg",
  authDomain: "atmbiz-cimb.firebaseapp.com",
  databaseURL: "https://atmbiz-cimb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "atmbiz-cimb",
  storageBucket: "atmbiz-cimb.appspot.com",
  messagingSenderId: "860560831439",
  appId: "1:860560831439:web:aa48c3d39a4dcb1e3cd8ba",
  measurementId: "G-12EV3928BM"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export { app, db, auth };
