
import { Link } from "react-router-dom";
import {
  Search,
  ClipboardList,
  PackageCheck,
  HandHeart,
} from "lucide-react";

const stats = [
  {
    title: "Available Donations",
    value: "24",
    icon: Search,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Pending Requests",
    value: "5",
    icon: ClipboardList,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Received Donations",
    value: "12",
    icon: PackageCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "People Served",
    value: "850",
    icon: HandHeart,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const recentRequests = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    quantity: "100 servings",
    date: "16 Oct, 08:00 PM",
    status: "Approved",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    quantity: "80 servings",
    date: "16 Oct, 09:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    food: "Chapati & Curry",
    donor: "Event Catering",
    quantity: "120 servings",
    date: "17 Oct, 12:00 PM",
    status: "Rejected",
  },
];

export default function NGODashboard() {
  return (
    <div className="mx-auto max-w-[1500px]">

      {/* Welcome Section */}
      <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
            NGO Dashboard
          </h1>

          <p className="mt-2 text-base font-medium text-gray-600">
            Welcome back, Helping Hands NGO 👋
          </p>
        </div>

        <Link
          to="/ngo/browse"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          <Search size={19} />
          Browse Donations
        </Link>

      </section>

      {/* Statistics */}
      <section className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <Icon size={21} className={stat.color} />
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

      {/* Recent Requests */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Pickup Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track the status of your food collection requests.
            </p>
          </div>

          <Link
            to="/ngo/requests"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            View All →
          </Link>
        </div>

        <div className="divide-y divide-gray-100">

          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-3 px-5 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:px-6"
            >

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900">
                  {request.food}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Donor: {request.donor}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {request.quantity} · {request.date}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  request.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : request.status === "Pending"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {request.status}
              </span>

            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="py-7 text-center text-xs text-gray-400">
        © 2026 KindBites. Share Food, Spread Kindness.
      </footer>

    </div>
  );
}
