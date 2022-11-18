import "../../stylesheets/AddExpenseDialog.scss";

import { SyntheticEvent, forwardRef, useState } from "react";
import {
  expenseCategories,
  incomeCategories,
} from "../../utils/CategoryIconLookUp";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddExpenseForm from "./AddExpenseForm";
import AppBar from "@mui/material/AppBar";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import ExpenseCategoryListItem from "../ExpenseCategoryListItem";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import color from "../../utils/color";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddExpenseDialog = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [type, setType] = useState<"expense" | "income">("expense");

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //set up open input field
  const [openInputField, setOpenInputField] = useState<boolean>(false);
  const handleCloseInputField = () => {
    setOpenInputField(false);
  };
  const handleToggle = (category: string) => {
    setSelectedCategory(category);
    setOpenInputField(!openInputField);
  };

  // set up open dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSelectedCategory("");
    setOpenDialog(false);
    setType("expense");
  };

  const handleChangeTab = (
    event: SyntheticEvent,
    newType: "income" | "expense"
  ) => {
    setType(newType);
  };

  return (
    <>
      <Button className="add-expense" onClick={handleClickOpen}>
        <AddCircleOutlineOutlinedIcon
          sx={{
            fontSize: "2.5em",
          }}
        />
      </Button>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky", backgroundColor: `${color.main}` }}>
          <Toolbar sx={{ color: "black" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center", fontSize: "1.5em" }}
              variant="h6"
              component="div"
            >
              Add an {type}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Tabs
          value={type}
          onChange={handleChangeTab}
          aria-label="basic tabs"
          centered
        >
          <Tab label="Expense" value="expense" />
          <Tab label="Income" value="income" />
        </Tabs>

        <div className="expense-category-list-container">
          {type === "expense" &&
            expenseCategories.map((el) => (
              <ExpenseCategoryListItem
                category={el}
                key={el}
                handleToggle={handleToggle}
                selectedCategory={selectedCategory}
              />
            ))}

          {type === "income" &&
            incomeCategories.map((el) => (
              <ExpenseCategoryListItem
                category={el}
                key={el}
                handleToggle={handleToggle}
                selectedCategory={selectedCategory}
              />
            ))}
        </div>
      </Dialog>

      {/* input Dialog */}
      <Dialog
        open={openInputField}
        onClose={handleCloseInputField}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: `${color.main}` }}>
          <Toolbar sx={{ color: "black" }}>
            <Button autoFocus color="inherit" onClick={handleCloseInputField}>
              <CloseIcon />
            </Button>

            <Typography
              sx={{ ml: 2, flex: 1, fontSize: "1.5em" }}
              variant="h6"
              component="div"
            >
              {selectedCategory}
            </Typography>
          </Toolbar>
        </AppBar>

        <AddExpenseForm
          selectedCategory={selectedCategory}
          type={type}
          handleCloseInputField={handleCloseInputField}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
};

export default AddExpenseDialog;
