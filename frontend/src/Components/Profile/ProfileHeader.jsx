import React from "react";
import { Camera, ShieldCheck } from "lucide-react";

export default function ProfileHeader({ profile, role }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-semibold text-green-700">
            {profile.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <button
            type="button"
            className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-green-600 p-2 text-white"
            aria-label="Change profile photo"
          >
            <Camera size={14} />
          </button>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">
            {profile.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {profile.email}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-700">
              {role} Account
            </span>

            <span className="flex items-center gap-1 text-xs text-green-600">
              <ShieldCheck size={15} />
              Profile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}