import React, { useEffect, useState } from "react";
import useSuggest from "../../hooks/useSuggest";
import {
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { SuggestionCard } from "../../components/SuggestionCard";
import { auth } from "../../config/firebase";

const UserSuggest = () => {
  const {
    suggestions,
    setSuggestions,
    dishNameInput,
    setDishNameInput,
    ingredients,
    setIngredients,
    recipeInput,
    setRecipeInput,
    loading,
    error,
    addSuggestion,
    getUserSuggestions,
  } = useSuggest();

  useEffect(() => {
    // start ingredients with 2 empty elements
    setIngredients(["", ""]);
    // Fetch the suggestions from firestore
    if (!auth.currentUser) return;
    getUserSuggestions(auth.currentUser.uid).then((suggestions) => {
      if (suggestions) {
        setSuggestions(suggestions);
      }
    });
  }, []);

  const handleDishNameChange = (e) => {
    setDishNameInput(e.target.value);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleRecipeChange = (e) => {
    setRecipeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const suggestionData = {
      dishName: dishNameInput,
      ingredients: ingredients,
      recipe: recipeInput,
    };

    addSuggestion(uid);
    setSuggestions([...suggestions, suggestionData]);
  };

  return (
    <Grid container component="main" sx={{ height: "100dvh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={2}
        square
        height={"100%"}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Suggest a Recipe
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              required
              fullWidth
              id="dishName"
              label="Dish Name"
              name="dishName"
              autoComplete="dish-name"
              value={dishNameInput}
              onChange={handleDishNameChange}
              InputLabelProps={{
                style: { color: "#a8763e" },
              }}
            />

            <List>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    name={`ingredient-${index}`}
                    label={`Ingredient ${index + 1}`}
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    InputLabelProps={{
                      style: { color: "#a8763e" },
                    }}
                  />
                  <Button
                    onClick={() => handleRemoveIngredient(index)}
                    variant="contained"
                  >
                    -
                  </Button>
                </ListItem>
              ))}
              <Button onClick={handleAddIngredient} variant="contained">
                Add Ingredient
              </Button>
            </List>

            <TextField
              fullWidth
              name="Recipe"
              label="Recipe (optional)"
              type="text"
              id="recipe"
              autoComplete="recipe"
              value={recipeInput}
              onChange={handleRecipeChange}
              InputLabelProps={{
                style: { color: "#a8763e" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !auth.currentUser}
            >
              {!auth.currentUser
                ? "Please log in to submit a suggestion"
                : loading
                ? "Submitting Dish..."
                : "Submit"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4} md={7} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Previous Suggestions
        </Typography>
        {suggestions && suggestions.length > 0 ? (
          <Grid container spacing={2}>
            {suggestions.map((suggestion, index) => (
              <Grid item xs={10} key={index}>
                <SuggestionCard suggestion={suggestion} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            {auth.currentUser
              ? "You have not made any suggestions yet."
              : "Please log in to see your suggestions."}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default UserSuggest;
