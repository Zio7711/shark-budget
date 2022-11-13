import "../stylesheets/LandingPage.scss";

import Button from "@mui/material/Button";
import { DollarLogo } from "../components/AllSVGs";
import color from "../utils/color";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1 className="landing-page-title">Shark Money</h1>
      <DollarLogo fill={color.main} width="150" />
      <Button variant="contained" className="login" size="large">
        Login/Register
      </Button>
    </div>
  );
};

export default LandingPage;
