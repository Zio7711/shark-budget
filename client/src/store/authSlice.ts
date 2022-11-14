import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import apiClient from "../api/client";
import { authApi } from "../api";

// Define a type for the slice state
interface AuthState {
  isLoading: boolean;
  user: string | null;
  token: string | null;
  email: string | null;
}
type RegisterUserParams = {
  email: string;
  password: string;
  name: string;
};

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
  email: null,
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
      action: PayloadAction<RegisterUserParams>
    ) => {
      console.log("registerUser", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { registerUserFulfilled, setLoading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
