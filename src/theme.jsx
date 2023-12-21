import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f1a07",
    },
    secondary: {
      main: "#a8763e",
    },

    background: {
      default: "#281e16",
      alternate: "#a8763e",
      dark: "#0d1010",
    },
    text: {
      primary: "#0d1010",
      secondary: "#fdfefd",
    },
  },
});

export default theme;
