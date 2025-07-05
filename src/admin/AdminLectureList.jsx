import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main"; // Adjust path if needed
import DashboardLayout from "../admin/Utils/DashboardLayout"; // ✅ Include layout with sidebar
import "./AdminQuiz.css"; // Reused styles

const AdminLectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(`${server}/api/lecture/all`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setLectures(data.lectures || []);
      } catch (error) {
        console.error("❌ Failed to fetch lectures", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  return (
    <DashboardLayout>
      <div className="admin-quiz-page">
        <h2>📚 Select a Lecture to View Quiz Results</h2>

        {loading ? (
          <p className="loading">Loading lectures...</p>
        ) : lectures.length === 0 ? (
          <p className="no-results">No lectures found.</p>
        ) : (
          <ul className="lecture-list">
            {lectures.map((lecture) => (
              <li
                key={lecture._id}
                className="lecture-item"
                onClick={() => navigate(`/admin/quiz-results/${lecture._id}`)}
              >
                <span>{lecture.title}</span>
                <span className="arrow">➡️</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminLectureList;
