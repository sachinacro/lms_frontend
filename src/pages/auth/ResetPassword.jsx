import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import OTPInput from "./OTPInput";

import { server } from "../../main";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/reset`, {
        email,
        otp,
        newPassword,
      });

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form pe-5 shadow-lg" style={{width:'25%'}}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>OTP</label>
          <OTPInput length={6} value={otp} onChange={setOtp} />


          <label>New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="common-btn" disabled={btnLoading}>
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
        <Link to="/forgot" style={{ marginTop: "1rem", display: "block", color: "#1976d2", textDecoration: "underline" }}>
          Back to Forgot Password
        </Link>

      </div>
    </div>
  );
};

export default ResetPassword;
