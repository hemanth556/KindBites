
import { useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const initialRequests = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    servings: 40,
    date: "16 Oct 2026",
    time: "08:00 PM",
    location: "Bangalore",
    requestedOn: "15 Oct 2026",
    status: "PENDING",
    message: "We need food for 40 people at our shelter.",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    servings: 30,
    date: "16 Oct 2026",
    time: "09:00 PM",
    location: "Bangalore",
    requestedOn: "15 Oct 2026",
    status: "APPROVED",
    message: "We can arrange pickup with our volunteers.",
  },
  {
    id: 3,
    food: "Chapati & Curry",
    donor: "Event Catering",
    servings: 50,
    date: "17 Oct 2026",
    time: "12:00 PM",
    location: "Mysore",
    requestedOn: "16 Oct 2026",
    status: "READY_FOR_PICKUP",
    message: "Food is required for our community distribution.",
  },
  {
    id: 4,
    food: "Packed Lunch Boxes",
    donor: "Food Corner",
    servings: 20,
    date: "18 Oct 2026",
    time: "01:00 PM",
    location: "Mysore",
    requestedOn: "16 Oct 2026",
    status: "REJECTED",
    message: "Requesting 20 lunch boxes.",
  },
  {
    id: 5,
    food: "Poori & Masala",
    donor: "Sri Krishna Hotel",
    servings: 25,
    date: "14 Oct 2026",
    time: "11:00 AM",
    location: "Bangalore",
    requestedOn: "13 Oct 2026",
    status: "COMPLETED",
    message: "Collected for local food distribution.",
  },
];

const statusConfig = {
  PENDING: {
    label: "Pending Approval",
    className: "bg-amber-50 text-amber-700",
    icon: Clock,
  },
  APPROVED: {
    label: "Approved",
    className: "bg-blue-50 text-blue-700",
    icon: CheckCircle2,
  },
  READY_FOR_PICKUP: {
    label: "Ready for Pickup",
    className: "bg-purple-50 text-purple-700",
    icon: Package,
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-indigo-50 text-indigo-700",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-50 text-red-700",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-600",
    icon: X,
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-50 text-green-700",
    icon: CheckCircle2,
  },
};

const filters = [
  "All",
  "Pending",
  "Approved",
  "Ready for Pickup",
  "Rejected",
  "Cancelled",
  "Completed",
];

const filterStatus = {
  Pending: "PENDING",
  Approved: "APPROVED",
  "Ready for Pickup": "READY_FOR_PICKUP",
  Rejected: "REJECTED",
  Cancelled: "CANCELLED",
  Completed: "COMPLETED",
};

export default function MyRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      activeFilter === "All" ||
      request.status === filterStatus[activeFilter];

    const matchesSearch =
      request.food.toLowerCase().includes(search.toLowerCase()) ||
      request.donor.toLowerCase().includes(search.toLowerCase()) ||
      request.location.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const canCancel = (status) =>
    ["PENDING", "APPROVED", "READY_FOR_PICKUP"].includes(status);

  const handleCancelRequest = () => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((request) =>
        request.id === selectedRequest.id
          ? {
              ...request,
              status: "CANCELLED",
              cancellationReason: cancelReason.trim(),
            }
          : request
      )
    );

    setSelectedRequest(null);
    setCancelReason("");
  };

  const counts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "PENDING").length,
    approved: requests.filter((r) =>
      ["APPROVED", "READY_FOR_PICKUP"].includes(r.status)
    ).length,
    completed: requests.filter((r) => r.status === "COMPLETED").length,
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Heading */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
          My Requests
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Track and manage your food pickup requests
        </p>
      </section>

      {/* Statistics */}
      <section className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={counts.total}
          icon={Package}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          title="Pending Approval"
          value={counts.pending}
          icon={Clock}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Approved"
          value={counts.approved}
          icon={CheckCircle2}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Completed"
          value={counts.completed}
          icon={CheckCircle2}
          color="bg-purple-50 text-purple-600"
        />
      </section>

      {/* Search */}
      <section className="mb-5">
        <div className="relative max-w-md">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food, donor or location..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>
      </section>

      {/* Status Filters */}
      <section className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-green-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Request List */}
      <section className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => {
            const config = statusConfig[request.status];
            const StatusIcon = config.icon;

            return (
              <article
                key={request.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Request Information */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-gray-900">
                        {request.food}
                      </h2>

                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
                      >
                        <StatusIcon size={14} />
                        {config.label}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-500">
                      Donor:{" "}
                      <span className="font-semibold text-gray-700">
                        {request.donor}
                      </span>
                    </p>

                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 xl:grid-cols-4">
                      <InfoItem
                        icon={Users}
                        label={`${request.servings} servings`}
                      />
                      <InfoItem
                        icon={CalendarDays}
                        label={request.date}
                      />
                      <InfoItem
                        icon={Clock3}
                        label={request.time}
                      />
                      <InfoItem
                        icon={MapPin}
                        label={request.location}
                      />
                    </div>

                    <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                      <MessageSquare
                        size={16}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">
                          Your message to donor
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {request.message || "No message provided"}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">
                      Requested on {request.requestedOn}
                    </p>

                    {request.status === "CANCELLED" &&
                      request.cancellationReason && (
                        <p className="mt-2 text-xs text-gray-500">
                          Cancellation reason: {request.cancellationReason}
                        </p>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col gap-2 lg:w-44">
                    {canCancel(request.status) ? (
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <X size={16} />
                        Cancel Pickup
                      </button>
                    ) : request.status === "PICKED_UP" ? (
                      <span className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700">
                        <Package size={16} />
                        Already Picked Up
                      </span>
                    ) : (
                      <span className="px-3 py-2 text-center text-xs text-gray-400">
                        No actions available
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <Package size={40} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No requests found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or selected filter.
            </p>
          </div>
        )}
      </section>

      {/* Cancellation Confirmation Modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            setSelectedRequest(null);
            setCancelReason("");
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Cancel Pickup Request
              </h2>

              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(null);
                  setCancelReason("");
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 flex items-start gap-3 rounded-xl bg-red-50 p-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-600"
              />
              <p className="text-sm text-red-700">
                Are you sure you want to cancel your pickup request for{" "}
                <strong>{selectedRequest.food}</strong>?
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="cancelReason"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Reason for cancellation
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="cancelReason"
                rows="3"
                maxLength={300}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Tell the donor why you are cancelling..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(null);
                  setCancelReason("");
                }}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Keep Request
              </button>

              <button
                type="button"
                onClick={handleCancelRequest}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, Cancel Pickup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="shrink-0 text-gray-400" />
      <span>{label}</span>
    </div>
  );
}
