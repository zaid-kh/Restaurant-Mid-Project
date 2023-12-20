import React from "react";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HeroContainer = styled("div")(() => ({
  backgroundColor: "transparent",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "95vh",
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
      <video
        autoPlay
        loop
        muted
        controls={false}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="../../public/hero_vid.mp4" type="video/mp4" />
      </video>
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
