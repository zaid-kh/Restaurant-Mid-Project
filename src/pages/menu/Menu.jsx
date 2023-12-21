import { Grid } from "@mui/material";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import MenuItem from "./MenuItem";
import theme from "../../theme";

const MenuList = () => {
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
    <Grid
      padding={2}
      container
      spacing={2}
      style={{
        backgroundColor: "#433",
        marginTop: "0", // Adjust the margin based on your navigation height
      }}
    >
      {dishes.map((dish) => (
        <Grid item xs={12} sm={6} md={4} key={dish.name}>
          <MenuItem dish={dish} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;
