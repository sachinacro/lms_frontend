import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import Sidebar from "./sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import "./completedcourses.css";

const CompletedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/completed`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setCourses(data.completedCourses);
      } catch (err) {
        console.error("Failed to fetch completed courses");
      }
    };

    fetchCompleted();
  }, []);

  const downloadCertificate = async (id, title) => {
    try {
      const { data } = await axios.get(`${server}/api/certificate/${id}`, {
        headers: { token: localStorage.getItem("token") },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate-${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed");
    }
  };

  return (
    <div className="completed-container">
      {/* Sidebar Toggle (Mobile) */}
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Sidebar */}
      <div className="sidebar-wrapper">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main Content */}
      <div className="completed-content">
        <h2 className="heading">🎓 Completed Courses</h2>

        {courses.length > 0 ? (
          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
                <h3 className="course-title">{course.title}</h3>
                <p className="lecture-info">
                  Lectures Watched: <strong>{course.completedLectures}</strong> / {course.totalLectures}
                </p>
                <button
                  className="download-btn"
                  onClick={() => downloadCertificate(course._id, course.title)}
                >
                  🏆 Download Certificate
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-msg">😔 No completed courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedCourses;
