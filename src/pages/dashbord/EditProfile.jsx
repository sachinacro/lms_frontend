import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import "./editprofile.css";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", avatar: "", phone: "" });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/me`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        setUser({
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar,
          phone: data.user.phone || "",
        });
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/api/user/update`,
        { name: user.name, phone: user.phone },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar toggle button for mobile */}
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="edit-form-section">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2>📝 Edit Profile</h2>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />

            <label>Email (read-only)</label>
            <input type="email" value={user.email} readOnly />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
