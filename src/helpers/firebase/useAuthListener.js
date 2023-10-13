/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db, auth } from "./config";

export const useAuthListener = () => {
  const [initializing, setInitializing] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        get(ref(db, `users/${  authUser.uid}`)).then((snapshot) => {
          // console.log("+++ snapshot",snapshot);
          if (snapshot.exists()) {
            const resUserData = snapshot.val();
            setUserData({...resUserData, userId: authUser.uid});
          }
        });
      } else {
        setUserData(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => listener();
  }, [auth, initializing]);

  return { userData, initializing };
};
