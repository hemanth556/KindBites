import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DonorRoutes from "./Routes/DonorRoutes";
import NGORoutes from "./Routes/NGORoutes";
import VolunteerRoutes from "./Routes/VolunteerRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/donor/*" element={<DonorRoutes />} />
      <Route path="/ngo/*" element={<NGORoutes />} />
      <Route path="/volunteer/*" element={<VolunteerRoutes />} />
    </Routes>
  );
}

export default App;