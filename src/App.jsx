import { useState } from "react";
import Header from "./components/Header";
import TrainSearch from "./components/TrainSearch";
import TrainStatus from "./components/TrainStatus";
import PNRStatus from "./components/PNRStatus";
import LiveStatus from "./components/LiveStatus";
import { getCurrentDate } from "./utils/trainUtils";

function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [currentDate] = useState(getCurrentDate());

  const handleTrainSelect = (trainNumber) => {
    setSelectedTrain(trainNumber);
    setActiveTab("status");
  };

  const handleBackToSearch = () => {
    setSelectedTrain(null);
    setActiveTab("search");
  };

  const renderContent = () => {
    if (activeTab === "status" && selectedTrain) {
      return (
        <TrainStatus trainNumber={selectedTrain} onBack={handleBackToSearch} />
      );
    }

    switch (activeTab) {
      case "search":
        return <TrainSearch onTrainSelect={handleTrainSelect} />;
      case "pnr":
        return <PNRStatus />;
      case "live":
        return <LiveStatus onTrainSelect={handleTrainSelect} />;
      default:
        return <TrainSearch onTrainSelect={handleTrainSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="py-8">{renderContent()}</main>

      <footer className="bg-slate-800 text-slate-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Where is my Train</h3>
              <p className="text-slate-400 text-sm">
                Real-time train tracking for Indian Railways. Get live updates
                on train status, delays, and platform information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>• Live train status tracking</li>
                <li>• PNR status checker</li>
                <li>• Route information</li>
                <li>• Real-time delay updates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab("search")}
                    className="hover:text-white transition-colors"
                  >
                    Train Status
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("pnr")}
                    className="hover:text-white transition-colors"
                  >
                    PNR Status
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("live")}
                    className="hover:text-white transition-colors"
                  >
                    Live Status
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2025 Where is my Train - Build by Anand Kumar • {currentDate}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
