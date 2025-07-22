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
import { UserData } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main";
import signupImg from "../../assets/type11.webp"; // change to your image

const Register = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    btnLoading,
    setBtnLoading,
    setUser,
    setIsAuth,
  } = UserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(name, email, password, phone, navigate);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setBtnLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      const { data } = await axios.post(`${server}/api/user/google-login`, {
        token: idToken,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/account");
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError("Google Sign-In failed. Try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: "#f5f7fa" }}>
      <Paper elevation={3} sx={{ display: "flex", borderRadius: "20px", overflow: "hidden", maxWidth: 900, width: "100%" }}>
        {/* Left Image */}
        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
          <img
            src={signupImg}
            alt="Signup"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Right Form */}
        <Box sx={{ flex: 1, padding: "30px 25px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5" mb={2} fontWeight="800" color="#222" textAlign="center">
            Create an Account
          </Typography>

          {error && (
            <Typography color="error" variant="body2" mb={2} textAlign="center">
              {error}
            </Typography>
          )}

          <form onSubmit={submitHandler} autoComplete="off">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ borderRadius: "30px", background: "#fff" }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ borderRadius: "30px", background: "#fff" }}
            />
            <TextField
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ borderRadius: "30px", background: "#fff" }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ borderRadius: "30px", background: "#fff" }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2, borderRadius: "30px", padding: "12px", fontSize: "16px", textTransform: "none" }}
              disabled={btnLoading}
            >
              {btnLoading ? "Please Wait..." : "Register"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={btnLoading}
            startIcon={
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
            }
            sx={{ textTransform: "none", borderRadius: 2, fontWeight: 500, py: 1 }}
          >
            {btnLoading ? "Please wait..." : "Sign up with Google"}
          </Button>

          <Typography variant="body2" mt={3} textAlign="center">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;




// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Divider,
//   Link as MuiLink,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { serverTimestamp } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";
// import { auth } from "../../firebase";
// import { db } from "../../firebase"; // Don't forget to import db if not already
// import { UserData } from "../../context/UserContext";

// // const Register = () => {
// //  const navigate = useNavigate();
// //   const [btnLoading, setBtnLoading] = useState(false); // local loading state
  
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //     const {  registerUser } = UserData();
// //   const [phone, setPhone] = useState("");
// //   const [name, setName] = useState("");
// //   const [error, setError] = useState("");

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     setBtnLoading(true);
// //     setError("");

// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       await updateProfile(userCredential.user, { displayName: name });

// //      await setDoc(doc(db, "users", userCredential.user.uid), {
// //   uid: userCredential.user.uid,
// //   name,
// //   email,
// //   phone,
// //   createdAt: serverTimestamp(),
// // });
// //      await registerUser(name, email, password, phone, navigate);
// //      // navigate("/verify");
// //     } catch (err) {
// //       console.error("Registration error:", err);
// //       setError(err.message);
// //     } finally {
// //       setBtnLoading(false);
// //     }
// //   };
//  const submitHandler = async (e) => {
//     e.preventDefault();
//     await registerUser(name, email, password, navigate);
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     setError("");
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("Google user:", result.user);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Google Sign-In error:", err);
//       setError("Google Sign-In failed. Try again.");
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="100vh"
//       sx={{
//         // background: "linear-gradient(to right, #eef2f3, #d9e2ec)",
//          padding: 2,
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           padding: 5,
//           width: 400,
//           maxWidth: "90%",
//           borderRadius: 3,
//           textAlign: "center",
//           backdropFilter: "blur(6px)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           mb={3}
//           fontWeight={600}
//           color="primary"
//           sx={{ fontFamily: "Segoe UI" }}
//         >
//           Create an Account
//         </Typography>

//         {error && (
//           <Typography color="error" variant="body2" mb={2}>
//             {error}
//           </Typography>
//         )}

//         <form onSubmit={submitHandler}>
//           <TextField
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             required
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//             margin="normal"
//           />
//           <TextField
//             label="Phone Number"
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             fullWidth
//             required
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             required
//             margin="normal"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             type="submit"
//             disabled={btnLoading}
//             sx={{ mt: 2, py: 1, borderRadius: 2 }}
//           >
//             {btnLoading ? "Please Wait..." : "Register"}
//           </Button>
//         </form>

//         <Divider sx={{ my: 3 }}>or</Divider>

//         <Button
//           variant="outlined"
//           color="secondary"
//           fullWidth
//           onClick={handleGoogleSignIn}
//           startIcon={
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt="Google"
//               style={{ width: 20, height: 20 }}
//             />
//           }
//           sx={{
//             textTransform: "none",
//             borderRadius: 2,
//             fontWeight: 500,
//             py: 1,
//           }}
//         >
//           Sign up with Google
//         </Button>

//         <Typography variant="body2" mt={3}>
//           Already have an account?{" "}
//           <MuiLink component={Link} to="/login" underline="hover" color="primary">
//             Login
//           </MuiLink>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default Register;
