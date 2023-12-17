import { Grid, Typography } from "@mui/material";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

const DishList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const dishesCollection = collection(db, "dishes");
      const dishesDocs = await getDocs(dishesCollection);
      setDishes(
        dishesDocs.docs.map((doc) => {
          return doc.data();
        })
      );
    };

    fetchDishes();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.name}>
            <div>
              <Typography variant="h6">{dish.name}</Typography>
              <Typography variant="body1">{dish.ingredients.join()}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DishList;
