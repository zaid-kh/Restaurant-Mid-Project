import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouteLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SideImage } from "../../components/SideImage";
import tomatoImage from "../../assets/tomatoes-5365186_1280.jpg";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { IconButton } from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const {
    emailInput,
    passwordInput,
    loading,
    error,
    signUp,
    signInWithGoogle,
    handleEmailChange,
    handlePasswordChange,
  } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the signUp method from the useAuth hook
    await signUp();
  };

  const handleGoogleSignIn = async () => {
    // Call the signInWithGoogle method from the useAuth hook
    await signInWithGoogle();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <SideImage image={tomatoImage} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={emailInput}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={passwordInput}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={handleGoogleSignIn}
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f3f3f3" },
                  }}
                >
                  <FcGoogle style={{ fontSize: "2rem", color: "#FFFFFF" }} />
                </IconButton>
              </Container>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouteLink to={"/signin"}>
                    <Typography variant="body2">
                      Already have an account? Sign in
                    </Typography>
                  </RouteLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
