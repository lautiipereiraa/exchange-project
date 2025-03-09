import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <DashboardContent />
      </main>
    </div>
  );
};

export default Dashboard;
