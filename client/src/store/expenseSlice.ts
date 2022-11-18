import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import apiClient from "../api/client";
import expenseApi from "../api/expenseApi";

// Define a type for the slice state
interface expenseSlice {
  date: number; // unix timestamp
  isLoading: boolean;
}

type CreateExpenseParam = {};

// Define the initial state using that type
const initialState: expenseSlice = {
  date: Date.now(),
  isLoading: false,
};

export const createExpense = createAsyncThunk(
  "auth/createExpense",
  async (params: CreateExpenseParam, { dispatch }) => {
    try {
      // post request for creating expense
      const response = await apiClient.post(
        expenseApi.CreateNewExpense,
        params
      );
      // dispatch(registerUserFulfilled(response.data));
      return response.data;
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { updateDate, setLoading } = expenseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default expenseSlice.reducer;

export const selectExpense = (state: RootState) => state.expense;
