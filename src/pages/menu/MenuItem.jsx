// MenuItem.js
import React from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import theme from "../../theme";

const MenuItem = ({ dish }) => {
  function capitalizeFirstLetterInWords(string) {
    const words = string.split(" ");
    const capitalizedWords = words.map(
      (word) => word[0].toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }
  return (
    <Card style={{}}>
      <Grid container spacing={2}>
        {dish.image && (
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              alt={dish.name}
              height="180"
              image={dish.image}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <CardContent>
            <Typography variant="h5" fontWeight={560} gutterBottom>
              {capitalizeFirstLetterInWords(dish.name)}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {dish.category}
            </Typography>
            <Typography variant="body1" paragraph>
              Ingredients: {dish.ingredients.join(", ")}
            </Typography>
            <Typography variant="body2">
              {/* <Favorite /> {dish.likes} */}
              Likes: {dish.likes}
            </Typography>
            <Typography variant="body2">Rating: {dish.rating}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MenuItem;
