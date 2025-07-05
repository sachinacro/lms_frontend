// SidebarToggle.jsx
import React from "react";
import { FiMenu } from "react-icons/fi";
import "./SidebarToggle.css";

const SidebarToggle = ({ setIsOpen }) => {
  return (
    <button className="sidebar-toggle" onClick={() => setIsOpen(true)}>
      <FiMenu />
    </button>
  );
};

export default SidebarToggle;
