// src/components/about/About.jsx
import React from "react";
import "./about.css";
import Testimonials from "../../components/testimonials/Testimonials"; // Assuming this path is correct

const About = () => {
  return (
    <section className="about">
      {/* Existing About Us Section */}
      <div className="about-container">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            We are dedicated to providing high-quality online courses to help
            individuals learn and grow in their desired fields. Our experienced
            instructors ensure that each course is tailored for effective learning
            and practical application.
          </p>
          <p>
            Our mission is to empower learners worldwide by offering flexible,
            accessible, and engaging education that fits into their busy lives.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="About Us"
          />
        </div>
      </div>

      {/* NEW: Features Section - Certificates, Knowledge, Quizzes */}
      <div className="features-section">
        <h2 className="features-heading">What We Offer</h2>
        <div className="feature-cards-container">
          {/* Feature Card 1: Gain Knowledge */}
          <div className="feature-card">
            <div className="icon-wrapper">
              <i className="fas fa-lightbulb"></i> {/* Icon for knowledge */}
            </div>
            <h3>Gain In-depth Knowledge</h3>
            <p>
              Dive deep into subjects with our comprehensive curriculum designed
              by industry experts. Master new concepts at your own pace.
            </p>
          </div>

          {/* Feature Card 2: Watch Lectures with Quizzes */}
          <div className="feature-card">
            <div className="icon-wrapper">
              <i className="fas fa-video"></i> {/* Icon for video lectures */}
            </div>
            <h3>Engaging Lectures & Quizzes</h3>
            <p>
              Learn through high-quality video lectures and solidify your
              understanding with interactive quizzes and practical exercises.
            </p>
          </div>

          {/* Feature Card 3: Earn Certificates */}
          <div className="feature-card">
            <div className="icon-wrapper">
              <i className="fas fa-award"></i> {/* Icon for certificates */}
            </div>
            <h3>Earn Recognized Certificates</h3>
            <p>
              Validate your skills and boost your career with verifiable
              certificates upon successful course completion.
            </p>
          </div>
        </div>
      </div>

      {/* Existing Testimonials Section */}
      <Testimonials />
    </section>
  );
};

export default About;