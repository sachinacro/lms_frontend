import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "react-typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import "./home.css";
import { CourseData } from "../../context/CourseContext";
import CountUp from "react-countup";
import Loading from "../../components/loading/Loading";
import CourseCard from "../../components/coursecard/CourseCard";

import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();
   const { courses, fetchCourses } = CourseData();
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
      async function load() {
        await fetchCourses();
        setLoading(false);
      }
      load();
    }, []);
    if (loading) return <Loading />;

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Background Carousel */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide home-carousel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="slider1.jpg" className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="slider2.jpg" className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="slider3.jpg" className="d-block w-100" alt="Slide 3" />
            </div>
          </div>
        </div>

        {/* Overlay Content */}
        <div className="home">
          <div className="home-content">
            <h1>Welcome to Our E-learning Platform</h1>
            <div className="typewriter-text">
              <Typewriter
                options={{
                  strings: [
                    "Learn at Your Pace",
                    "Grow with Experts",
                    "Excel in Your Career",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <button onClick={() => navigate("/courses")} className="common-btn">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" data-aos="fade-up">
        <h2>Why Learn With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-chalkboard-teacher"></i>
            <h3>Expert Instructors</h3>
            <p>Learn from industry leaders with real-world experience.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>Flexible Schedule</h3>
            <p>Study at your own pace with 24/7 access to courses.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-certificate"></i>
            <h3>Certification</h3>
            <p>Get certified and showcase your achievements.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="about-section" data-aos="fade-up">
      <h2>About Our Platform</h2>
      <p>
        We provide high-quality online education with expert instructors and interactive content. Our mission is to make learning accessible and engaging for everyone.
      </p>
    </div>

      <Testimonials />

      {/* Stats Section */}
      <div className="stats-section" data-aos="fade-up">
        <div className="stat">
          <h2><CountUp end={10000} duration={3} separator="," />+</h2>
          <p>Students Enrolled</p>
        </div>
        <div className="stat">
          <h2><CountUp end={500} duration={3} />+</h2>
          <p>Courses Available</p>
        </div>
        <div className="stat">
          <h2><CountUp end={4.8} duration={3} decimals={1} />/5</h2>
          <p>Average Rating</p>
        </div>
      </div>

      <div className="courses-section" data-aos="fade-up">
      <h2>Popular Courses</h2>
      <div className="courses-grid">
        <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p className="no-courses">No Courses Yet!</p>
        )}
      </div>
      </div>
    </div>


    </div>
  );
};

export default Home;
