
import { useMemo, useState } from "react";
import {
  Search,
  History,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Package,
  Filter,
} from "lucide-react";

const initialHistory = [
  {
    id: "KB001",
    foodName: "Veg Pulao",
    foodType: "Meal",
    quantity: "50 servings",
    donatedDate: "02 Nov 2026",
    pickupDate: "02 Nov 2026, 07:30 PM",
    ngoName: "Helping Hands Foundation",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=85",
  },
  {
    id: "KB002",
    foodName: "Idli & Sambar",
    foodType: "Breakfast",
    quantity: "80 servings",
    donatedDate: "01 Nov 2026",
    pickupDate: "01 Nov 2026, 08:00 PM",
    ngoName: "Hope for All NGO",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=85",
  },
  {
    id: "KB003",
    foodName: "Vegetable Meals",
    foodType: "Meal",
    quantity: "35 servings",
    donatedDate: "30 Oct 2026",
    pickupDate: "30 Oct 2026, 06:00 PM",
    ngoName: "Smile Foundation",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=85",
  },
  {
    id: "KB004",
    foodName: "Chapati & Curry",
    foodType: "Meal",
    quantity: "60 servings",
    donatedDate: "28 Oct 2026",
    pickupDate: "28 Oct 2026, 09:00 PM",
    ngoName: "Care & Share Trust",
    status: "Expired",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=85",
  },
  {
    id: "KB005",
    foodName: "Fresh Fruit Boxes",
    foodType: "Fruits",
    quantity: "25 boxes",
    donatedDate: "25 Oct 2026",
    pickupDate: "25 Oct 2026, 05:00 PM",
    ngoName: "Helping Hands Foundation",
    status: "Cancelled",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=85",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Expired: "bg-orange-100 text-orange-700",
  Cancelled: "bg-red-100 text-red-700",
};

function DonationHistory() {
  const [history] = useState(initialHistory);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Completed", "Expired", "Cancelled"];

  const filteredHistory = useMemo(() => {
    return history.filter((donation) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        donation.foodName.toLowerCase().includes(searchText) ||
        donation.id.toLowerCase().includes(searchText) ||
        donation.ngoName.toLowerCase().includes(searchText);

      const matchesStatus =
        activeFilter === "All" || donation.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, search, activeFilter]);

  const summary = [
    {
      title: "Total Donations",
      value: history.length,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Completed",
      value: history.filter((d) => d.status === "Completed").length,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Expired",
      value: history.filter((d) => d.status === "Expired").length,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Cancelled",
      value: history.filter((d) => d.status === "Cancelled").length,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px]">

      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">
          Donation History
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Track all your past food donations and their outcomes.
        </p>
      </div>

      {/* Summary Cards */}
      <section className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
      </section>

      {/* History Table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Table Heading */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Donation Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your complete donation activity.
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
              placeholder="Search food, NGO or ID..."
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
          <table className="w-full min-w-[1000px] text-left">

            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">Food Details</th>
                <th className="px-6 py-4">Donation ID</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Donated Date</th>
                <th className="px-6 py-4">NGO</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredHistory.map((donation) => (
                <tr
                  key={donation.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Food Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={donation.image}
                        alt={donation.foodName}
                        className="h-12 w-14 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {donation.foodName}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {donation.foodType}
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
                    {donation.donatedDate}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {donation.ngoName}
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
                    <button
                      type="button"
                      title="View donation details"
                      onClick={() =>
                        alert(
                          `Donation: ${donation.foodName}\nPickup: ${donation.pickupDate}\nNGO: ${donation.ngoName}`
                        )
                      }
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-14 text-center">
                    <Filter
                      size={32}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-semibold text-gray-700">
                      No donation records found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try another search term or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-3 md:hidden">
          {filteredHistory.map((donation) => (
            <article key={donation.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <img src={donation.image} alt={donation.foodName} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><h3 className="break-words font-semibold text-gray-900">{donation.foodName}</h3><p className="mt-1 text-xs text-gray-500">{donation.foodType} · {donation.id}</p></div>
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[donation.status]}`}>{donation.status}</span>
                  </div>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div><dt className="text-xs text-gray-500">Quantity</dt><dd className="mt-0.5 break-words text-gray-800">{donation.quantity}</dd></div>
                <div><dt className="text-xs text-gray-500">Donated</dt><dd className="mt-0.5 break-words text-gray-800">{donation.donatedDate}</dd></div>
                <div className="col-span-2"><dt className="text-xs text-gray-500">NGO</dt><dd className="mt-0.5 break-words text-gray-800">{donation.ngoName}</dd></div>
              </dl>
              <button type="button" onClick={() => alert(`Donation: ${donation.foodName}\nPickup: ${donation.pickupDate}\nNGO: ${donation.ngoName}`)} className="mt-3 flex w-full items-center justify-center gap-2 border-t border-gray-100 pt-3 text-sm font-semibold text-blue-600"><Eye size={17} /> View details</button>
            </article>
          ))}
          {filteredHistory.length === 0 && <p className="py-8 text-center text-sm text-gray-500">No donation records found.</p>}
        </div>
        {/* Footer */}
        <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredHistory.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {history.length}
            </span>{" "}
            records
          </p>
        </div>

      </section>

      {/* Impact Message */}
      <div className="mt-6 flex flex-col items-start gap-3 rounded-xl sm:flex-row sm:items-center border border-green-100 bg-green-50 p-5">
        <div className="rounded-full bg-white p-3 text-green-700">
          <History size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-green-900">
            Every donation makes a difference!
          </h3>

          <p className="mt-1 text-sm text-green-700">
            Thank you for helping reduce food waste and feed communities.
          </p>
        </div>
      </div>

    </div>
  );
}

export default DonationHistory;
