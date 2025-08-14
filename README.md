# 🚆 Train Tracker – Real-Time Train Status App

A responsive and modern React-based web application that simulates **real-time train tracking** in India.  
It displays live train statuses, key performance statistics, and allows users to quickly view train details through a clean, professional UI.

---

## ✨ Features
- **Live Train Status** – Displays active trains with current running status.
- **Statistics Overview** – Shows total active trains, on-time count, delayed count, and average progress.
- **Interactive Train Cards** – Clickable cards for each train showing number, name, and route.
- **Refresh Functionality** – Simulates live data updates with animated refresh icon.
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.
- **Reusable Components** – `StatsCard`, `TrainCard`, `LiveStatus` for easy scaling and maintenance.

---

## 🛠 Tech Stack
- **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data:** Mock JSON (ready for API integration)

---

## 📂 Project Structure
src/
│
├── components/
│ ├── Header.jsx # App header and navigation
│ ├── LiveStatus.jsx # Live train tracking UI
│ ├── StatsCard.jsx # Reusable stat display card
│ ├── TrainCard.jsx # Reusable train info card
│
├── data/
│ └── mockData.js # Mock train data
│
├── utils/
│ └── trainUtils.js # Utility functions (time formatting, progress calculation)
│
├── App.jsx # Main app container
└── main.jsx # React entry point

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnandKum4r/train-tracker-app.git
   cd train-tracker-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Visit in your browser:**
   [http://localhost:5173](http://localhost:5173)

---

👨‍💻 Author
Anand Kumar – MERN Stack Developer
