import React from "react";
import { Building2, UserRound } from "lucide-react";

const roleFields = {
  donor: [
    { name: "businessName", label: "Business / Restaurant Name" },
    { name: "businessType", label: "Business Type" },
    { name: "contactPerson", label: "Contact Person" },
    { name: "pickupAddress", label: "Food Pickup Address" },
  ],
  ngo: [
    { name: "organizationName", label: "NGO Name" },
    { name: "registrationNumber", label: "Registration Number" },
    { name: "representative", label: "Authorized Representative" },
    { name: "organizationAddress", label: "Organization Address" },
  ],
  volunteer: [
    { name: "availability", label: "Availability" },
    { name: "preferredLocation", label: "Preferred Service Location" },
    { name: "emergencyContact", label: "Emergency Contact" },
  ],
};

export default function RoleSpecificInformation({
  role,
  profile,
  onChange,
}) {
  const fields = roleFields[role] || [];

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
          {role === "volunteer" ? (
            <UserRound size={20} />
          ) : (
            <Building2 size={20} />
          )}
        </div>

        <div>
          <h2 className="font-semibold capitalize text-gray-800">
            {role} Information
          </h2>
          <p className="text-xs text-gray-500">
            Manage your {role} account details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name.toLowerCase().includes("address")
              ? "sm:col-span-2"
              : ""}
          >
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <input
              name={field.name}
              value={profile[field.name] || ""}
              onChange={handleChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}