
import React, { useMemo, useState } from "react";
import {
  Package,
  Users,
  CheckCircle,
  Clock,
  Search,
  MapPin,
  CalendarDays,
  Utensils,
  X,
} from "lucide-react";

const initialPickups = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    servings: 40,
    distributed: 40,
    location: "Bangalore",
    pickupDate: "06 Nov 2026",
    pickupTime: "11:30 AM",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    servings: 30,
    distributed: 15,
    location: "Bangalore",
    pickupDate: "05 Nov 2026",
    pickupTime: "10:00 AM",
  },
  {
    id: 3,
    food: "Chapati & Curry",
    donor: "Event Catering",
    servings: 50,
    distributed: 0,
    location: "Mysore",
    pickupDate: "04 Nov 2026",
    pickupTime: "01:00 PM",
  },
  {
    id: 4,
    food: "Packed Lunch Boxes",
    donor: "Food Corner",
    servings: 25,
    distributed: 25,
    location: "Bangalore",
    pickupDate: "03 Nov 2026",
    pickupTime: "12:30 PM",
  },
  {
    id: 5,
    food: "Poori & Masala",
    donor: "Sri Krishna Hotel",
    servings: 35,
    distributed: 10,
    location: "Bangalore",
    pickupDate: "02 Nov 2026",
    pickupTime: "09:30 AM",
  },
];

const getStatus = (pickup) => {
  if (pickup.distributed === 0) return "Not Distributed";
  if (pickup.distributed < pickup.servings) return "Partially Distributed";
  return "Distributed";
};

const statusStyles = {
  "Not Distributed": "bg-orange-100 text-orange-700",
  "Partially Distributed": "bg-yellow-100 text-yellow-700",
  Distributed: "bg-green-100 text-green-700",
};

export default function MyPickups() {
  const [pickups, setPickups] = useState(initialPickups);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [quantity, setQuantity] = useState("");

  const totalServings = pickups.reduce(
    (sum, item) => sum + item.servings,
    0
  );

  const distributedServings = pickups.reduce(
    (sum, item) => sum + item.distributed,
    0
  );

  const pendingServings = totalServings - distributedServings;

  const stats = [
    {
      title: "Total Pickups",
      value: pickups.length,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Servings Collected",
      value: totalServings,
      icon: Utensils,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Servings Distributed",
      value: distributedServings,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Distribution",
      value: pendingServings,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const filteredPickups = useMemo(() => {
    return pickups.filter((pickup) => {
      const matchesSearch = [
        pickup.food,
        pickup.donor,
        pickup.location,
      ].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      const matchesFilter =
        filter === "All" || getStatus(pickup) === filter;

      return matchesSearch && matchesFilter;
    });
  }, [pickups, search, filter]);

  const openDistributionModal = (pickup) => {
    setSelectedPickup(pickup);
    setQuantity("");
  };

  const updateDistribution = (e) => {
    e.preventDefault();

    const amount = Number(quantity);
    const remaining =
      selectedPickup.servings - selectedPickup.distributed;

    if (
      !Number.isInteger(amount) ||
      amount <= 0 ||
      amount > remaining
    ) {
      return;
    }

    setPickups((prev) =>
      prev.map((pickup) =>
        pickup.id === selectedPickup.id
          ? {
              ...pickup,
              distributed: pickup.distributed + amount,
            }
          : pickup
      )
    );

    setSelectedPickup(null);
    setQuantity("");
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Pickups
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track the food donations you have collected and update their distribution progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-gray-800">
              Overall Distribution Progress
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {distributedServings} of {totalServings} servings distributed
            </p>
          </div>

          <span className="text-lg font-bold text-green-600">
            {totalServings
              ? Math.round((distributedServings / totalServings) * 100)
              : 0}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{
              width: `${
                totalServings
                  ? (distributedServings / totalServings) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food, donor or location..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Not Distributed",
              "Partially Distributed",
              "Distributed",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  filter === item
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pickup Cards */}
      <div className="space-y-4">
        {filteredPickups.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white p-10 text-center">
            <Package className="mx-auto text-gray-300" size={40} />
            <h3 className="mt-3 font-semibold text-gray-700">
              No pickups found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredPickups.map((pickup) => {
            const status = getStatus(pickup);
            const remaining = pickup.servings - pickup.distributed;
            const progress = Math.round(
              (pickup.distributed / pickup.servings) * 100
            );

            return (
              <div
                key={pickup.id}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {pickup.food}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      Donated by {pickup.donor}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package size={14} />
                        {pickup.servings} servings collected
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {pickup.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {pickup.pickupDate}, {pickup.pickupTime}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 px-4 py-3 sm:text-right">
                    <p className="text-xs text-gray-500">
                      Remaining to distribute
                    </p>
                    <p className="mt-1 text-xl font-bold text-green-700">
                      {remaining}
                    </p>
                  </div>
                </div>

                {/* Distribution Progress */}
                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-gray-600">
                      Distribution Progress
                    </span>
                    <span className="font-semibold text-gray-700">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>{pickup.distributed} distributed</span>
                    <span>{remaining} remaining</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
                  {remaining > 0 ? (
                    <button
                      onClick={() => openDistributionModal(pickup)}
                      className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Update Distribution
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <CheckCircle size={17} />
                      Distribution Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Update Distribution Modal */}
      {selectedPickup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Update Distribution
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedPickup.food}
                </p>
              </div>

              <button
                onClick={() => setSelectedPickup(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={updateDistribution} className="mt-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Collected</span>
                  <span className="font-semibold text-gray-800">
                    {selectedPickup.servings}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-500">Already distributed</span>
                  <span className="font-semibold text-gray-800">
                    {selectedPickup.distributed}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Remaining
                  </span>
                  <span className="font-bold text-green-700">
                    {selectedPickup.servings - selectedPickup.distributed}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Servings distributed now
                </label>

                <input
                  type="number"
                  min="1"
                  max={selectedPickup.servings - selectedPickup.distributed}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter number of servings"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Maximum:{" "}
                  {selectedPickup.servings - selectedPickup.distributed} servings
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPickup(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !quantity ||
                    !Number.isInteger(Number(quantity)) ||
                    Number(quantity) <= 0 ||
                    Number(quantity) >
                      selectedPickup.servings - selectedPickup.distributed
                  }
                  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save Distribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
