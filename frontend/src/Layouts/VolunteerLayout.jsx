
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import VolunteerSidebar from "../Components/Volunteer/VolunteerSidebar";
import VolunteerNavbar from "../Components/Volunteer/VolunteerNavbar";

const pageTitles = {
  dashboard: "Dashboard",
  browse: "Browse Donations",
  requests: "My Requests",
  pickups: "My Pickups",
  history: "Distribution History",
  profile: "My Profile",
};

export default function VolunteerLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const currentPage = pathname.split("/").filter(Boolean).at(-1);
  const title = pageTitles[currentPage] || "Volunteer Portal";

  return (
    <div className="min-h-screen bg-[#f7f9fc] md:flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <VolunteerSidebar />
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-end border-b border-gray-100 px-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="h-[calc(100%-64px)]">
              <VolunteerSidebar onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <VolunteerNavbar
          title={title}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
