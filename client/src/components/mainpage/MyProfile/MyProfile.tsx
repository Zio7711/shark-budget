import { logoutUser, selectAuth } from "../../../store/authSlice";

import Avatar from "react-avatar";
import { Button } from "@mui/material";
import apiClient from "../../../api/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface Props {
  bottomNavOffsetHeight: number | undefined;
}
const MyProfile = ({ bottomNavOffsetHeight }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="my-profile-container">
      <div className="my-profile-header">
        <h2>My Profile</h2>
        <Avatar name={user ? user.name : "Me"} className="my-profile-avatar" />
        <label className="my-profile-name">{user ? user.name : "Me"}</label>

        <div className="total-days">
          <p>9</p>
          <p>Book Keeping Days</p>
        </div>
        <div className="total-quantities">
          <p>77</p>
          <p>Book Keeping Numbers</p>
        </div>
      </div>

      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default MyProfile;
