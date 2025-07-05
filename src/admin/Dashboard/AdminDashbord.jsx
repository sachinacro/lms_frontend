import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Utils/DashboardLayout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
  });

  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState(""); // "courses" | "lectures" | "users"

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${server}/api/status`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
      setCourses(data.courses || []);
      setLectures(data.lectures || []);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        {!view ? (
          <div className="dashboard-grid">
            <div className="stat-box" onClick={() => setView("courses")}>
              <h3>Total Courses</h3>
              <p>{stats.totalCourses}</p>
            </div>
            <div className="stat-box" onClick={() => setView("lectures")}>
              <h3>Total Lectures</h3>
              <p>{stats.totalLectures}</p>
            </div>
            <div className="stat-box" onClick={() => setView("users")}>
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </div>
        ) : (
          <div className="detail-view">
            <button className="common-btn" onClick={() => setView("")}>
              🔙 Back to Dashboard
            </button>

            {view === "courses" && (
              <>
                <h3>📚 All Courses</h3>
                <ul>
                  {courses?.length > 0 ? (
                    courses.map((c) => <li key={c._id}>{c.title}</li>)
                  ) : (
                    <p>No Courses Found</p>
                  )}
                </ul>
              </>
            )}

            {view === "lectures" && (
              <>
                <h3>🎥 All Lectures</h3>
                <ul>
                  {lectures.map((l) => (
                    <li key={l._id}>
                      {l.title} — Course: {l.course}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {view === "users" && (
              <>
                <h3>👤 All Users</h3>
                <ul>
                  {users.map((u) => (
                    <li key={u._id}>
                      {u.name} — {u.email} ({u.role})
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
