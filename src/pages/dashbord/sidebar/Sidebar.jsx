import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../main";
import { UserData } from "../../../context/UserContext";
import { FiX } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { user, setUser, logout } = UserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${server}/api/user/me`, {
          headers: { token: localStorage.getItem("token") },
        });
        setUser(userRes.data.user);

        const courseRes = await axios.get(`${server}/api/mycourse`, {
          headers: { token: localStorage.getItem("token") },
        });

        let total = 0;
        let watched = 0;

        courseRes.data.courses.forEach((course) => {
          total += course.totalLectures || 0;
          watched += course.watchedLectures || 0;
        });

        const percentage = total ? Math.round((watched / total) * 100) : 0;
        setProgress(percentage);
      } catch {
        navigate("/login");
      }
    };

    fetchData();
  }, [location.pathname]);
  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"; // disable scroll
  } else {
    document.body.style.overflow = "auto"; // re-enable scroll
  }

  return () => {
    document.body.style.overflow = "auto"; // clean up
  };
}, [isOpen]);


  return (
    <aside className={`custom-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <FiX className="sidebar-close" onClick={() => setIsOpen(false)} />

        <div className="sidebar-profile">
          <img src={user?.avatar || "/default-avatar.png"} alt="User" className="sidebar-avatar" />
          <h4>{user?.name || "User"}</h4>
        </div>

        <div className="progress-section">
  <Link to="/progress" className="progress-link" onClick={() => setIsOpen(false)}>
    📈 Overall Progress
  </Link>
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${progress}%` }} />
  </div>
  <span>{progress}%</span>
</div>


       <nav className="sidebar-links">
  <Link to="/profile/edit" onClick={() => setIsOpen(false)}>📝 Edit Profile</Link>
  <Link to="/contact" onClick={() => setIsOpen(false)}>📩 Support</Link>
  <Link to="/completed-courses" onClick={() => setIsOpen(false)}>🎓 Certificates</Link>
  <Link to="/admin/faq" onClick={() => setIsOpen(false)}>🤖 AI FAQ</Link>
  <button onClick={logout}>🚪 Logout</button>
</nav>

      </div>
    </aside>
  );
};

export default Sidebar;
