import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props extends Object {
  open: boolean;
}

const AppBackDrop = ({ open, ...otherProps }: Props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: "9999" }}
      open={open}
      {...otherProps}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppBackDrop;
