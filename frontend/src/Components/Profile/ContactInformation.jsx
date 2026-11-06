import React from "react";
import { MapPin, Phone } from "lucide-react";

export default function ContactInformation({ profile, onChange }) {
  const handleChange = (e) => {
    onChange({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const fields = [
    { name: "phone", label: "Phone Number", placeholder: "Enter phone number" },
    { name: "address", label: "Address", placeholder: "Enter street address" },
    { name: "city", label: "City", placeholder: "Enter city" },
    { name: "state", label: "State", placeholder: "Enter state" },
    { name: "pincode", label: "PIN Code", placeholder: "Enter PIN code" },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg bg-green-50 p-2 text-green-600">
          <MapPin size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            Contact Information
          </h2>
          <p className="text-xs text-gray-500">
            Update your contact and address details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name === "address" ? "sm:col-span-2" : ""}
          >
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <input
              name={field.name}
              value={profile[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}