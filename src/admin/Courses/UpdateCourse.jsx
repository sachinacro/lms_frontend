import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import DashboardLayout from "../Utils/DashboardLayout"; // ✅ admin layout with sidebar
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import "./update-course.css";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course, fetchCourse } = CourseData();
  const { user } = UserData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse(id);
  }, [id]);

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setDescription(course.description || "");
      setCategory(course.category || "");
      setCreatedBy(course.createdBy?.name || course.createdBy || user?.name || "");
      setDuration(course.duration || "");
      setPrice(course.price || "");
      setImagePreview(course.image ? `${server}/${course.image}` : "");
    }
  }, [course, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("createdBy", createdBy);
      formData.append("duration", duration);
      formData.append("price", price);
      if (image) formData.append("file", image);

      await axios.put(`${server}/api/course/${id}`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("Course updated successfully");
      navigate("/admin/course");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="update-course-form">
        <h2>Update Course</h2>
        <form onSubmit={submitHandler}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

          <label>Created By:</label>
          <input type="text" value={createdBy} readOnly style={{ backgroundColor: "#f0f0f0" }} />

          <label>Duration (in hours):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

          <label>Price (₹):</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Update Image:</label>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" width="200px" style={{ marginTop: "10px" }} />
          )}

          <button type="submit" disabled={loading} className="common-btn" style={{ marginTop: "20px" }}>
            {loading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateCourse;
