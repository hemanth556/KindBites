
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  Package,
  CheckCircle2,
  Truck,
  Utensils,
  X,
  HandHeart,
  TrendingUp,
} from "lucide-react";

const initialDonations = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    servings: 40,
    distributed: 40,
    collectionDate: "16 Oct 2026",
    collectionTime: "08:30 PM",
    location: "Bangalore",
    status: "DISTRIBUTED",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    servings: 30,
    distributed: 15,
    collectionDate: "16 Oct 2026",
    collectionTime: "09:30 PM",
    location: "Bangalore",
    status: "PARTIALLY_DISTRIBUTED",
  },
  {
    id: 3,
    food: "Chapati & Curry",
    donor: "Event Catering",
    servings: 50,
    distributed: 0,
    collectionDate: "17 Oct 2026",
    collectionTime: "12:30 PM",
    location: "Mysore",
    status: "NOT_DISTRIBUTED",
  },
  {
    id: 4,
    food: "Packed Lunch Boxes",
    donor: "Food Corner",
    servings: 20,
    distributed: 20,
    collectionDate: "18 Oct 2026",
    collectionTime: "01:30 PM",
    location: "Mysore",
    status: "DISTRIBUTED",
  },
  {
    id: 5,
    food: "Poori & Masala",
    donor: "Sri Krishna Hotel",
    servings: 25,
    distributed: 10,
    collectionDate: "19 Oct 2026",
    collectionTime: "11:30 AM",
    location: "Bangalore",
    status: "PARTIALLY_DISTRIBUTED",
  },
];

const statusConfig = {
  NOT_DISTRIBUTED: {
    label: "Not Distributed",
    className: "bg-amber-50 text-amber-700",
  },
  PARTIALLY_DISTRIBUTED: {
    label: "Partially Distributed",
    className: "bg-blue-50 text-blue-700",
  },
  DISTRIBUTED: {
    label: "Distributed",
    className: "bg-green-50 text-green-700",
  },
};

const filters = [
  "All",
  "Not Distributed",
  "Partially Distributed",
  "Distributed",
];

const filterStatus = {
  "Not Distributed": "NOT_DISTRIBUTED",
  "Partially Distributed": "PARTIALLY_DISTRIBUTED",
  Distributed: "DISTRIBUTED",
};

