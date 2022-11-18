import * as React from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { selectExpense, updateDate } from "../../store/expenseSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import { MonthPicker as MonthPickerComponent } from "@mui/x-date-pickers";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { availableYears } from "../../constants/availableYear";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

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
  const dispatch = useAppDispatch();
  const { date } = useAppSelector(selectExpense);
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState<string | undefined>(
    value?.format("YYYY") || undefined
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  // before close the dialog
  // check if we need to set the selected value
  const handleClose = (_: any, _2: any, shouldSetValue: boolean = false) => {
    setOpen(false);
    if (shouldSetValue) {
      const setDate = Date.parse(value?.format("YYYY-MM-DD") || "");
      dispatch(updateDate(setDate));
    } else {
      setValue(dayjs(date));
    }
  };

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleYearSelection = (event: SelectChangeEvent) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    const dayJSYear = dayjs(value).year(Number(selectedYear));
    setValue(dayJSYear);

    console.log(dayJSYear.format("YYYY"));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} color="dark">
        {dayjs(date)?.format("YYYY-MM")}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Year"
                onChange={handleYearSelection}
              >
                {availableYears.map((year) => (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
