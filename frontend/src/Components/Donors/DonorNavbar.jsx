import { Bell, Menu } from "lucide-react";

export default function DonorNavbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-3 sm:h-[74px] sm:px-5 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="truncate text-sm font-semibold text-gray-800 sm:text-base">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button type="button" className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-600 ring-2 ring-white" />
        </button>
        <div className="flex min-w-0 items-center gap-2 border-l border-gray-200 pl-2 sm:gap-3 sm:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800 sm:h-10 sm:w-10">A</div>
          <div className="hidden min-w-0 sm:block">
            <p className="max-w-48 truncate text-sm font-semibold text-gray-800">AIT Hostel Mess</p>
            <p className="text-xs text-gray-400">Donor Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
