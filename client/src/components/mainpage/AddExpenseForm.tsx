import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpenseCategoryListItem from "../ExpenseCategoryListItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState } from "react";

interface Props {
  selectedCategory: string;
  type: string;
  handleCloseInputField: () => void;
  handleClose: () => void;
}

const createExpenseSchema = yup.object({
  amount: yup.number().required("Amount is required").min(0.01),
  description: yup.string(),
});

const AddExpenseForm = ({
  selectedCategory,
  type,
  handleCloseInputField,
  handleClose,
}: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const initialValues = {
    amount: "",
    description: selectedCategory,
    expenseDate: Date.now(),
  };

  const submitHandler = (values: FormikValues, actions: any) => {
    const newExpenseObject = {
      type: type,
      amount: values.amount,
      category: selectedCategory,
      date: 1668658764373,
      description: values.description,
    };

    console.log("click", newExpenseObject);
    handleClose();
    handleCloseInputField();
    actions.resetForm();
  };

  const validationSchema = createExpenseSchema;

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
            category={selectedCategory}
            selectedCategory={selectedCategory}
            showLabel={false}
          />
          <div className="input-fields">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Select Date"
                inputFormat="YYYY-MM-DD"
                // value={formik.values.expenseDate}
                // onChange={formik.handleChange}
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
              autoFocus={true} // need to debug this
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
          Add
        </Button>
      </form>
    </>
  );
};

export default AddExpenseForm;
