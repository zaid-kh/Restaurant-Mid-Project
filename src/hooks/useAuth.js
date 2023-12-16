import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const useAuth = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      console.log("signUp: auth: ", auth.currentUser.email);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logInWithEmailAndPassword = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      console.log(
        "signInWithEmailAndPassword: auth: ",
        auth?.currentUser?.email
      );
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      console.log("signInWithGoogle: auth: ", auth?.currentUser?.email);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      console.log("logOut: auth: ", auth?.currentUser?.email);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setError(null); // Clear error when the user changes the email
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    setError(null); // Clear error when the user changes the password
  };

  return {
    emailInput,
    passwordInput,
    error,
    loading,
    signUp,
    logInWithEmailAndPassword,
    signInWithGoogle,
    logOut,
    handleEmailChange,
    handlePasswordChange,
  };
};

export default useAuth;
