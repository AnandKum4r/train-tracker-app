import { Train, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "search", label: "Train Status", icon: "🚂" },
    { id: "pnr", label: "PNR Status", icon: "🎫" },
    { id: "live", label: "Live Status", icon: "📍" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white shadow-lg sticky top-0 z-50 border-b border-blue-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Train className="h-8 w-8 text-blue-400 animate-train-move" />
            <h1 className="text-xl font-bold tracking-wide hover:text-blue-300 transition-colors">
              Where is My Train
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-blue-300" />
            ) : (
              <Menu className="h-6 w-6 text-blue-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-800 bg-[#1e293b] shadow-lg animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
