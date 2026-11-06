
import { Routes, Route, Navigate } from "react-router-dom";
import VolunteerLayout from "../Layouts/VolunteerLayout";
import VolunteerDashboard from "../Pages/Volunteer/VolunteerDashboard";
import BrowseDonations from "../Pages/NGO/BrowseDonations";
import MyRequests from "../Pages/NGO/MyRequests";
import MyPickups from "../Pages/Volunteer/MyPickups";
import DistributionHistory from "../Pages/Volunteer/DistributionHistory";
import Profile from "../Pages/Profile";

export default function VolunteerRoutes() {
    return (
        <Routes>
            <Route element={<VolunteerLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<VolunteerDashboard />} />
                <Route path="browse" element={<BrowseDonations />} />
                <Route path="requests" element={<MyRequests />} />
                <Route path="pickups" element={<MyPickups />} />
                <Route path="history" element={<DistributionHistory />} />
                <Route path="profile" element={<Profile role="volunteer" />} />
            </Route>
        </Routes>
    );
}
