import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, LandingPage, RegisterPage } from "./pages";

import MainPage from "./pages/MainPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { getCurrentUser } from "./store/authSlice";
import useAppDispatch from "./hooks/useAppDispatch";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
