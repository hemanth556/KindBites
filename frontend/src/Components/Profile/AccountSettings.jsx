import React from "react";
import { LockKeyhole, Bell, ShieldCheck } from "lucide-react";

export default function AccountSettings() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-green-50 p-2 text-green-600">
          <LockKeyhole size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            Account Settings
          </h2>
          <p className="text-xs text-gray-500">
            Manage your security and preferences
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <LockKeyhole className="text-gray-500" size={19} />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Change Password
              </p>
              <p className="text-xs text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <Bell className="text-gray-500" size={19} />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Notifications
              </p>
              <p className="text-xs text-gray-500">
                Manage notification preferences
              </p>
            </div>
          </div>

          <span className="text-xs font-medium text-green-600">
            Enabled
          </span>
        </div>

        <div className="flex items-center gap-3 py-4">
          <ShieldCheck className="text-gray-500" size={19} />
          <div>
            <p className="text-sm font-medium text-gray-800">
              Account Security
            </p>
            <p className="text-xs text-gray-500">
              Your account information is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}