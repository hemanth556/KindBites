
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock3,
  Users,
  Utensils,
  CalendarDays,
  CheckCircle2,
  Package,
  X,
  MessageSquare,
} from "lucide-react";

const donations = [
  {
    id: 1,
    name: "Veg Biryani",
    donor: "AIT Hostel Mess",
    servings: 100,
    pickupDate: "16 Oct 2026",
    pickupTime: "08:00 PM",
    location: "Bangalore",
    type: "Cooked Food",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&q=85",
  },
  {
    id: 2,
    name: "Idli & Sambar",
    donor: "City Restaurant",
    servings: 80,
    pickupDate: "16 Oct 2026",
    pickupTime: "09:00 PM",
    location: "Bangalore",
    type: "Cooked Food",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=85",
  },
  {
    id: 3,
    name: "Chapati & Curry",
    donor: "Event Catering",
    servings: 120,
    pickupDate: "17 Oct 2026",
    pickupTime: "12:00 PM",
    location: "Mysore",
    type: "Cooked Food",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=85",
  },
  {
    id: 4,
    name: "Fresh Vegetables",
    donor: "Green Market",
    servings: 50,
    pickupDate: "18 Oct 2026",
    pickupTime: "10:00 AM",
    location: "Bangalore",
    type: "Raw Food",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=85",
  },
  {
    id: 5,
    name: "Packed Lunch Boxes",
    donor: "Food Corner",
    servings: 60,
    pickupDate: "18 Oct 2026",
    pickupTime: "01:00 PM",
    location: "Mysore",
    type: "Packaged Food",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=85",
  },
  {
    id: 6,
    name: "Poori & Masala",
    donor: "Sri Krishna Hotel",
    servings: 90,
    pickupDate: "19 Oct 2026",
    pickupTime: "11:00 AM",
    location: "Bangalore",
    type: "Cooked Food",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&q=85",
  },
];

export default function BrowseDonations() {
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("All Food Types");
  const [location, setLocation] = useState("All Locations");

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requested, setRequested] = useState({});
  const [servings, setServings] = useState("");
  const [message, setMessage] = useState("");

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        donation.name.toLowerCase().includes(searchText) ||
        donation.donor.toLowerCase().includes(searchText) ||
        donation.location.toLowerCase().includes(searchText);

      const matchesType =
        foodType === "All Food Types" ||
        donation.type === foodType;

      const matchesLocation =
        location === "All Locations" ||
        donation.location === location;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [search, foodType, location]);

  const openRequestModal = (donation) => {
    setSelectedDonation(donation);
    setServings("");
    setMessage("");
  };

  const closeRequestModal = () => {
    setSelectedDonation(null);
    setServings("");
    setMessage("");
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();

    if (!selectedDonation) return;

    const quantity = Number(servings);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > selectedDonation.servings
    ) {
      return;
    }

    setRequested((prev) => ({
      ...prev,
      [selectedDonation.id]: {
        servings: quantity,
        message: message.trim(),
        status: "PENDING",
      },
    }));

    closeRequestModal();
  };

  const handleCancelRequest = (donationId) => {
    setRequested((prev) => {
      const updated = { ...prev };
      delete updated[donationId];
      return updated;
    });
  };

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Page Heading */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
          Browse Donations
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Find available food donations near you
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="relative sm:col-span-2 xl:col-span-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by food, donor, location..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
        >
          <option>All Food Types</option>
          <option>Cooked Food</option>
          <option>Raw Food</option>
          <option>Packaged Food</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
        >
          <option>All Locations</option>
          <option>Bangalore</option>
          <option>Mysore</option>
        </select>
      </section>

      {/* Results Heading */}
      <section className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Available Donations
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredDonations.length} donations found
          </p>
        </div>

        <span className="flex items-center gap-2 text-sm text-green-700">
          <Package size={17} />
          Fresh food listings
        </span>
      </section>

      {/* Donation Cards */}
      {filteredDonations.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredDonations.map((donation) => {
            const request = requested[donation.id];

            return (
              <article
                key={donation.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative">
                  <img
                    src={donation.image}
                    alt={donation.name}
                    className="h-44 w-full rounded-xl object-cover"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                    Available
                  </span>
                </div>

                <div className="p-2">
                  <div className="mb-3">
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                      <Utensils
                        size={17}
                        className="shrink-0 text-green-600"
                      />
                      {donation.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {donation.type}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UserIcon />
                      <span>{donation.donor}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="shrink-0 text-gray-400" />
                      <span>{donation.servings} servings</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                      <span>{donation.pickupDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock3
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                      <span>Pickup before {donation.pickupTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                      <span>{donation.location}</span>
                    </div>
                  </div>

                  {request && (
                    <div className="mt-4 rounded-lg bg-green-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                        <CheckCircle2 size={16} />
                        Request Pending
                      </div>

                      <p className="mt-1 text-xs text-green-700">
                        You requested {request.servings} servings.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      request
                        ? handleCancelRequest(donation.id)
                        : openRequestModal(donation)
                    }
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      request
                        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {request ? (
                      <>
                        <X size={17} />
                        Cancel Request
                      </>
                    ) : (
                      "Request Pickup"
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
          <Search size={38} className="mx-auto text-gray-300" />

          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            No donations found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFoodType("All Food Types");
              setLocation("All Locations");
            }}
            className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Request Pickup Modal */}
      {selectedDonation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={closeRequestModal}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Request Food Pickup
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Send a pickup request to the donor
                </p>
              </div>

              <button
                type="button"
                onClick={closeRequestModal}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitRequest} className="p-5 sm:p-6">
              {/* Donation Info */}
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-green-50 p-3">
                <img
                  src={selectedDonation.image}
                  alt={selectedDonation.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">
                    {selectedDonation.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedDonation.donor}
                  </p>

                  <p className="mt-1 text-xs font-medium text-green-700">
                    {selectedDonation.servings} servings available
                  </p>
                </div>
              </div>

              {/* Servings Input */}
              <div className="mb-5">
                <label
                  htmlFor="servings"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  How many servings do you need?
                </label>

                <input
                  id="servings"
                  type="number"
                  min="1"
                  max={selectedDonation.servings}
                  required
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="Enter number of servings"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Maximum: {selectedDonation.servings} servings
                </p>
              </div>

              {/* Message Input */}
              <div className="mb-6">
                <label
                  htmlFor="donorMessage"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <MessageSquare size={16} />
                  Message to donor
                  <span className="font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="donorMessage"
                  rows="4"
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the donor about your pickup requirements..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-1 text-right text-xs text-gray-400">
                  {message.length}/500
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeRequestModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !servings ||
                    Number(servings) < 1 ||
                    Number(servings) > selectedDonation.servings
                  }
                  className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send Pickup Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
