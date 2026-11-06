
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  ClipboardList,
  Handshake,
  History,
  UserRound,
  Leaf,
} from "lucide-react";
import logo from "../../assets/kindbites-logo.png";

const menuItems = [
  {
    title: "Dashboard",
    path: "/donor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Donation",
    path: "/donor/create",
    icon: PlusSquare,
  },
  {
    title: "My Donations",
    path: "/donor/donations",
    icon: ClipboardList,
  },
  {
    title: "Pickup Requests",
    path: "/donor/requests",
    icon: Handshake,
  },
  {
    title: "History",
    path: "/donor/history",
    icon: History,
  },
  {
    title: "Profile",
    path: "/donor/profile",
    icon: UserRound,
  },
];

function DonorSidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-gray-200 bg-white md:w-60">
      {/* Logo */}
      <div className="flex h-[74px] items-center border-b border-gray-100 px-6">
        <NavLink to="/">
          <img
            src={logo}
            alt="KindBites"
            className="h-11 w-auto object-contain"
          />
        </NavLink>
      </div>

      {/* User Role */}
      <div className="flex items-center gap-3 px-5 py-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white">
          <UserRound size={20} />
        </div>

        <span className="text-sm font-bold text-gray-800">
          Donor
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={19} strokeWidth={2} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Branding */}
      <div className="border-t border-gray-100 px-5 py-5">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Leaf size={15} className="text-green-600" />
          Share Food, Spread Kindness.
        </div>
      </div>
    </aside>
  );
}

export default DonorSidebar;

