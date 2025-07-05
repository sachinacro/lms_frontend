import Sidebar from "../sidebar/Sidebar";
import SidebarToggle from "./SidebarToggle";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SidebarToggle setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="dashboard-main">{children}</main>
    </>
  );
};

export default DashboardLayout;
