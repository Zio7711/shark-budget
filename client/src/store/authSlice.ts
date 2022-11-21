import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "./../utils/localStorageHelper";

import { RootState } from "./store";
import Swal from "sweetalert2";
import apiClient from "../api/client";
import { authApi } from "../api";

// Define a type for the slice state
interface AuthState {
  isLoading: boolean;
  user: { name: string; email: string } | null;
  token: string | null;
  email: string | null;
}
type RegisterUserParams = {
  email: string;
  password: string;
  name: string;
};
type LoginUserParams = {
  email: string;
  password: string;
};

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
// Define the initial state using that type
export const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  email: user ? JSON.parse(user).email : null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params: RegisterUserParams, { dispatch }) => {
    try {
      // post request for creating user
      const response = await apiClient.post(authApi.RegisterUserUrl, params);
      dispatch(registerUserFulfilled(response.data));
      return response.data;
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params: LoginUserParams, { dispatch }) => {
    try {
      const response = await apiClient.post(authApi.LoginUserUrl, params);
      dispatch(loginUserFulfilled(response.data));
      return response.data;
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    registerUserFulfilled: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        token: string;
      }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.email = user.email;
      state.token = token;

      // add user and token to local storage
      addUserToLocalStorage(user, token);
      // alert success
      Swal.fire({
        heightAuto: false,
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    loginUserFulfilled: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        token: string;
      }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.email = user.email;
      state.token = token;

      // add user and token to local storage
      addUserToLocalStorage(user, token);
      // alert success
      Swal.fire({
        heightAuto: false,
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    logoutUser: (state) => {
      state.user = null;
      state.email = null;
      state.token = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {
  registerUserFulfilled,
  setLoading,
  loginUserFulfilled,
  logoutUser,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
