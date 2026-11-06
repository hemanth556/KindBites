
import React from "react";
import { Menu, Bell } from "lucide-react";

export default function VolunteerNavbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6 md:h-[74px]">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
            V
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Volunteer
            </p>
            <p className="text-xs text-gray-500">Volunteer Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
