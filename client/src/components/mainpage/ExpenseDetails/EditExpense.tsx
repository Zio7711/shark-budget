import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import {
  Expense,
  editExpense,
  selectExpense,
} from "../../../store/expenseSlice";
import { FormikValues, useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppBackDrop from "../../AppBackDrop";
import ExpenseCategoryListItem from "../../ExpenseCategoryListItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useState } from "react";

const editExpenseSchema = yup.object({
  amount: yup.number().required("Amount is required").min(0.01),
  description: yup.string(),
});

interface Props {
  expense: Expense | null;
  handleCloseEditField: () => void;
}
const EditExpense = ({ expense, handleCloseEditField }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectExpense);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const initialValues = {
    amount: expense?.amount,
    description: expense?.category,
    expenseDate: expense?.date,
  };

  const submitHandler = async (values: FormikValues, actions: any) => {
    const dateDayJS = value ? value : dayjs(new Date());
    const date = Date.parse(dateDayJS.toString());

    if (expense) {
      const editExpenseObject = {
        amount: values.amount,
        date,
        description: values.description,
        id: expense._id,
      };

      await dispatch(editExpense(editExpenseObject));

      handleCloseEditField();
      actions.resetForm();
    }
  };

  const validationSchema = editExpenseSchema;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="add-expense-form">
        <div className="input-amount">
          <ExpenseCategoryListItem
            category={expense?.category || ""}
            selectedCategory={expense?.category || ""}
            showLabel={false}
          />
          <div className="input-fields">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Select Date"
                inputFormat="YYYY-MM-DD"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="date"
                    id="expenseDate"
                    label="date"
                    variant="outlined"
                    color="dark"
                    value={formik.values.expenseDate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.expenseDate &&
                      Boolean(formik.errors.expenseDate)
                    }
                    helperText={
                      formik.touched.expenseDate && formik.errors.expenseDate
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              type="number"
              id="amount"
              label="amount"
              variant="outlined"
              color="dark"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              margin="dense"
              autoFocus={true}
            />
            <TextField
              type="text"
              id="description"
              label="description"
              variant="outlined"
              color="dark"
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              margin="dense"
            />
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          type="submit"
          //   disabled={auth.isLoading}
          sx={{ width: "5em", marginBottom: "1em" }}
        >
          Edit
        </Button>
      </form>
      <AppBackDrop open={isLoading} />
    </>
  );
};

export default EditExpense;
