
import { Link } from "react-router-dom";
import {
  Plus,
  Clock3,
  HandHeart,
  PackageCheck,
} from "lucide-react";
const stats = [
  {
    title: "Total Donations",
    value: "12",
    icon: Clock3,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Picked Up",
    value: "8",
    icon: PackageCheck,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Pending Requests",
    value: "4",
    icon: HandHeart,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

const recentDonations = [
  {
    id: 1,
    name: "Veg Pulao",
    quantity: "50 servings",
    posted: "Posted 2 hours ago",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500&q=85",
  },
  {
    id: 2,
    name: "Idli & Sambar",
    quantity: "80 servings",
    posted: "Posted 5 hours ago",
    status: "Requested",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=85",
  },
  {
    id: 3,
    name: "Vegetable Meals",
    quantity: "35 servings",
    posted: "Posted yesterday",
    status: "Picked Up",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=85",
  },
];

function DonorDashboard() {
  return (
          <div className="mx-auto max-w-[1500px]">

            {/* Welcome Section */}
            <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
                  Donor Dashboard
                </h1>

                <p className="mt-2 text-base font-medium text-gray-600">
                  Welcome back, AIT Hostel Mess 👋
                </p>
              </div>

              <Link
                to="/donor/create"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <Plus size={19} strokeWidth={2.5} />
                Add Donation
              </Link>
            </section>

            {/* Statistics */}
            <section className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                        <Icon size={21} className={stat.color} />
                      </div>
                    </div>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                  </div>
                );
              })}

            </section>

            {/* Recent Donations */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Donations
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep track of your recently listed food donations.
                </p>
              </div>

              <div className="divide-y divide-gray-100">

                {recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex flex-col gap-4 px-5 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:px-6"
                  >

                    {/* Food Image */}
                    <img
                      src={donation.image}
                      alt={donation.name}
                      className="h-28 w-full rounded-xl object-cover sm:h-[100px] sm:w-44"
                    />

                    {/* Donation Information */}
                    <div className="min-w-0 flex-1">

                      <h3 className="text-base font-bold text-gray-900">
                        {donation.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        Qty: {donation.quantity}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Status:
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            donation.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : donation.status === "Requested"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </div>
                    </div>

                    {/* Posted Time */}
                    <p className="text-sm text-gray-500 sm:self-start sm:pt-2">
                      {donation.posted}
                    </p>

                  </div>
                ))}

              </div>

              <div className="border-t border-gray-100 px-5 py-4 text-center sm:px-6">
                <Link
                  to="/donor/donations"
                  className="text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  View All Donations →
                </Link>
              </div>

            </section>

            {/* Footer */}
            <footer className="py-7 text-center text-xs text-gray-400">
              © 2026 KindBites. Share Food, Spread Kindness.
            </footer>

          </div>
  );
}

export default DonorDashboard;

