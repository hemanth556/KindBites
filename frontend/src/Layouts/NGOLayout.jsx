
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";

import NGOSidebar from "../Components/NGO/NGOSidebar";
import NGONavbar from "../Components/NGO/NGONavbar";

const pageTitles = {
  dashboard: "Dashboard",
  browse: "Browse Donations",
  requests: "My Requests",
  received: "Received Donations",
  profile: "Profile",
};

export default function NGOLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const currentPage =
    pathname.split("/").filter(Boolean).at(-1) || "dashboard";

  return (
    <div className="min-h-screen bg-[#f7f9fc] md:flex">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <NGOSidebar />
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="NGO navigation"
        >
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

            <NGOSidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">

        <NGONavbar
          title={pageTitles[currentPage] || "NGO Portal"}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
