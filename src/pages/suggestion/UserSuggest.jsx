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

const UserSuggest = ({ uid }) => {
  // State variables
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
  const mockSuggestions = [
    {
      name: "Delicious Dish 1",
      userName: "Chef John",
      recipe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      Image: "https://placekitten.com/300/200", // Replace with actual image URLs
    },
    {
      name: "Tasty Treat 2",
      userName: "Chef Jane",
      recipe:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: "https://placekitten.com/300/201",
    },
    {
      name: "Yummy Delight 3",
      userName: "Chef Bob",
      recipe:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      Image: "https://placekitten.com/300/202",
    },
  ];

  //   setSuggestions(mockSuggestions);

  uid = "Ox9Y6Q8Wb6fQO6L6KakHFRxTCGB2";
  useEffect(() => {
    // start ingredients with 2 empty elements
    setIngredients(["", ""]);
    // Fetch the suggestions from firestore
    getUserSuggestions(uid).then((suggestions) => {
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

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data and add the suggestion to the suggestions array
    // use an API call to send the suggestion to firestore
    const suggestionData = {
      // Get the form data here
      dishName: dishNameInput,
      ingredients: ingredients,
      recipe: recipeInput,
    };
    addSuggestion(uid);
    setSuggestions([...suggestions, suggestionData]);
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Typography variant="h3">Suggest a Recipe</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* dish name */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dishName"
                  label="Dish Name"
                  name="dishName"
                  autoComplete="dish-name"
                  value={dishNameInput}
                  onChange={handleDishNameChange}
                />
              </Grid>
              {/* Ingredients */}
              <Grid item xs={12}>
                <Typography variant="h6">Ingredients</Typography>
                <List>
                  {ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                      <TextField
                        fullWidth
                        name={`ingredient-${index}`}
                        label={`Ingredient ${index + 1}`}
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                      />
                      <Button onClick={() => handleRemoveIngredient(index)}>
                        -
                      </Button>
                    </ListItem>
                  ))}
                  <Button onClick={handleAddIngredient}>+</Button>
                </List>
              </Grid>
              {/* Recipe */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Recipe"
                  label="Recipe (optional)"
                  type="text"
                  id="recipe"
                  autoComplete="recipe"
                  value={recipeInput}
                  onChange={handleRecipeChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Submitting Dish..." : "Submit"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Grid>
        <Grid padding={2}>
          <Typography variant="h4">Previous Suggestions</Typography>
          {console.log("suggestions: ", suggestions)}
          {suggestions ? (
            suggestions.length > 0 ? (
              <Grid container>
                {suggestions.map((suggestion) => (
                  <SuggestionCard suggestion={suggestion} key={suggestion.id} />
                ))}
              </Grid>
            ) : (
              <Typography variant="body1">
                No previous suggestions found.
              </Typography>
            )
          ) : (
            <Typography variant="body1">
              No previous suggestions found.
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserSuggest;
