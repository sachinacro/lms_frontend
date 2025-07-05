import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./common.css"; // your CSS file

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-admin">
      {/* Toggle Button (Mobile) */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main content */}
      <main className={`content ${sidebarOpen ? "blur-bg" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
