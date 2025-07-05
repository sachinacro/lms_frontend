import React, { useEffect, useState } from "react";
import "./courses.css";
import CourseSearch from "./CourseSearch";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Loading from "../../components/loading/Loading";

const Courses = () => {
  const { courses, fetchCourses } = CourseData();
  const [loading, setLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    async function load() {
      await fetchCourses();
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    setFilteredCourses(courses); // Initially show all courses
  }, [courses]);

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  if (loading) return <Loading />;

  return (
    <section className="courses">
      <h2>Available Courses</h2>

      <CourseSearch courses={courses} onSearch={handleSearch} />

      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="no-courses">No Courses Found!</p>
        )}
      </div>
    </section>
  );
};

export default Courses;

