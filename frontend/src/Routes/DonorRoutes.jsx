
import { Routes, Route, Navigate } from "react-router-dom";

import DonorLayout from "../Layouts/DonorLayout";
import DonorDashboard from "../Pages/Donors/DonorDashboard";
import CreateDonation from "../Pages/Donors/CreateDonation";
import MyDonations from "../Pages/Donors/MyDonations";
import PickupRequests from "../Pages/Donors/PickupRequests";
import DonationHistory from "../Pages/Donors/DonationHistory";
import Profile from "../Pages/Profile";

export default function DonorRoutes() {
  return (
    <Routes>
      <Route element={<DonorLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DonorDashboard />} />

        {/* We'll add these pages when you provide their designs */}
        <Route path="create" element={<CreateDonation />} />
        <Route path="donations" element={<MyDonations />} />
        <Route path="requests" element={<PickupRequests />} />
        <Route path="history" element={<DonationHistory />} />
        <Route path="profile" element={<Profile role="donor" />} />
      </Route>
    </Routes>
  );
}
