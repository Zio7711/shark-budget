import * as React from "react";

import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MonthPicker as MonthPickerComponent } from "@mui/x-date-pickers";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { YearPicker } from "@mui/x-date-pickers/";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MonthPicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [open, setOpen] = React.useState(false);

  const [displayDate, setDisplayDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  // before close the dialog
  // check if we need to set the selected value
  const handleClose = (_: any, _2: any, shouldSetValue: boolean = false) => {
    setOpen(false);
    if (shouldSetValue) {
      setDisplayDate(value);
    } else {
      setValue(displayDate);
    }
  };

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} color="dark">
        {displayDate?.format("YYYY-MM")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Month Selection</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MonthPickerComponent date={value} onChange={handleChange} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, "", true)}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
