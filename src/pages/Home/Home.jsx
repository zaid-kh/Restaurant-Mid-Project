import React from "react";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../theme";

const HeroContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "95vh",
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "hidden", // Ensure the overlay covers the entire video
}));

const VideoOverlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust the alpha value for darkness
  zIndex: 0,
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
        <source src="/hero_vid.mp4" type="video/mp4" />
      </video>
      <VideoOverlay />

      <HeroText>
        <Typography variant="h2" gutterBottom>
          Welcome to Our Restaurant
        </Typography>
        <Typography variant="h5" paragraph>
          Indulge in the exquisite flavors of our food,
        </Typography>
        <Typography variant="h5" paragraph>
          made with the finest ingredients,
        </Typography>
        <Typography variant="h6" paragraph>
          and flavored with passion.
        </Typography>
        <HeroButton variant="contained" component={Link} to="/menu-list">
          Explore Menu
        </HeroButton>
      </HeroText>
    </HeroContainer>
  );
};

export default Home;
