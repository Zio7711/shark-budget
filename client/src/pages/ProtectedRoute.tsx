import AppBackDrop from "../components/AppBackDrop";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../store/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const ProtectedRoute = ({ children }: any) => {
  const { user, userLoading } = useAppSelector(selectAuth);

  if (userLoading) return <AppBackDrop open={true} />;

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
