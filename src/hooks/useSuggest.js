import { useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

const useSuggest = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [dishNameInput, setDishNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [ingredients, setIngredients] = useState([]); // ["ingredient1", "ingredient2"
  const [recipeInput, setRecipeInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSuggestion = async (uid) => {
    try {
      setLoading(true);
      if (!dishNameInput) {
        throw new Error("Please enter a dish name");
      }
      if (!(ingredients.length > 2)) {
        throw new Error("Please enter 2 or more ingredients");
      }
      const userCollection = collection(db, "users");
      const userDoc = await getDoc(doc(userCollection, uid));
      if (!userDoc.exists()) {
        throw new Error("User does not exist");
      }
      const docRef = await addDoc(collection(db, "suggestions"), {
        userID: uid,
        dishName: dishNameInput,
        image: imageInput,
        ingredients: ingredients,
        recipe: recipeInput,
        status: "pending",
      });
      // edit user document in users collection (add suggestion id to user's suggestions array)
      const userSuggestions = userDoc.data().suggestions;
      if (!userSuggestions) {
        // if user has no suggestions, create suggestions array without reming other document fields
        await setDoc(
          doc(userCollection, uid),
          {
            suggestions: [docRef.id],
          },
          { merge: true }
        );
      } else {
        // if user has suggestions, add suggestion id to array
        await setDoc(doc(userCollection, uid), {
          suggestions: [...userSuggestions, docRef.id],
        });
      }
      console.log("Suggestion added to user's document");
      // clear inputs
      setDishNameInput("");
      setIngredients([]);
      setImageInput("");
      setRecipeInput("");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    try {
      setLoading(true);
      const suggestionsCollection = collection(db, "suggestions");
      const suggestionsSnapshot = await suggestionsCollection.get();
      const suggestionsData = suggestionsSnapshot.docs.map((doc) => doc.data());
      setSuggestions(suggestionsData);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserSuggestions = async (uid) => {
    // get suggestions' ids from user's document in users collection
    // get suggestions from suggestions collection using ids

    try {
      setLoading(true);
      const userCollection = collection(db, "users");
      const userDoc = await getDoc(doc(userCollection, uid)).then((doc) => {
        return doc;
      });
      if (!userDoc.exists()) {
        throw new Error("User does not exist");
      }
      // userDoc.data() = { name: "John Doe", email: "johndoe@gmail", suggestions: ["suggestion1", "suggestion2"] }
      // check if user has any suggestions
      if (!userDoc.data().suggestions) {
        console.log("User has no suggestions");
        // setSuggestions([]);
        return;
      }
      const userSuggestions = userDoc.data().suggestions;
      const suggestionsCollection = collection(db, "suggestions");

      //  use query to get suggestions from suggestions collection
      const suggestionsSnapshot = await getDocs(
        query(suggestionsCollection, where("userID", "==", uid))
      );

      const userSuggestionsData = suggestionsSnapshot.docs.map((doc) =>
        doc.data()
      );
      setSuggestions(userSuggestionsData);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSuggestion = async (id) => {
    try {
      setLoading(true);
      const suggestionsCollection = collection(db, "suggestions");
      const suggestionDoc = await suggestionsCollection.doc(id).get();
      if (!suggestionDoc.exists()) {
        throw new Error("Suggestion does not exist");
      }
      await suggestionsCollection.doc(id).delete();
      console.log("Suggestion deleted");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    setSuggestions,
    dishNameInput,
    setDishNameInput,
    ingredients,
    setIngredients,
    recipeInput,
    setRecipeInput,
    error,
    setError,
    loading,
    setLoading,
    addSuggestion,
    getSuggestions,
    getUserSuggestions,
    deleteSuggestion,
  };
};

export default useSuggest;
