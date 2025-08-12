import { useState } from "react";
import {
  Search,
  User,
  Calendar,
  MapPin,
  CheckCircle,
  Ticket,
} from "lucide-react";
import { MOCK_PNR_DATA } from "../data/mockData";
import { validatePNR } from "../utils/trainUtils";

const PNRStatus = () => {
  const [pnr, setPnr] = useState("");
  const [pnrData, setPnrData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setPnrData(null);

    if (!pnr.trim()) {
      setError("Please enter a PNR number");
      return;
    }
    if (!validatePNR(pnr)) {
      setError("Please enter a valid 10-digit PNR number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const data = MOCK_PNR_DATA[pnr.trim()];
      if (data) {
        setPnrData(data);
      } else {
        setError("PNR not found. Please check the number and try again.");
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    if (status.includes("CNF")) return "bg-green-600 text-white";
    if (status.includes("RAC")) return "bg-yellow-500 text-white";
    if (status.includes("WL")) return "bg-red-600 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 text-slate-50">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Check PNR Status</h2>
        <p className="mt-2 text-slate-300 text-lg">
          Get real-time ticket confirmation status and passenger details
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 p-6">
        <form onSubmit={handleSearch} className="space-y-5">
          <div>
            <label
              htmlFor="pnrNumber"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Enter 10-digit PNR Number
            </label>
            <div className="relative">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                id="pnrNumber"
                type="text"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                placeholder="e.g., 1234567890"
                maxLength="10"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-100 placeholder-slate-500"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Checking Status...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Check PNR Status
              </>
            )}
          </button>
        </form>
      </div>

      {/* PNR Results */}
      {pnrData && (
        <div className="space-y-8">
          {/* Train Information */}
          <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-semibold">Booking Confirmed</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold mb-3">Train Details</h4>
                {[
                  ["PNR Number", pnrData.pnr],
                  ["Train Number", pnrData.trainNumber],
                  ["Train Name", pnrData.trainName],
                  ["Class", pnrData.class],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-slate-700 pb-1"
                  >
                    <span className="text-slate-300">{label}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold mb-3">Journey Details</h4>
                {[
                  ["Date of Journey", pnrData.dateOfJourney],
                  ["From", pnrData.from],
                  ["To", pnrData.to],
                  ["Chart Status", pnrData.chartStatus],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-slate-700 pb-1"
                  >
                    <span className="text-slate-300">{label}:</span>
                    <span className="font-medium text-green-400">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 p-6">
            <h3 className="text-xl font-semibold mb-6">Passenger Details</h3>
            <div className="space-y-4">
              {pnrData.passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <User className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <h4 className="font-semibold">{passenger.name}</h4>
                        <p className="text-sm text-slate-400">
                          Age: {passenger.age} | Gender: {passenger.gender}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          passenger.currentStatus
                        )}`}
                      >
                        {passenger.currentStatus}
                      </span>
                      {passenger.bookingStatus !== passenger.currentStatus && (
                        <p className="text-xs text-slate-400 mt-1">
                          Booked: {passenger.bookingStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-slate-800 rounded-2xl shadow-md border border-slate-700 p-6">
            <h3 className="text-xl font-semibold mb-6">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                ["Boarding Point", pnrData.boardingPoint, MapPin],
                ["Quota", pnrData.quota, Calendar],
                ["Reservation", pnrData.reservationUpto, CheckCircle],
              ].map(([label, value, Icon]) => (
                <div key={label}>
                  <Icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold">{label}</h4>
                  <p className="text-sm text-slate-300">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">
          About PNR Status:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div>
            <h4 className="font-medium mb-2 text-green-400">CNF - Confirmed</h4>
            <p>Your ticket is confirmed with seat/berth number</p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-yellow-400">
              RAC - Reservation Against Cancellation
            </h4>
            <p>You have a confirmed seat but waiting for berth</p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-red-400">WL - Waiting List</h4>
            <p>Your ticket is on waiting list</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900 rounded-xl border-l-4 border-blue-500">
          <p className="text-sm text-slate-300">
            <strong>Tip:</strong> Use PNR 1234567890 to test with sample data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PNRStatus;