export default function ReceivedDonations() {
  const [donations, setDonations] = useState(initialDonations);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [distributedQuantity, setDistributedQuantity] = useState("");

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.food.toLowerCase().includes(search.toLowerCase()) ||
        donation.donor.toLowerCase().includes(search.toLowerCase()) ||
        donation.location.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        donation.status === filterStatus[activeFilter];

      return matchesSearch && matchesFilter;
    });
  }, [donations, search, activeFilter]);

  const totalServings = donations.reduce(
    (total, donation) => total + donation.servings,
    0
  );

  const totalDistributed = donations.reduce(
    (total, donation) => total + donation.distributed,
    0
  );

  const completedDonations = donations.filter(
    (donation) => donation.status === "DISTRIBUTED"
  ).length;

  const updateDistribution = (e) => {
    e.preventDefault();

    if (!selectedDonation) return;

    const quantity = Number(distributedQuantity);
    const remaining =
      selectedDonation.servings - selectedDonation.distributed;

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > remaining
    ) {
      return;
    }

    setDonations((prev) =>
      prev.map((donation) => {
        if (donation.id !== selectedDonation.id) return donation;

        const newDistributed = donation.distributed + quantity;

        return {
          ...donation,
          distributed: newDistributed,
          status:
            newDistributed === donation.servings
              ? "DISTRIBUTED"
              : "PARTIALLY_DISTRIBUTED",
        };
      })
    );

    setSelectedDonation(null);
    setDistributedQuantity("");
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Page Heading */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
          Received Donations
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Manage collected food donations and track distribution progress.
        </p>
      </section>

      {/* Statistics */}
      <section className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          title="Total Donations"
          value={donations.length}
          icon={Package}
          color="bg-green-50 text-green-600"
        />

        <StatCard
          title="Total Servings"
          value={totalServings}
          icon={Utensils}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Servings Distributed"
          value={totalDistributed}
          icon={HandHeart}
          color="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Completed Donations"
          value={completedDonations}
          icon={CheckCircle2}
          color="bg-amber-50 text-amber-600"
        />
      </section>

      {/* Distribution Overview */}
      <section className="mb-7 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-gray-900">
              Overall Distribution Progress
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Servings distributed from all collected donations
            </p>
          </div>

          <span className="text-lg font-bold text-green-700">
            {totalServings
              ? Math.round((totalDistributed / totalServings) * 100)
              : 0}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600 transition-all"
            style={{
              width: `${
                totalServings
                  ? (totalDistributed / totalServings) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>{totalDistributed} distributed</span>
          <span>{totalServings - totalDistributed} remaining</span>
        </div>
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

      {/* Filters */}
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

      {/* Donations List */}
      <section className="space-y-4">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => {
            const config = statusConfig[donation.status];
            const remaining = donation.servings - donation.distributed;
            const progress =
              (donation.distributed / donation.servings) * 100;

            return (
              <article
                key={donation.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-gray-900">
                        {donation.food}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
                      >
                        {config.label}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-500">
                      Donated by:{" "}
                      <span className="font-semibold text-gray-700">
                        {donation.donor}
                      </span>
                    </p>

                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 xl:grid-cols-3">
                      <InfoItem
                        icon={Users}
                        label={`${donation.servings} servings received`}
                      />

                      <InfoItem
                        icon={CalendarDays}
                        label={donation.collectionDate}
                      />

                      <InfoItem
                        icon={Clock3}
                        label={donation.collectionTime}
                      />

                      <InfoItem
                        icon={MapPin}
                        label={donation.location}
                      />

                      <InfoItem
                        icon={Truck}
                        label={`${remaining} servings remaining`}
                      />
                    </div>

                    {/* Distribution Progress */}
                    <div className="mt-5 max-w-xl">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="font-medium text-gray-600">
                          Distribution Progress
                        </span>

                        <span className="font-semibold text-green-700">
                          {Math.round(progress)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-green-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-gray-400">
                        {donation.distributed} of {donation.servings} servings
                        distributed
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex shrink-0 flex-col gap-2 lg:w-48">
                    {remaining > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDonation(donation);
                          setDistributedQuantity("");
                        }}
                        className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        <TrendingUp size={17} />
                        Update Distribution
                      </button>
                    ) : (
                      <span className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                        <CheckCircle2 size={17} />
                        Fully Distributed
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
              No received donations found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your collected donations will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Update Distribution Modal */}
      {selectedDonation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDonation(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Update Distribution
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Record distributed food servings
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDonation(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-5 rounded-xl bg-green-50 p-4">
              <h3 className="font-semibold text-gray-900">
                {selectedDonation.food}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Donor: {selectedDonation.donor}
              </p>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Remaining servings</span>
                <span className="font-bold text-green-700">
                  {selectedDonation.servings -
                    selectedDonation.distributed}
                </span>
              </div>
            </div>

            <form onSubmit={updateDistribution}>
              <label
                htmlFor="distributedQuantity"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Number of servings distributed
              </label>

              <input
                id="distributedQuantity"
                type="number"
                min="1"
                max={
                  selectedDonation.servings -
                  selectedDonation.distributed
                }
                required
                value={distributedQuantity}
                onChange={(e) =>
                  setDistributedQuantity(e.target.value)
                }
                placeholder="Enter number of servings"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                You can record distribution in multiple updates.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !distributedQuantity ||
                    Number(distributedQuantity) < 1 ||
                    Number(distributedQuantity) >
                      selectedDonation.servings -
                        selectedDonation.distributed
                  }
                  className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
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
