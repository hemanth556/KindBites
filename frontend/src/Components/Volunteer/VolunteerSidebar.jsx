
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  ClipboardList,
  Package,
  History,
  UserRound,
  Heart,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/volunteer/dashboard", icon: LayoutDashboard },
  { name: "Browse Donations", path: "/volunteer/browse", icon: Search },
  { name: "My Requests", path: "/volunteer/requests", icon: ClipboardList },
  { name: "My Pickups", path: "/volunteer/pickups", icon: Package },
  { name: "Distribution History", path: "/volunteer/history", icon: History },
  { name: "My Profile", path: "/volunteer/profile", icon: UserRound },
];

export default function VolunteerSidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-[74px] items-center border-b border-gray-100 px-6">
        <img
          src="/kindbites-logo.png"
          alt="KindBites"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="px-5 py-5">
        <div className="rounded-lg bg-green-50 px-4 py-3">
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="mt-1 font-semibold text-green-700">Volunteer</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Heart size={16} className="text-green-600" />
          <span>Making a difference, one meal at a time.</span>
        </div>
      </div>
    </aside>
  );
}
