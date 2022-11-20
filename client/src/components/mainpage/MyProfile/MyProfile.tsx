import { Button } from "@mui/material";
import apiClient from "../../../api/client";
import { logoutUser } from "../../../store/authSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";
interface Props {
  bottomNavOffsetHeight: number | undefined;
}
const MyProfile = ({ bottomNavOffsetHeight }: Props) => {
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
