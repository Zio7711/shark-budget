import {
  BillingPage,
  ErrorPage,
  ExpensePage,
  LandingPage,
  RegisterPage,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/" element={<BillingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
