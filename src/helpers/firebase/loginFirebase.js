/* eslint-disable no-return-assign */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

const loginFirebase = (email, password) => {
  const tellUser = (message) =>
    (document.getElementById("login-msg").innerHTML = message);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      tellUser("");
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        tellUser("Invalid email address.");
      } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        tellUser("Account does not exist with this email address.");
      } else if (
        password.length < 6 ||
        errorMessage === "Firebase: Error (auth/wrong-password)."
      ) {
        tellUser("Invalid password.");
      } else {
        tellUser(errorMessage);
      }
    });
};

export default loginFirebase;
