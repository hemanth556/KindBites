import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import DonorSidebar from "../Components/Donors/DonorSidebar";
import DonorNavbar from "../Components/Donors/DonorNavbar";

const pageTitles = {
  dashboard: "Dashboard",
  create: "Add Donation",
  donations: "My Donations",
  requests: "Pickup Requests",
  history: "Donation History",
  profile: "Profile",
};

export default function DonorLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").filter(Boolean).at(-1) || "dashboard";

  return (
    <div className="min-h-screen bg-[#f7f9fc] md:flex">
      <div className="hidden md:block">
        <DonorSidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Donor navigation">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-black/40"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-[min(18rem,85vw)] shadow-xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
            <DonorSidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <DonorNavbar title={pageTitles[currentPage] || "Donor Portal"} onMenuClick={() => setMenuOpen(true)} />
        <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
