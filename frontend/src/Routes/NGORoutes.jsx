
import { Routes, Route, Navigate } from "react-router-dom";

import NGOLayout from "../Layouts/NGOLayout";

import NGODashboard from "../Pages/NGO/NGODashboard";
import BrowseDonations from "../Pages/NGO/BrowseDonations";
import MyRequests from "../Pages/NGO/MyRequests";
import ReceivedDonations from "../Pages/NGO/ReceivedDonations";
import Profile from "../Pages/Profile";

export default function NGORoutes() {
  return (
    <Routes>
      <Route element={<NGOLayout />}>

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route path="dashboard" element={<NGODashboard />} />
        <Route path="browse" element={<BrowseDonations />} />
        <Route path="requests" element={<MyRequests />} />
        <Route path="received" element={<ReceivedDonations />} />
        <Route path="profile" element={<Profile role="ngo" />} />

      </Route>
    </Routes>
  );
}
