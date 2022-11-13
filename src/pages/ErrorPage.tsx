import "../stylesheets/ErrorPage.scss";

import { Link } from "react-router-dom";
import NotFoundImg from "../assets/images/not-found.svg";

const ErrorPage = () => {
  return (
    <div className="not-found-container">
      <img src={NotFoundImg} alt="not-found" className="not-found-image" />
      <p>Ohh! Page Not Found</p>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default ErrorPage;
