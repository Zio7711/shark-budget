import { BillingPage, ErrorPage, LandingPage, RegisterPage } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
