import { useState } from "react";
import { Link } from "react-router-dom";
import {

    Utensils,
    Building2,
    Bike,
    Eye,
    EyeOff,
    Mail,
    Lock,
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

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState("donor");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect your login API here.
        console.log({
            ...formData,
            role: selectedRole,
        });
    };

    return (
        <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-3xl">

                {/* Logo */}
                <div className="flex justify-center mb-7">
                    <Link to="/" className="flex items-center">
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
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Login to your KindBites account
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-9">

                    <form onSubmit={handleSubmit}>

                        {/* Role Selection */}
                        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRole === role.id;

                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`flex flex-col items-center justify-center rounded-xl border-2 px-3 py-5 text-center transition-all ${isSelected
                                                ? "border-green-600 bg-green-50 text-green-800 shadow-sm"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                                            }`}
                                    >
                                        <Icon
                                            size={25}
                                            className={isSelected ? "text-green-700" : "text-gray-500"}
                                        />

                                        <span className="mt-2 font-bold">
                                            {role.title}
                                        </span>

                                        <span className="mt-1 text-xs text-gray-500">
                                            {role.subtitle}
                                        </span>
                                    </button>
                                );
                            })}
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
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-800">
                                    Password <span className="text-red-500">*</span>
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-green-700 hover:text-green-800"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

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
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="mt-5 w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99]"
                        >
                            Login to Your Account
                        </button>

                    </form>

                    {/* Signup */}
                    <div className="mt-7 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-bold text-green-700 underline underline-offset-2 hover:text-green-800"
                        >
                            Create Account
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