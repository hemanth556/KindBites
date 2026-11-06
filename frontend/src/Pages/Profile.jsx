import React, { useState } from "react";
import { Save } from "lucide-react";

import ProfileHeader from "../Components/Profile/ProfileHeader";
import PersonalInformation from "../Components/Profile/PersonalInformation";
import ContactInformation from "../Components/Profile/ContactInformation";
import RoleSpecificInformation from "../Components/Profile/RoleSpecificInformation";
import AccountSettings from "../Components/Profile/AccountSettings";

export default function Profile({ role = "volunteer" }) {
  const [profile, setProfile] = useState({
    name: "Hemanth",
    email: "hemanth@example.com",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    availability: "",
    preferredLocation: "",
    emergencyContact: "",
    businessName: "",
    businessType: "",
    contactPerson: "",
    pickupAddress: "",
    organizationName: "",
    registrationNumber: "",
    representative: "",
    organizationAddress: "",
  });

  const handleSave = (e) => {
    e.preventDefault();

    // Connect your profile update API here.
    console.log("Profile data:", profile);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account preferences.
        </p>
      </div>

      <ProfileHeader profile={profile} role={role} />

      <form onSubmit={handleSave} className="space-y-6">
        <PersonalInformation
          profile={profile}
          onChange={setProfile}
        />

        <ContactInformation
          profile={profile}
          onChange={setProfile}
        />

        <RoleSpecificInformation
          role={role}
          profile={profile}
          onChange={setProfile}
        />

        <AccountSettings />

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}