
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import axios from "axios";
import { server } from "../../main";
import Sidebar from "./sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import "./dashbord.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { mycourse } = CourseData();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ enrolled: 0, completed: 0 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/dashboard`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setUser(data.user);
        setStats({
          enrolled: data.stats.totalCourses,
          completed: data.stats.completedCourses,
        });
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`dashboard-main ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <h2>👋 Welcome, {user.name?.split(" ")[0] || "User"}</h2>

        <div className="user-stats">
          <div className="stat-box">
            <h4>📚 Enrolled Courses</h4>
            <p>{stats.enrolled}</p>
          </div>
          <div className="stat-box">
            <Link to="/completed-courses" style={{ textDecoration: "none", color: "inherit" }}>
              <h4>🎓 Completed Courses</h4>
              <p>{stats.completed}</p>
            </Link>
          </div>
        </div>

        <section>
          <h3>Your Courses</h3>
          <div className="dashboard-courses">
            {mycourse && mycourse.length > 0 ? (
              mycourse.map((course) => <CourseCard key={course._id} course={course} />)
            ) : (
              <p className="empty-message">😔 No enrolled courses found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
