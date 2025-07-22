import React from "react";
import Sidebar from "./Sidebar";
import "./common.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
// /* Sidebar Container
// .sidebar {
//   width: 220px;
//   height: 100vh;
//   background: rgba(15, 23, 42, 0.8); /* same as hero bg with opacity */
//   backdrop-filter: blur(12px);
//   border-right: 1px solid rgba(255, 255, 255, 0.1);
//   padding-top: 20px;
//   color: #e2e8f0;
//   box-shadow: 2px 0 20px rgba(124, 58, 237, 0.1);
//   transition: width 0.3s ease;
// }

// @media (max-width: 768px) {
//   .sidebar {
//     width: 60px;
//   }
// }

// /* Sidebar Items */
// .sidebar ul {
//   list-style: none;
//   padding: 0 10px;
//   margin: 0;
// }

// .sidebar ul li {
//   margin-bottom: 12px;
//   transition: background 0.3s, transform 0.2s;
//   border-radius: 10px;
// }

// .sidebar ul li:hover {
//   background-color: rgba(124, 58, 237, 0.15); /* subtle violet glow */
//   transform: translateX(5px);
// }

// /* Link Styling */
// .sidebar ul li a {
//   display: flex;
//   align-items: center;
//   padding: 12px 15px;
//   text-decoration: none;
//   color: #cbd5e1;
//   font-weight: 500;
//   border-radius: 10px;
//   transition: color 0.3s;
// }

// .sidebar ul li a .icon {
//   font-size: 1.3rem;
//   color: #a78bfa;
//   min-width: 24px;
// }

// .sidebar ul li a span {
//   margin-left: 15px;
//   white-space: nowrap;
// }

// @media (max-width: 768px) {
//   .sidebar ul li a span {
//     display: none;
//   }
// }

// /* Active Effect (optional) */
// .sidebar ul li a.active,
// .sidebar ul li a:hover {
//   color: #c084fc;
// }

// /* Dashboard Layout */
// .dashboard-admin {
//   display: flex;
//   min-height: 100vh;
//   margin-top: 0;
//   background: #0f172a;
//   color: white;
// }

// .content {
//   flex: 1;
//   padding: 30px;
  
// }
// @media (max-width: 768px) {
//   .sidebar {
//     position: fixed;
//     left: -220px;
//     top: 0;
//     height: 100vh;
//     z-index: 100;
//     transition: left 0.3s ease;
//   }

//   .sidebar.open {
//     left: 0;
//   }
// } */
