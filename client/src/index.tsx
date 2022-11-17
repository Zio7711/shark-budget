import "normalize.css";
import "./index.scss";

import App from "./App";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import apiClient from "./api/client";
import { logoutUser } from "./store/authSlice";
import { store } from "./store/store";
import theme from "./utils/customTheme";

/** Intercept any unauthorized request.
 * dispatch logout action accordingly **/
const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      dispatch(logoutUser());
    }
    return;
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
