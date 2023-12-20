import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const DrawerContainer = styled("div")(({ theme }) => ({
  width: 240,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const NavbarContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu-list" },
    { label: "Suggest", to: "/suggest" },
    { label: "Contact", to: "/contact" },
    { label: "Sign In", to: "/signin" },
  ];

  const renderNavLinks = () => (
    <List>
      {navLinks.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton component={Link} to={item.to}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Il Ristorante
          </Typography>
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                Il Ristorante
              </Typography>
              {/* //todo: could add logo */}
              {/* <div>
                <img
                  src="your-logo.png"
                  alt="Logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </div> */}
            </>
          )}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "#fff" }}
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      {(isMobile || !mobileOpen) && (
        <DrawerContainer>
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {renderNavLinks()}
          </Drawer>
        </DrawerContainer>
      )}
      <NavbarContainer>
        {/* Desktop Navigation */}
        {isMobile || ""}
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
