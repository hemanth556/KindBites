
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Building2,
  Bike,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Eye,
  EyeOff,

} from "lucide-react";
import logo from "../assets/kindbites-logo.png";

const roles = [
  {
    id: "donor",
    title: "Donor",
    subtitle: "Restaurant / Hostel / Event",
    icon: Utensils,
  },
  {
    id: "ngo",
    title: "NGO",
    subtitle: "Organization",
    icon: Building2,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    subtitle: "Delivery & Support",
    icon: Bike,
  },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    organizationName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      ...formData,
      role: selectedRole,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  return (
    <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src={logo}
              alt="KindBites"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-500">
            Join KindBites and help reduce food waste
          </p>
        </div>

        {/* Registration Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-9">

          <form onSubmit={handleSubmit}>

            {/* Role Selection */}
            <h2 className="mb-3 text-sm font-semibold text-gray-800">
              Register As
            </h2>

            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center rounded-xl border-2 px-3 py-5 text-center transition ${
                      isSelected
                        ? "border-green-600 bg-green-50 text-green-800"
                        : "border-gray-200 text-gray-600 hover:border-green-300"
                    }`}
                  >
                    <Icon
                      size={25}
                      className={isSelected ? "text-green-700" : "text-gray-500"}
                    />
                    <span className="mt-2 font-bold">{role.title}</span>
                    <span className="mt-1 text-xs text-gray-500">
                      {role.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Organization Name */}
            {selectedRole !== "volunteer" && (
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  {selectedRole === "donor"
                    ? "Restaurant / Organization Name"
                    : "NGO Name"}{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Building2
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Full Name */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {selectedRole === "volunteer"
                  ? "Full Name"
                  : "Contact Person Name"}{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <MapPin
                  size={19}
                  className="absolute left-4 top-4 text-gray-400"
                />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-700 underline underline-offset-2 hover:text-green-800"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 KindBites. Share Food, Spread Kindness.
        </p>
      </div>
    </div>
  );
}
