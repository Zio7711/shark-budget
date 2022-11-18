import {
  AppBar,
  Button,
  Dialog,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Expense,
  deleteExpense,
  selectExpense,
} from "../../../store/expenseSlice";
import { forwardRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpense from "./EditExpense";
import ExpenseItem from "./ExpenseItem";
import { TransitionProps } from "@mui/material/transitions";
import color from "../../../utils/color";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useMemo } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}

const ExpenseDetailsBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
}: Props) => {
  const { expenseList } = useAppSelector(selectExpense);
  const dispatch = useAppDispatch();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [openEditField, setOpenEditField] = useState<boolean>(false);
  const handleCloseEditField = () => {
    setOpenEditField(false);
  };

  const handleToggle = (expense: Expense) => {
    setSelectedExpense(expense);
    setOpenEditField(!openEditField);
  };

  const handleDeleteExpense = () => {
    if (selectedExpense) {
      dispatch(deleteExpense({ id: selectedExpense._id }));
      setOpenEditField(false);
    }
  };

  // calculate body height
  const bodyHeight = useMemo(() => {
    const totalHeight = window.innerHeight;
    return (
      bottomNavOffsetHeight &&
      headerOffsetHeight &&
      totalHeight - bottomNavOffsetHeight - headerOffsetHeight
    );
  }, [bottomNavOffsetHeight, headerOffsetHeight, window.innerHeight]);

  return (
    <>
      <div
        className="expense-details-body"
        style={{
          marginTop: `${headerOffsetHeight}px`,
          overflow: "scroll",
          height: bodyHeight,
        }}
      >
        <p className="expense-details-body-header">
          <span>11.12 Wednesday</span>
          <span>expense: 190</span>
        </p>
        {expenseList.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            handleToggle={handleToggle}
          />
        ))}
      </div>

      <Dialog
        open={openEditField}
        onClose={handleCloseEditField}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: `${color.main}` }}>
          <Toolbar sx={{ color: "black" }}>
            <Button color="inherit" onClick={handleCloseEditField}>
              <CloseIcon />
            </Button>

            <Typography
              sx={{ flex: 1, fontSize: "1.5em" }}
              variant="h6"
              component="div"
            >
              {selectedExpense?.category}
            </Typography>

            <Button
              onClick={handleDeleteExpense}
              variant="contained"
              color="error"
            >
              <DeleteIcon sx={{ color: color.dark }} />
            </Button>
          </Toolbar>
        </AppBar>

        {selectedExpense && (
          <EditExpense
            expense={selectedExpense}
            handleCloseEditField={handleCloseEditField}
          />
        )}
      </Dialog>
    </>
  );
};

export default ExpenseDetailsBody;
