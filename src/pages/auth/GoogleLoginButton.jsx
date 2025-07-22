// src/components/GoogleLoginButton.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const GoogleLoginButton = () => {
 const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken(); // 🟢 Get Firebase ID token

    // 🟢 Send token to your backend
    const res = await fetch("http://localhost:5000/api/user/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await res.json();

    if (res.ok) {
      // 🟢 Save JWT from backend
      localStorage.setItem("token", data.token);

      console.log("Login Success:", data);
      navigate("/account");
    } else {
      console.error("Login Failed:", data.message);
      alert("Google login failed: " + data.message);
    }
  } catch (error) {
    console.error("Google login error:", error);
    alert("Google Sign-In failed");
  }
};

  return (
    <button onClick={handleGoogleLogin} style={{ padding: "10px", background: "#4285F4", color: "#fff" }}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
