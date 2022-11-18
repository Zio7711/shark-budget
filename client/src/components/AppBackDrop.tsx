import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props extends Object {
  open: boolean;
}

const AppBackDrop = ({ open, ...otherProps }: Props) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
      }}
      open={open}
      {...otherProps}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppBackDrop;
