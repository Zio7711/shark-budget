import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import Swal from "sweetalert2";
import apiClient from "../api/client";
import { authApi } from "../api";

type User = {
  name: string;
  email: string;
  createdAt: number;
  budget: number;
};

// Define a type for the slice state
interface AuthState {
  isLoading: boolean;
  user: User | null;
  // token: string | null;
  email: string | null;
  userLoading: boolean;
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

// const user = localStorage.getItem("user");
// const token = localStorage.getItem("token");
// Define the initial state using that type
// export const initialState: AuthState = {
//   user: user ? JSON.parse(user) : null,
//   token: token ? token : null,
//   email: user ? JSON.parse(user).email : null,
//   isLoading: false,
// };

export const initialState: AuthState = {
  user: null,
  // token:null,
  email: null,
  isLoading: false,
  userLoading: true,
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
      Swal.fire({
        icon: "error",
        title: "Registration failed",
      });
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
      Swal.fire({
        icon: "error",
        title: "Login failed",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (params: any, { dispatch }) => {
    try {
      const response = await apiClient.patch(authApi.UpdateUserUrl, params);
      // dispatch(loginUserFulfilled(response.data));
      return response.data;
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_: undefined, { dispatch }) => {
    try {
      const response = await apiClient.get(authApi.GetCurrentUserUrl);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) return;
      dispatch(logoutUser());
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_: undefined, { dispatch }) => {
    try {
      const response = await apiClient.get(authApi.LogoutUserUrl);
      return response.data;
    } finally {
      dispatch(logoutFulfilled());
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
        user: User;
        token: string;
      }>
    ) => {
      const { user } = action.payload;
      state.user = user;
      state.email = user.email;

      // alert success
      Swal.fire({
        heightAuto: false,
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    },

    loginUserFulfilled: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      const { user } = action.payload;
      state.user = user;
      state.email = user.email;

      // alert success
      Swal.fire({
        heightAuto: false,
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    },

    logoutFulfilled: (state) => {
      // state = initialState;
      state.user = null;
      state.userLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.userLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.userLoading = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.email = user.email;
    });
  },
});

export const {
  registerUserFulfilled,
  setLoading,
  loginUserFulfilled,
  logoutFulfilled,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
