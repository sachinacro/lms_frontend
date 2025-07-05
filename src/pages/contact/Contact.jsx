import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../dashbord/sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";

function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "cfb17330-0c70-4942-a2bf-4865d164efc7",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      const res = await axios.post("https://api.web3forms.com/submit", userInfo);
      if (res.data.success) {
        toast.success("✅ Message sent successfully!");
        reset();
      } else {
        toast.error("❌ Failed to send message.");
      }
    } catch {
      toast.error("🚫 Network error while sending the message.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        {/* Sidebar Toggle Button */}
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className="dashboard-main contact-main">
          <div
            className="contact-header"
            style={{
              backgroundImage: 'url(contact.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
              borderRadius: '10px',
              position: 'relative',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '10px',
              }}
            />
            <div className="position-relative z-index-2 text-white text-center p-5">
              <h2 className="fw-bold display-6">Contact Us</h2>
              <p className="text-light">We’d love to hear from you!</p>
            </div>
          </div>

          <div className="container">
            <div className="row g-4 bg-white p-4 rounded shadow-sm">
              {/* Form Section */}
              <div className="col-md-6">
                <h5 className="fw-semibold mb-3" style={{color:"black"}}>Send a Message</h5>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      placeholder="Your Name"
                      {...register("username", { required: true })}
                    />
                    {errors.username && <div className="invalid-feedback">Name is required</div>}
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Your Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <div className="invalid-feedback">Email is required</div>}
                  </div>

                  <div className="mb-3">
                    <textarea
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      rows="5"
                      placeholder="Your Message"
                      {...register("message", { required: true })}
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">Message is required</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info Section */}
              <div className="col-md-6">
                <div className="bg-light p-3 rounded h-100">
                  <h5 className="fw-semibold mb-3">Contact Information</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-3">
                      <FaPhone className="text-primary me-3 fs-5" />
                      <span>+91 7234567896</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <FaEnvelope className="text-danger me-3 fs-5" />
                      <span>assetbazar687@gmail.com</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <FaMapMarkerAlt className="text-success me-3 fs-5" />
                      <span>Indore, MP, India</span>
                    </li>
                  </ul>
                  <hr />
                  <p className="text-muted small">Response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
