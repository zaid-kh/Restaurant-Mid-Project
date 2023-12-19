import { useState } from "react";
import { auth, db, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const useAuth = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // add user object to users collection in firestore
  const addUserToFirestore = async (user) => {
    try {
      setLoading(true);
      const userCollection = collection(db, "users");

      // check if user already exists in firestore
      const userDoc = await getDoc(doc(userCollection, user.uid));
      if (userDoc.exists()) {
        throw new Error("User already exists");
      }

      // add user to firestore
      await setDoc(doc(userCollection, user.uid), {
        name: nameInput ? nameInput : user.displayName,
        email: user.email,
        uid: user.uid,
      });
      console.log("User added to firestore");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserFromFirestore = async (uid) => {
    try {
      setLoading(true);
      const userCollection = collection(db, "users");
      const userDoc = await getDoc(doc(userCollection, uid));
      if (!userDoc.exists()) {
        throw new Error("User does not exist");
      }
      console.log("User retrieved from firestore");
      return userDoc.data();
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      // add user to firestore
      await addUserToFirestore(auth.currentUser);
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
      // if user does not exist in firestore, add user to firestore
      await addUserToFirestore(auth.currentUser);
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

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
    setError(null); // Clear error when the user changes the name
  };

  return {
    emailInput,
    nameInput,
    passwordInput,
    error,
    loading,
    signUp,
    logInWithEmailAndPassword,
    signInWithGoogle,
    logOut,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    getUserFromFirestore,
  };
};

export default useAuth;
