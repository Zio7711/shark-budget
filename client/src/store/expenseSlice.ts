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

type ExpenseParam = {
  type?: string;
  amount?: number;
  category?: string;
  date?: number;
  description?: string;
};

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
  async (params: ExpenseParam, { dispatch }) => {
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
  async (params: any, { dispatch }) => {
    try {
      const response = await apiClient.get(expenseApi.GetALlExpenses, {
        params,
      });
      return response.data;
    } catch (error) {
      dispatch(logoutUser());
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const editExpense = createAsyncThunk(
  "auth/editExpense",
  async (params: ExpenseParam & { id: string }, { dispatch }) => {
    const { id, ...restParams } = params;
    try {
      const response = await apiClient.patch(
        expenseApi.EditExpense(id),
        restParams
      );
      return response.data;
    } catch (error) {
      dispatch(logoutUser());
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "auth/deleteExpense",
  async (params: { id: string }, { dispatch }) => {
    try {
      const response = await apiClient.delete(
        expenseApi.DeleteExpense(params.id)
      );
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

    builder.addCase(editExpense.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExpense.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllExpenses.fulfilled, (state, action) => {
      if (action.payload) {
        state.expenseList = action.payload.expenseList;
        state.numOfPages = action.payload.numOfPages;
      }
    });

    builder.addCase(editExpense.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.expenseList.findIndex(
          (expense) => expense._id === action.payload.updatedExpense._id
        );
        state.expenseList[index] = action.payload.updatedExpense;
      }
    });

    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.expenseList.findIndex(
          (expense) => expense._id === action.payload.deletedExpenseId
        );
        state.expenseList.splice(index, 1);
      }
    });
  },
});

export const { updateDate, setLoading } = expenseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default expenseSlice.reducer;

export const selectExpense = (state: RootState) => state.expense;
