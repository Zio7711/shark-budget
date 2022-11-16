import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import dayjs from "dayjs";

// Define a type for the slice state
interface expenseSlice {
  date: string | undefined;
}

// Define the initial state using that type
const initialState: expenseSlice = {
  date: dayjs(new Date()).format("YYYY-MM-DD"),
};

export const expenseSlice = createSlice({
  name: "expense",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateDate: (state, action: PayloadAction<string | undefined>) => {
      state.date = action.payload;
    },
  },
});

export const { updateDate } = expenseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default expenseSlice.reducer;

export const selectExpense = (state: RootState) => state.expense;
