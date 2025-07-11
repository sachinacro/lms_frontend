import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (
      user.role !== "admin" &&
      (!user.subscription || !user.subscription.includes(params.id))
    ) {
      navigate("/");
      return;
    }

    fetchCourse(params.id);
  }, [user, params.id, navigate, fetchCourse]);

  if (!user) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      {course ? (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt="Course Banner" />
          <h2>{course.title}</h2>
          <p style={{ maxWidth: "600px", textAlign: "center", color: "#cbd5e1" }}>
            {course.description}
          </p>
          <h4>Instructor: {course.createdBy}</h4>
          <h5>Duration: {course.duration} weeks</h5>

        
          <Link to={`/lectures/${course._id}`}>Go to Lectures</Link>
        </div>
      ) : (
        <h2 style={{ color: "white", textAlign: "center" }}>Loading course...</h2>
      )}
    </>
  );
};

export default CourseStudy;
