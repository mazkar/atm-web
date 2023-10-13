import { set, ref, get } from "firebase/database";
import { db } from "./config";

const addMessagePersonal = (userData, message, reciverId) => {
  // console.log("+++ userData", userData);
  const dataToStore = {
    senderId: userData.userId,
    message,
    timestamp: new Date().getTime(),
    read: false,
  };
  // console.log("+++ dataToStore", dataToStore);

  get(ref(db, `allchats/${reciverId}`))
    .then(() => {
      // console.log("+++ snapshot", snapshot.val());
      set(ref(db, `allchats/${reciverId}/${ new Date().getTime()}`), dataToStore);
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorMsg = document.getElementById("message-error");
      errorMsg.innerHTML = errorMessage;
    });
};

export default addMessagePersonal;
