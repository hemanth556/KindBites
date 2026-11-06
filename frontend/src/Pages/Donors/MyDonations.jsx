
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Package,
  CheckCircle,
  Clock,
  HandHeart,
  Eye,
  Pencil,
  Filter,
} from "lucide-react";

const initialDonations = [
  {
    id: "KB001",
    name: "Veg Pulao",
    type: "Meal",
    quantity: "50 servings",
    date: "05 Nov 2026",
    pickupBefore: "05 Nov, 08:00 PM",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500&q=85",
  },
  {
    id: "KB002",
    name: "Idli & Sambar",
    type: "Breakfast",
    quantity: "80 servings",
    date: "05 Nov 2026",
    pickupBefore: "05 Nov, 09:00 PM",
    status: "Requested",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=85",
  },
  {
    id: "KB003",
    name: "Vegetable Meals",
    type: "Meal",
    quantity: "35 servings",
    date: "04 Nov 2026",
    pickupBefore: "04 Nov, 08:00 PM",
    status: "Picked Up",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=85",
  },
  {
    id: "KB004",
    name: "Chapati & Curry",
    type: "Meal",
    quantity: "60 servings",
    date: "03 Nov 2026",
    pickupBefore: "03 Nov, 09:00 PM",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=85",
  },
];

const statusStyles = {
  Available: "bg-green-100 text-green-700",
  Requested: "bg-orange-100 text-orange-700",
  "Picked Up": "bg-blue-100 text-blue-700",
  Expired: "bg-red-100 text-red-700",
};

function MyDonations() {
  const [donations] = useState(initialDonations);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Available",
    "Requested",
    "Picked Up",
    "Expired",
  ];

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.name.toLowerCase().includes(search.toLowerCase()) ||
        donation.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        activeFilter === "All" || donation.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [donations, search, activeFilter]);

  const summary = [
    {
      title: "Total Donations",
      value: donations.length,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Available",
      value: donations.filter((d) => d.status === "Available").length,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Requested",
      value: donations.filter((d) => d.status === "Requested").length,
      icon: HandHeart,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Picked Up",
      value: donations.filter((d) => d.status === "Picked Up").length,
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px]">

      {/* Page Heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Donations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all your food donations.
          </p>
        </div>

        <Link
          to="/donor/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <Plus size={19} />
          Add Donation
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <div className={`rounded-lg p-2.5 ${item.bg}`}>
                  <Icon size={21} className={item.color} />
                </div>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Donations Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Donations
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your listed food donations.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search donations..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto border-b border-gray-100 px-5 py-4 sm:px-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[950px] text-left">

            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">Food Details</th>
                <th className="px-6 py-4">Donation ID</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Posted Date</th>
                <th className="px-6 py-4">Pickup Before</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredDonations.map((donation) => (
                <tr
                  key={donation.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={donation.image}
                        alt={donation.name}
                        className="h-12 w-14 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {donation.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {donation.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {donation.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {donation.quantity}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {donation.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {donation.pickupBefore}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                        statusStyles[donation.status]
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        title="View donation"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        title="Edit donation"
                        disabled={donation.status !== "Available"}
                        className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Pencil size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDonations.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Filter className="mx-auto mb-3 text-gray-300" size={30} />
                    <p className="font-semibold text-gray-700">
                      No donations found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {filteredDonations.map((donation) => (
            <article key={donation.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <img src={donation.image} alt={donation.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="break-words font-semibold text-gray-900">{donation.name}</h3>
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[donation.status]}`}>{donation.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{donation.type} · {donation.id}</p>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div><dt className="text-xs text-gray-500">Quantity</dt><dd className="mt-0.5 break-words text-gray-800">{donation.quantity}</dd></div>
                <div><dt className="text-xs text-gray-500">Posted</dt><dd className="mt-0.5 break-words text-gray-800">{donation.date}</dd></div>
                <div className="col-span-2"><dt className="text-xs text-gray-500">Pickup before</dt><dd className="mt-0.5 break-words text-gray-800">{donation.pickupBefore}</dd></div>
              </dl>
              <div className="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
                <button type="button" title="View donation" aria-label={`View ${donation.name}`} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Eye size={18} /></button>
                <button type="button" title="Edit donation" aria-label={`Edit ${donation.name}`} disabled={donation.status !== "Available"} className="rounded-lg p-2 text-green-600 hover:bg-green-50 disabled:opacity-30"><Pencil size={18} /></button>
              </div>
            </article>
          ))}
          {filteredDonations.length === 0 && <p className="py-8 text-center text-sm text-gray-500">No donations found.</p>}
        </div>
        {/* Table Footer */}
        <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredDonations.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {donations.length}
            </span>{" "}
            donations
          </p>
        </div>

      </div>
    </div>
  );
}

export default MyDonations;
