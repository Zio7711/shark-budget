import "../../stylesheets/AddExpenseDialog.scss";

import { SyntheticEvent, forwardRef, useState } from "react";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"expense" | "income">("expense");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: `${color.main}` }}>
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
            _.range(10).map((el) => <ExpenseCategoryListItem />)}

          {type === "income" &&
            _.range(1).map((el) => <ExpenseCategoryListItem />)}
        </div>
      </Dialog>
    </>
  );
};

export default AddExpenseDialog;
