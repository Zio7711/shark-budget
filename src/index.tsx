import "normalize.css";
import "./index.scss";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import color from "./utils/color";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: color.main,
    // },
    secondary: {
      main: color.dark,
    },
    info: {
      main: color.gray,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
