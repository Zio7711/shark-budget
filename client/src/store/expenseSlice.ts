import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import apiClient from "../api/client";
import expenseApi from "../api/expenseApi";
import { logoutUser } from "./authSlice";

// Define a type for the slice state
export type Expense = {
  date: number;
  description: string;
  type: string;
  amount: number;
  category: string;
  _id: string;
  createdBy: string;
};
interface expenseSlice {
  date: number; // unix timestamp
  isLoading: boolean;
  expenseList: Expense[];
  numOfPages: number;
  page: number;
}

type CreateExpenseParam = {};

// Define the initial state using that type
const initialState: expenseSlice = {
  date: Date.now(),
  isLoading: false,
  expenseList: [],
  numOfPages: 1,
  page: 1,
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
      return response.data;
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getAllExpenses = createAsyncThunk(
  "auth/getAllExpenses",
  async (_: undefined, { dispatch }) => {
    try {
      const response = await apiClient.get(expenseApi.GetALlExpenses);
      return response.data;
    } catch (error) {
      dispatch(logoutUser());
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

    builder.addCase(createExpense.fulfilled, (state, action) => {
      if (action.payload) {
        state.expenseList.push(action.payload.newExpense);
      }
    });

    builder.addCase(getAllExpenses.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllExpenses.fulfilled, (state, action) => {
      state.expenseList = action.payload.expenseList;
      state.numOfPages = action.payload.numOfPages;
    });
  },
});

export const { updateDate, setLoading } = expenseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default expenseSlice.reducer;

export const selectExpense = (state: RootState) => state.expense;
