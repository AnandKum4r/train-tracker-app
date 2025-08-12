import { useState } from "react";
import { Search, TrendingUp, Clock, MapPin } from "lucide-react";
import { POPULAR_TRAINS } from "../data/mockData";
import { validateTrainNumber } from "../utils/trainUtils";

const TrainSearch = ({ onTrainSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!searchTerm.trim()) {
      setError("Please enter a train number");
      return;
    }

    if (!validateTrainNumber(searchTerm)) {
      setError("Please enter a valid train number (4-5 digits)");
      return;
    }

    onTrainSelect(searchTerm.trim());
  };

  const handlePopularTrainClick = (trainNumber) => {
    setSearchTerm(trainNumber);
    onTrainSelect(trainNumber);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-slate-50">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Track Your Train Live
        </h2>
        <p className="text-slate-300 text-lg">
          Get real-time updates on train status, delays, and platform
          information
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 shadow-lg">
        <form onSubmit={handleSearch} className="space-y-5">
          <div>
            <label
              htmlFor="trainNumber"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Enter Train Number
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                id="trainNumber"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., 12002, 12951"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                maxLength="5"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Train Status
          </button>
        </form>
      </div>

      {/* Popular Trains */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-yellow-400 mr-2" />
          <h3 className="text-xl font-semibold">Popular Trains</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_TRAINS.map((train) => (
            <div
              key={train.number}
              onClick={() => handlePopularTrainClick(train.number)}
              className="p-4 bg-slate-900 border border-slate-700 rounded-lg hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{train.number}</span>
                <div className="flex items-center text-sm text-slate-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Live</span>
                </div>
              </div>

              <h4 className="font-medium mb-2">{train.name}</h4>

              <div className="flex items-center text-sm text-slate-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{train.route}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">
          How to use:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          {[
            {
              step: 1,
              title: "Enter Train Number",
              desc: "Type the 4 or 5 digit train number (e.g., 12002)",
            },
            {
              step: 2,
              title: "Get Live Status",
              desc: "View current location, delay, and platform info",
            },
            {
              step: 3,
              title: "Track Route",
              desc: "See complete route with station-wise timing",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">
                {step}
              </div>
              <div>
                <h4 className="font-medium mb-1">{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainSearch;
