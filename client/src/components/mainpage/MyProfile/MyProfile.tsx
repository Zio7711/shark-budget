import { Button } from "@mui/material";
import apiClient from "../../../api/client";
import { logoutUser } from "../../../store/authSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default MyProfile;
