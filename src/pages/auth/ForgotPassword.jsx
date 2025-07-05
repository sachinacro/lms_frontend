import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(data.message);
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        // background: "linear-gradient(to right, #eef2f3, #d9e2ec)",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 5,
          width: 380,
          maxWidth: "90%",
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          fontWeight={600}
          color="primary"
          sx={{ fontFamily: "Segoe UI" }}
        >
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={btnLoading}
            sx={{ mt: 2, py: 1, borderRadius: 2 }}
          >
            {btnLoading ? "Please Wait..." : "Send Reset Link"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
