import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import "./Login.css"; // Ensure you have the styles for the login page
import loginImg from "../../assets/type10.avif"; // replace with your image path
import { server } from "../../main";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser, setUser, setIsAuth } = UserData();
  const { fetchMyCourse } = CourseData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  const handleGoogleLogin = async () => {
    setGoogleBtnLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await fetch(`${server}/api/user/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        fetchMyCourse();
        if (data.user.role === "admin") {
          navigate("/account");
        } else {
          navigate(`/${data.user._id}/dashboard`);
        }
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
    } finally {
      setGoogleBtnLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: "#f5f7fa" }}>
      <Paper elevation={3} sx={{ display: "flex", borderRadius: "20px", overflow: "hidden", maxWidth: 900, width: "100%" }}>
        <Box sx={{ flex: 1 }}>
          <img src={loginImg} alt="Login" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box sx={{ flex: 1, padding: "30px 25px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5" mb={2} fontWeight="800" color="#222" textAlign="center">
            Let’s Get Started
          </Typography>
          
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
              padding: "8px 12px",
              marginBottom: "15px",
              cursor: "pointer",
              transition: "box-shadow 0.3s ease",
              border: "1px solid #ddd",
            }}
            onClick={handleGoogleLogin}
            disabled={googleBtnLoading}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            {googleBtnLoading ? "Please wait..." : "Sign in with Google"}
          </Button>

          <Divider sx={{ my: 2, fontWeight: 500, color: "#999" }}>OR</Divider>

          <form onSubmit={submitHandler} noValidate>
            <TextField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  fullWidth
  required
  variant="outlined"
  margin="normal"
  InputProps={{
    sx: {
      borderRadius: "30px",
      background: "#fff"
    }
  }}
/>

           <TextField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  fullWidth
  required
  variant="outlined"
  margin="normal"
  InputProps={{
    sx: {
      borderRadius: "30px",
      background: "#fff"
    }
  }}
/>


            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginTop: "15px",
                borderRadius: "30px",
                padding: "12px",
                fontSize: "16px",
                textTransform: "none",
              }}
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Login"}
            </Button>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </Typography>
              <Typography variant="body2">
                <Link to="/forgot">Forgot password?</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
