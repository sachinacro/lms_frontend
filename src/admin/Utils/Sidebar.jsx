import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import "./common.css";

const Sidebar = ({ isOpen }) => {
  const { user } = UserData();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <div className="icon"><AiFillHome /></div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/course">
            <div className="icon"><FaBook /></div>
            <span>Courses</span>
          </Link>
        </li>

        {user?.mainrole === "superadmin" && (
          <li>
            <Link to="/admin/users">
              <div className="icon"><FaUserAlt /></div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li>
          <Link to="/admin/profile">
            <div className="icon"><FaUserAlt /></div>
            <span>Profile</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/quiz-results">
            <div className="icon"><FaBook /></div>
            <span>Quiz Results</span>
          </Link>
        </li>

         <li>
          <Link to="/admin/course/update/:id">
            <div className="icon"><FaBook /></div>
            <span>Update Course</span>
          </Link>
        </li>

        <li>
  <Link to="/admin/faq">
    <div className="icon"><FaBook /></div>
    <span>AI FAQ</span>
  </Link>
</li>


        <li>
          <Link to="/account">
            <div className="icon"><AiOutlineLogout /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
