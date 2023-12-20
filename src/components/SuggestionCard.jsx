import React, { useState } from "react";
import {
  Grid,
  Typography,
  ImageListItem,
  ImageListItemBar,
  styled,
  Paper,
  Button,
  Container,
  Box,
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

const getStatusColor = (status) => {
  switch (status) {
    case "accepted":
      return "#4CAF50"; // Green color for accepted
    case "rejected":
      return "#F44336"; // Red color for rejected
    default:
      return "#FFC107"; // Yellow color for pending (default)
  }
};

export const SuggestionCard = ({ suggestion, isAdmin = false }) => {
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
            subtitle={
              <span>
                by: {isAdmin ? suggestion.userName : "You"} - Status:{" "}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    bgcolor: getStatusColor(suggestion.status),
                    borderRadius: "4px",
                    px: 1,
                    py: 0.5,
                    color: "white",
                  }}
                >
                  {suggestion.status}
                </Box>{" "}
              </span>
            }
          />
        </ImageListItem>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Typography variant="h6" fontWeight={"bold"} color={"secondary"}>
            {suggestion.dishName}
          </Typography>
          <Typography variant="body1">Ingredients:</Typography>
          <Typography paragraph>
            {suggestion.ingredients.map((ingredient, index) => (
              <Typography variant="body2" key={index}>
                {ingredient}
              </Typography>
            ))}
          </Typography>
          {showRecipe && suggestion.recipe && (
            <Container>
              <Typography variant="body1">Recipe:</Typography>
              <Typography variant="body2" paragraph>
                {suggestion.recipe}
              </Typography>
            </Container>
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
