import React from "react";
import { UserRound } from "lucide-react";

export default function PersonalInformation({ profile, onChange }) {
  const handleChange = (e) => {
    onChange({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-green-50 p-2 text-green-600">
          <UserRound size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            Personal Information
          </h2>
          <p className="text-xs text-gray-500">
            Manage your basic personal details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
}