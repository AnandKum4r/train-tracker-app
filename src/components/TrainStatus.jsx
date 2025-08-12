import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  AlertCircle,
  Train,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { MOCK_TRAINS } from "../data/mockData";
import {
  getStatusBadgeClass,
  formatTime,
  formatDelay,
  getTrainProgress,
  getCurrentTime,
} from "../utils/trainUtils";

const TrainStatus = ({ trainNumber, onBack }) => {
  const [trainData, setTrainData] = useState(null);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadTrainData = () => {
      const data = MOCK_TRAINS[trainNumber];
      setTrainData(data || null);
    };
    loadTrainData();

    const timeInterval = setInterval(
      () => setCurrentTime(getCurrentTime()),
      60000
    );
    return () => clearInterval(timeInterval);
  }, [trainNumber]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setCurrentTime(getCurrentTime());
    }, 1000);
  };

  if (!trainData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>

        <div className="bg-slate-800 p-8 rounded-xl shadow-md text-center border border-slate-700">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-50 mb-2">
            Train Not Found
          </h3>
          <p className="text-slate-300 mb-6">
            Train number {trainNumber} was not found. Please check the number
            and try again.
          </p>
          <button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Try Another Train
          </button>
        </div>
      </div>
    );
  }

  const progress = getTrainProgress(trainData.route, trainData.currentStation);

  return (
    <div className="max-w-6xl mx-auto p-6 text-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>

        <div className="flex items-center space-x-4 text-sm text-slate-300">
          <span>Last updated: {currentTime}</span>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg hover:bg-slate-700 transition-colors ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Main Train Info */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center mb-2">
              <Train className="w-6 h-6 text-blue-400 mr-2" />
              <h1 className="text-2xl font-bold">{trainData.trainName}</h1>
            </div>
            <p className="text-lg text-slate-300">
              Train #{trainData.trainNumber}
            </p>
            <p className="text-slate-400">
              {trainData.from} → {trainData.to}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                trainData.currentStatus
              )}`}
            >
              {trainData.currentStatus}
            </span>
            {trainData.delay > 0 && (
              <span className="text-sm text-red-400 font-medium">
                Delayed by {trainData.delay} min
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Location */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
          <div className="flex items-center mb-3">
            <MapPin className="w-5 h-5 text-blue-400 mr-2" />
            <h3 className="font-semibold">Current Location</h3>
          </div>
          <p className="text-lg font-medium">{trainData.currentStation}</p>
          {trainData.nextStation !== "--" && (
            <p className="text-sm text-slate-400 mt-1">
              Next: {trainData.nextStation}
            </p>
          )}
        </div>

        {/* Timing */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 text-blue-400 mr-2" />
            <h3 className="font-semibold">Timing</h3>
          </div>
          <p className="text-sm text-slate-300">
            Departure: {trainData.departureTime}
          </p>
          <p className="text-sm text-slate-300">
            Arrival: {trainData.arrivalTime}
          </p>
          <p className="text-sm font-medium">{formatDelay(trainData.delay)}</p>
        </div>

        {/* Journey Info */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
          <div className="flex items-center mb-3">
            <Navigation className="w-5 h-5 text-blue-400 mr-2" />
            <h3 className="font-semibold">Journey Info</h3>
          </div>
          <p className="text-sm text-slate-300">
            Distance: {trainData.distance}
          </p>
          <p className="text-sm text-slate-300">
            Coaches: {trainData.coaches.join(", ")}
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Journey Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Route Information */}
      {trainData.route?.length > 0 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
          <h3 className="text-xl font-semibold mb-6">Route Information</h3>
          <div className="space-y-4">
            {trainData.route.map((station, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  station.status === "Current"
                    ? "border-blue-500 bg-blue-900/30"
                    : station.status === "Departed"
                    ? "border-green-500 bg-green-900/30"
                    : "border-slate-700 bg-slate-900/40"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      station.status === "Current"
                        ? "bg-blue-400 animate-pulse"
                        : station.status === "Departed"
                        ? "bg-green-400"
                        : "bg-slate-500"
                    }`}
                  />
                  <div>
                    <h4 className="font-semibold">{station.station}</h4>
                    <p className="text-sm text-slate-400">
                      Platform: {station.platform}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <p className="text-slate-400">Arrival</p>
                      <p className="font-medium">
                        {formatTime(station.arrivalTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Departure</p>
                      <p className="font-medium">
                        {formatTime(station.departureTime)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      station.status === "Current"
                        ? "bg-blue-500 text-white"
                        : station.status === "Departed"
                        ? "bg-green-500 text-white"
                        : "bg-slate-600 text-slate-200"
                    }`}
                  >
                    {station.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainStatus;
