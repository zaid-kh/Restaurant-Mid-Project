import React from "react";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Customize the background image URL
const backgroundImage = "url('https://example.com/your-image.jpg')";

const HeroContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
  backgroundImage,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  textAlign: "center",
}));

const HeroText = styled("div")({
  zIndex: 1,
});

const HeroButton = styled(Button)({
  marginTop: 20,
});

const Home = () => {
  return (
    <HeroContainer>
      <HeroText>
        <Typography variant="h2" gutterBottom>
          Your Catchy Title
        </Typography>
        <Typography variant="h5" paragraph>
          A brief description of what your website is about.
        </Typography>
        <HeroButton variant="contained" component={Link} to="/menu-list">
          Explore Menu
        </HeroButton>
      </HeroText>
    </HeroContainer>
  );
};

export default Home;
