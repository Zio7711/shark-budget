import { Navigate } from "react-router-dom";
import { selectAuth } from "../store/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAppSelector(selectAuth);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
