
import React from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Users,
  MapPin,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Pickups",
    value: "18",
    description: "Food pickups completed",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Requests",
    value: "03",
    description: "Waiting for donor approval",
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Approved Pickups",
    value: "02",
    description: "Ready for collection",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "People Served",
    value: "450",
    description: "People helped so far",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentActivity = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    servings: 40,
    location: "Bangalore",
    status: "Ready for Pickup",
    date: "Today, 11:30 AM",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    servings: 30,
    location: "Bangalore",
    status: "Pending",
    date: "Today, 10:15 AM",
  },
  {
    id: 3,
    food: "Packed Lunch Boxes",
    donor: "Food Corner",
    servings: 25,
    location: "Mysore",
    status: "Completed",
    date: "Yesterday",
  },
];

const statusStyles = {
  "Ready for Pickup": "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function VolunteerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Volunteer!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your food collection and distribution activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={23} />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-green-600 p-6 text-white">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Ready to make a difference?
            </h2>
            <p className="mt-1 text-sm text-green-100">
              Find available food donations and help someone today.
            </p>
          </div>

          <Link
            to="/volunteer/browse"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            Browse Donations
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold text-gray-800">
              Recent Activity
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Your latest pickup requests
            </p>
          </div>

          <Link
            to="/volunteer/requests"
            className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-medium text-gray-800">
                  {activity.food}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Donor: {activity.donor}
                </p>

                <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Package size={14} />
                    {activity.servings} servings
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {activity.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {activity.date}
                  </span>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${
                  statusStyles[activity.status]
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
