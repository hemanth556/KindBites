
import React, { useMemo, useState } from "react";
import {
  History,
  Users,
  Package,
  Search,
  MapPin,
  CalendarDays,
  CheckCircle,
  Eye,
  X,
  Utensils,
} from "lucide-react";

const distributionData = [
  {
    id: 1,
    food: "Veg Biryani",
    donor: "AIT Hostel Mess",
    collected: 40,
    distributed: 40,
    peopleServed: 40,
    location: "Bangalore",
    distributionDate: "06 Nov 2026",
    distributionTime: "02:30 PM",
    status: "Completed",
    notes: "Distributed meals to people near the bus stand.",
  },
  {
    id: 2,
    food: "Idli & Sambar",
    donor: "City Restaurant",
    collected: 30,
    distributed: 15,
    peopleServed: 15,
    location: "Bangalore",
    distributionDate: "05 Nov 2026",
    distributionTime: "12:00 PM",
    status: "Partially Distributed",
    notes: "15 meals distributed. Remaining food was handled safely.",
  },
  {
    id: 3,
    food: "Packed Lunch Boxes",
    donor: "Food Corner",
    collected: 25,
    distributed: 25,
    peopleServed: 25,
    location: "Bangalore",
    distributionDate: "03 Nov 2026",
    distributionTime: "01:30 PM",
    status: "Completed",
    notes: "Distributed lunch boxes to families in need.",
  },
  {
    id: 4,
    food: "Poori & Masala",
    donor: "Sri Krishna Hotel",
    collected: 35,
    distributed: 10,
    peopleServed: 10,
    location: "Bangalore",
    distributionDate: "02 Nov 2026",
    distributionTime: "10:30 AM",
    status: "Partially Distributed",
    notes: "10 meals distributed in the local community.",
  },
  {
    id: 5,
    food: "Chapati & Curry",
    donor: "Event Catering",
    collected: 50,
    distributed: 50,
    peopleServed: 50,
    location: "Mysore",
    distributionDate: "01 Nov 2026",
    distributionTime: "03:00 PM",
    status: "Completed",
    notes: "All collected meals were distributed successfully.",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  "Partially Distributed": "bg-yellow-100 text-yellow-700",
};

export default function DistributionHistory() {
  const [records] = useState(distributionData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const totalServings = records.reduce(
    (sum, item) => sum + item.distributed,
    0
  );

  const totalPeople = records.reduce(
    (sum, item) => sum + item.peopleServed,
    0
  );

  const completedRecords = records.filter(
    (item) => item.status === "Completed"
  ).length;

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = [
        record.food,
        record.donor,
        record.location,
      ].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      const matchesFilter =
        filter === "All" || record.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [records, search, filter]);

  const stats = [
    {
      title: "Distribution Records",
      value: records.length,
      icon: History,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Servings Distributed",
      value: totalServings,
      icon: Package,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "People Served",
      value: totalPeople,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Completed Distributions",
      value: completedRecords,
      icon: CheckCircle,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Distribution History
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your completed food distributions and the impact you've made.
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

      {/* Impact Banner */}
      <div className="rounded-xl bg-green-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white/20 p-3">
            <HeartIcon />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Your contribution matters!
            </h2>
            <p className="mt-1 text-sm text-green-100">
              You've helped serve {totalPeople} people through food distribution.
              Keep making a difference.
            </p>
          </div>
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
              "Completed",
              "Partially Distributed",
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

      {/* History Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800">
            Distribution Records
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            A record of your food distribution activities
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Food Details</th>
                <th className="px-5 py-4 font-medium">Servings</th>
                <th className="px-5 py-4 font-medium">People Served</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {record.food}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {record.donor}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={12} />
                      {record.location}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    {record.distributed} / {record.collected}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {record.peopleServed}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {record.distributionDate}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {record.distributionTime}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[record.status]}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-green-500 hover:text-green-600"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="p-10 text-center">
              <History className="mx-auto text-gray-300" size={40} />
              <p className="mt-3 font-medium text-gray-700">
                No distribution records found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Distribution Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedRecord.food}
                </p>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <Detail label="Donor" value={selectedRecord.donor} />
              <Detail label="Location" value={selectedRecord.location} />
              <Detail
                label="Collected Servings"
                value={selectedRecord.collected}
              />
              <Detail
                label="Distributed Servings"
                value={selectedRecord.distributed}
              />
              <Detail
                label="People Served"
                value={selectedRecord.peopleServed}
              />
              <Detail
                label="Distribution Date"
                value={selectedRecord.distributionDate}
              />
              <Detail
                label="Distribution Time"
                value={selectedRecord.distributionTime}
              />
              <Detail label="Status" value={selectedRecord.status} />
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-700">
                Distribution Notes
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {selectedRecord.notes}
              </p>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="mt-5 w-full rounded-lg bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

function HeartIcon() {
  return <Utensils size={25} />;
}
