import React from "react";
import { CourseData } from "../../context/CourseContext";
import Sidebar from "./sidebar/Sidebar";
import "./progress.css";

const ProgressPage = () => {
  const { mycourse } = CourseData();

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="progress-main">
        <h2 className="heading">📊 Your Course Progress</h2>

        {mycourse && mycourse.length > 0 ? (
          <ul className="progress-list">
            {mycourse.map((course) => {
              const total = course.totalLectures || 1;
              const watched = course.watchedLectures || 0;
              const percent = Math.round((watched / total) * 100);

              return (
                <li className="progress-item" key={course._id}>
                  <h4 className="course-title">{course.title}</h4>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="progress-info">
                    {percent}% completed ({watched}/{total} lectures)
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="empty-msg">😕 No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
