import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouteLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { SideImage } from "../../components/SideImage";
import tomatoImage from "../../assets/tomatoes-5365186_1280.jpg";
import { Container, IconButton } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const {
    emailInput,
    passwordInput,
    loading,
    error,
    logInWithEmailAndPassword,
    handleEmailChange,
    handlePasswordChange,
    signInWithGoogle,
  } = useAuth();
  const handleGoogleSignIn = async () => {
    // Call the signInWithGoogle method from the useAuth hook
    await signInWithGoogle();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the logInWithEmailAndPassword method from the useAuth hook
    await logInWithEmailAndPassword();
  };

  return (
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
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    style: { color: "#a8763e" },
                  }}
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
                  autoComplete="current-password"
                  InputLabelProps={{
                    style: { color: "#a8763e" },
                  }}
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
              {loading ? "Logging In..." : "Log In"}
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
                <RouteLink to={"/signup"}>
                  <Typography variant="body2">
                    Don't have an account? Sign up
                  </Typography>
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
