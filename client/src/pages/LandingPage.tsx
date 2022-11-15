import "../stylesheets/LandingPage.scss";

import Button from "@mui/material/Button";
import { DollarLogo } from "../components/AllSVGs";
import color from "../utils/color";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <div className="top">
        <h1 className="landing-page-title">Shark Money</h1>
        <DollarLogo fill={color.main} width="150" />
      </div>

      <div className="login">
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/register")}
        >
          Login / Register
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
