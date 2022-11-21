import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { logoutUser } from "../../../store/authSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useMemo } from "react";

interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}
const MyProfileBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
}: Props) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // calculate body height
  const bodyHeight = useMemo(() => {
    const totalHeight = window.innerHeight;
    return (
      bottomNavOffsetHeight &&
      headerOffsetHeight &&
      totalHeight - bottomNavOffsetHeight - headerOffsetHeight
    );
  }, [bottomNavOffsetHeight, headerOffsetHeight]);
  return (
    <div
      className="my-profile-body-container"
      style={{
        marginTop: `${headerOffsetHeight}px`,
        overflow: "scroll",
        height: bodyHeight,
      }}
    >
      <Card className="my-profile-body-card">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Billing Statement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptile
          </Typography>
        </CardContent>
      </Card>

      <Card className="my-profile-body-card">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Budget Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptile
          </Typography>
        </CardContent>
      </Card>

      <Card className="my-profile-body-card">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Budget Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptile
          </Typography>
        </CardContent>
      </Card>

      <Card className="my-profile-body-card">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Budget Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptile
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        onClick={handleLogout}
        color="error"
        className="logout-button"
      >
        Logout
      </Button>
    </div>
  );
};

export default MyProfileBody;
