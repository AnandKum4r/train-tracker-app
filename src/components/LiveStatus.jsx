import { useState, useEffect } from "react";
import { Train, MapPin, Clock, TrendingUp, RefreshCw } from "lucide-react";
import { MOCK_TRAINS } from "../data/mockData";
import {
  getStatusBadgeClass,
  formatDelay,
  getCurrentTime,
} from "../utils/trainUtils";

const LiveStatus = ({ onTrainSelect }) => {
  const [liveTrains, setLiveTrains] = useState([]);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Filter trains that are currently running
    const runningTrains = Object.values(MOCK_TRAINS).filter(
      (train) =>
        train.currentStatus === "Running" ||
        train.currentStatus === "Delayed" ||
        train.currentStatus === "On Time"
    );
    setLiveTrains(runningTrains);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setCurrentTime(getCurrentTime());
    }, 1000);
  };

  const getProgressWidth = (train) => {
    if (!train.route || train.route.length === 0) return "0%";

    const currentIndex = train.route.findIndex(
      (station) => station.status === "Current"
    );
    if (currentIndex === -1) return "0%";

    const progress = Math.round(
      (currentIndex / (train.route.length - 1)) * 100
    );
    return `${progress}%`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Live Train Status
          </h2>
          <p className="text-gray-400">Real-time tracking of running trains</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <span className="text-sm text-gray-400">Updated: {currentTime}</span>
          <button
            onClick={handleRefresh}
            className={`p-2 text-gray-300 hover:text-blue-400 transition-colors rounded-lg bg-[#1e293b] hover:bg-blue-900/40 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <Train className="w-8 h-8 text-blue-400 mx-auto mb-2" />,
            value: liveTrains.length,
            label: "Active Trains",
          },
          {
            icon: (
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            ),
            value: liveTrains.filter(
              (t) =>
                t.currentStatus === "On Time" || t.currentStatus === "Running"
            ).length,
            label: "On Time",
          },
          {
            icon: <Clock className="w-8 h-8 text-red-400 mx-auto mb-2" />,
            value: liveTrains.filter((t) => t.currentStatus === "Delayed")
              .length,
            label: "Delayed",
          },
          {
            icon: <MapPin className="w-8 h-8 text-orange-400 mx-auto mb-2" />,
            value:
              liveTrains.reduce((avg, train) => {
                const progress = train.route
                  ? Math.round(
                      (train.route.findIndex((s) => s.status === "Current") /
                        (train.route.length - 1)) *
                        100
                    )
                  : 0;
                return avg + progress;
              }, 0) / liveTrains.length || 0,
            label: "Avg Progress",
            isPercent: true,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#1e293b] p-6 rounded-xl shadow-md hover:shadow-blue-500/20 transition-all text-center"
          >
            {stat.icon}
            <h3 className="text-2xl font-bold text-white">
              {stat.isPercent ? `${Math.round(stat.value)}%` : stat.value}
            </h3>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Live Trains List */}
      <div className="space-y-6">
        {liveTrains.map((train) => (
          <div
            key={train.trainNumber}
            className="bg-[#0f172a] p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-shadow cursor-pointer border border-transparent hover:border-blue-500/40"
            onClick={() => onTrainSelect(train.trainNumber)}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Train Info */}
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <Train className="w-5 h-5 text-blue-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">
                    {train.trainName}
                  </h3>
                  <span className="ml-3 text-gray-400">
                    #{train.trainNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Route</p>
                    <p className="font-medium text-gray-200">
                      {train.from} → {train.to}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Current Location</p>
                    <p className="font-medium text-gray-200">
                      {train.currentStation}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                    <span>Journey Progress</span>
                    <span>{getProgressWidth(train).replace("%", "")}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: getProgressWidth(train) }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Status and Timing */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                    train.currentStatus
                  )}`}
                >
                  {train.currentStatus}
                </span>

                <div className="text-right">
                  <p className="text-sm text-gray-300">
                    {formatDelay(train.delay)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Dep: {train.departureTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Stations Preview */}
            {train.route && train.route.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Upcoming Stations:</p>
                <div className="flex flex-wrap gap-2">
                  {train.route
                    .filter((station) => station.status === "Upcoming")
                    .slice(0, 3)
                    .map((station, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs border border-blue-500/30"
                      >
                        {station.station.split("(")[0].trim()} -{" "}
                        {station.arrivalTime}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {liveTrains.length === 0 && (
        <div className="bg-[#1e293b] p-12 rounded-xl text-center shadow-md">
          <Train className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No Live Trains
          </h3>
          <p className="text-gray-500">
            No trains are currently running. Please check back later.
          </p>
        </div>
      )}

      {/* Auto Refresh Info */}
      <div className="mt-8 bg-blue-900/20 rounded-lg p-4 border border-blue-800">
        <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
          <RefreshCw className="w-4 h-4" />
          <span>
            Live updates every minute • Click on any train for detailed tracking
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveStatus;
