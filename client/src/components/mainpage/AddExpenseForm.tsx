import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import { createExpense, selectExpense } from "../../store/expenseSlice";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppBackDrop from "../AppBackDrop";
import ExpenseCategoryListItem from "../ExpenseCategoryListItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { round } from "lodash";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

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
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectExpense);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const initialValues = {
    amount: "",
    description: selectedCategory,
    expenseDate: Date.now(),
  };

  const submitHandler = async (values: FormikValues, actions: any) => {
    const dateDayJS = value ? value : dayjs(new Date());
    const date = Date.parse(dateDayJS.toString());
    const newExpenseObject = {
      type: type,
      amount: values.amount,
      category: selectedCategory,
      date,
      description: values.description,
    };

    await dispatch(createExpense(newExpenseObject));

    handleClose();
    handleCloseInputField();
    actions.resetForm();
  };

  const validationSchema = createExpenseSchema;

  const focusAmountFieldRef = useRef(null);

  useEffect(() => {
    // manual auto focus
    setTimeout(() => {
      if (focusAmountFieldRef.current) {
        const inputDiv = focusAmountFieldRef.current as HTMLDivElement;
        inputDiv.querySelector("input")?.focus();
      }
    }, 100);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  const handleNumberFieldBlur = () => {
    formik.setFieldValue(
      "amount",
      round(Number(formik.values.amount), 2),
      true
    );
  };

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
              autoFocus={true}
              onBlur={handleNumberFieldBlur}
              ref={focusAmountFieldRef}
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
      <AppBackDrop open={isLoading} />
    </>
  );
};

export default AddExpenseForm;
