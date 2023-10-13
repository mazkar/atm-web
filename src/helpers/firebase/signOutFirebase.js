/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "./config";

export const signOutFirebase = (userData) => {

  if(userData){
    // console.log("+++ offline!");
    const updates = {...userData, isOnline: false};
    set(ref(db, `users/${userData.userId}`), updates);
  };
  
  signOut(auth)
    .then(() => {
      console.log("+++ Signed Out");
    })
    .catch((error) => {
      console.log("+++ error", error);
    });
};