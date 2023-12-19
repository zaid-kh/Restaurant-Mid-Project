import React from "react";
import {
  Grid,
  Typography,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

export const SuggestionCard = ({ suggestion }) => {
  return (
    <Grid container spacing={2} key={suggestion.name}>
      <Grid item xs={12} sm={6} md={4}>
        <ImageListItem>
          <img src={suggestion.Image} alt={suggestion.name} />
          <ImageListItemBar
            title={suggestion.name}
            subtitle={<span>by: {suggestion.name}</span>}
          />
        </ImageListItem>
        <div>
          <Typography variant="h6">{suggestion.name}</Typography>
          {/* show recipe when clicking on the card */}
          <Typography variant="body1">Ingredients:</Typography>
          {suggestion.ingredients.map((ingredient) => {
            return (
              <Typography variant="body1" key={ingredient}>
                {ingredient}
              </Typography>
            );
          })}
          {suggestion.recipe && (
            <>
              <Typography variant="body1">Recipe:</Typography>
              <Typography variant="body1">{suggestion.recipe}</Typography>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
