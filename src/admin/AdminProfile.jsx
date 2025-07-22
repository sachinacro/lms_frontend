import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import DashboardLayout from "./Utils/DashboardLayout"; // ✅ use admin layout with sidebar
import "./adminProfile.css";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/api/admin/profile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data.user);
      setFormData({ name: data.user.name, phone: data.user.phone || "" });
    } catch (err) {
      console.error("Error fetching profile", err);
      setError("Failed to load profile");
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(`${server}/api/admin/update`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      fetchProfile();
      window.bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error)
    return (
      <DashboardLayout>
        <p className="text-danger m-4">{error}</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="mb-4 text-primary">Admin Profile</h2>
          {user ? (
            <>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role}
                </li>
              </ul>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>

      {/* Modal for editing profile */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={updateProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;
