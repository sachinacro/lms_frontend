import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Brand */}
        <div className="footer-column">
          <h2 className="footer-logo">E-Learn</h2>
          <p>Your gateway to skill-building and growth.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><AiFillFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><AiFillTwitterSquare /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><AiFillInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><AiFillLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Learn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
