
import { useMemo, useState } from "react";
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  HandHeart,
  CalendarDays,
  MapPin,
  Phone,
  Filter,
  Utensils,
} from "lucide-react";

const initialRequests = [
  {
    id: "REQ001",
    ngoName: "Helping Hands Foundation",
    foodName: "Veg Pulao",
    quantity: "30 servings",
    requestedDate: "05 Nov 2026",
    pickupDate: "05 Nov 2026, 07:00 PM",
    address: "BTM Layout, Bengaluru",
    phone: "+91 9876543210",
    message: "We need these meals for children at our shelter.",
    status: "Pending",
  },
  {
    id: "REQ002",
    ngoName: "Hope for All NGO",
    foodName: "Idli & Sambar",
    quantity: "40 servings",
    requestedDate: "05 Nov 2026",
    pickupDate: "05 Nov 2026, 08:00 PM",
    address: "HSR Layout, Bengaluru",
    phone: "+91 9876543211",
    message: "We would like to collect food for elderly people.",
    status: "Pending",
  },
  {
    id: "REQ003",
    ngoName: "Smile Foundation",
    foodName: "Vegetable Meals",
    quantity: "25 servings",
    requestedDate: "04 Nov 2026",
    pickupDate: "04 Nov 2026, 06:00 PM",
    address: "Electronic City, Bengaluru",
    phone: "+91 9876543212",
    message: "Requested for our community food distribution.",
    status: "Accepted",
  },
  {
    id: "REQ004",
    ngoName: "Care & Share Trust",
    foodName: "Chapati & Curry",
    quantity: "20 servings",
    requestedDate: "03 Nov 2026",
    pickupDate: "03 Nov 2026, 08:00 PM",
    address: "Koramangala, Bengaluru",
    phone: "+91 9876543213",
    message: "Food required for families in need.",
    status: "Rejected",
  },
];

const statusStyles = {
  Pending: "bg-orange-100 text-orange-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function PickupRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Pending", "Accepted", "Rejected"];

  // Accept or reject a request
  const handleRequestAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  // Search and filter
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        request.ngoName.toLowerCase().includes(searchText) ||
        request.foodName.toLowerCase().includes(searchText) ||
        request.id.toLowerCase().includes(searchText);

      const matchesStatus =
        activeFilter === "All" || request.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, activeFilter]);

  // Summary cards
  const summary = [
    {
      title: "Total Requests",
      value: requests.length,
      icon: HandHeart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Pending",
      value: requests.filter((r) => r.status === "Pending").length,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Accepted",
      value: requests.filter((r) => r.status === "Accepted").length,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Rejected",
      value: requests.filter((r) => r.status === "Rejected").length,
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
          Pickup Requests
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage food pickup requests received from NGOs.
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

      {/* Requests Container */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Header and Search */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Pickup Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review and respond to NGO requests.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search NGO or food..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Filters */}
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

        {/* Requests List */}
        <div className="divide-y divide-gray-100">

          {filteredRequests.map((request) => (
            <article
              key={request.id}
              className="p-5 transition hover:bg-gray-50 sm:p-6"
            >
              {/* NGO Details and Status */}
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <HandHeart size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {request.ngoName}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Request ID: {request.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                    statusStyles[request.status]
                  }`}
                >
                  {request.status}
                </span>
              </div>

              {/* Request Information */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="flex items-start gap-3">
                  <Utensils size={18} className="mt-0.5 text-green-600" />

                  <div>
                    <p className="text-xs text-gray-400">
                      Food Requested
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {request.foodName}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {request.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-0.5 text-blue-600" />

                  <div>
                    <p className="text-xs text-gray-400">
                      Pickup Schedule
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {request.pickupDate}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Requested on {request.requestedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-orange-500" />

                  <div>
                    <p className="text-xs text-gray-400">
                      Pickup Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {request.address}
                    </p>
                  </div>
                </div>

              </div>

              {/* NGO Message */}
              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">
                  Message from NGO
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  "{request.message}"
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={15} />
                  {request.phone}
                </div>

                {request.status === "Pending" ? (
                  <div className="flex w-full gap-2 sm:w-auto sm:gap-3">

                    <button
                      onClick={() =>
                        handleRequestAction(request.id, "Rejected")
                      }
                      className="flex-1 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:flex-none"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleRequestAction(request.id, "Accepted")
                      }
                      className="flex-1 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:flex-none"
                    >
                      Accept Request
                    </button>

                  </div>
                ) : (
                  <p className="text-xs font-medium text-gray-400">
                    Response: {request.status}
                  </p>
                )}

              </div>
            </article>
          ))}

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="px-6 py-14 text-center">
              <Filter
                size={32}
                className="mx-auto mb-3 text-gray-300"
              />

              <h3 className="font-semibold text-gray-700">
                No requests found
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Try changing your search or status filter.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredRequests.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {requests.length}
            </span>{" "}
            requests
          </p>
        </div>

      </section>
    </div>
  );
}

export default PickupRequests;
