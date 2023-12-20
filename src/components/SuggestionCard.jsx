import React, { useState } from "react";
import {
  Grid,
  Typography,
  ImageListItem,
  ImageListItemBar,
  styled,
  Paper,
  Button,
} from "@mui/material";

const SuggestionCardContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const SuggestionCard = ({ suggestion }) => {
  const [showRecipe, setShowRecipe] = useState(false);

  const toggleRecipeVisibility = () => {
    setShowRecipe(!showRecipe);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <SuggestionCardContainer>
        <ImageListItem>
          <img
            src={
              suggestion.image ||
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
            }
            alt={suggestion.name}
          />
          <ImageListItemBar
            title={suggestion.name}
            subtitle={<span>by: {suggestion.userName}</span>}
          />
        </ImageListItem>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Typography variant="h6" fontWeight={"bold"} color={"secondary"}>
            {suggestion.dishName}
          </Typography>
          <Typography variant="body1" paragraph>
            Ingredients:
          </Typography>
          {suggestion.ingredients.map((ingredient, index) => (
            <Typography variant="body1" key={index}>
              {ingredient}
            </Typography>
          ))}
          {showRecipe && suggestion.recipe && (
            <>
              <Typography variant="body1" paragraph>
                Recipe:
              </Typography>
              <Typography variant="body1">{suggestion.recipe}</Typography>
            </>
          )}
          {suggestion.recipe && (
            <Button onClick={toggleRecipeVisibility} color="primary">
              {showRecipe ? "Hide Recipe" : "Show Recipe"}
            </Button>
          )}
        </div>
      </SuggestionCardContainer>
    </Grid>
  );
};
