import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Component imports
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashbord from "./pages/dashbord/Dashbord";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminProfile from "./admin/AdminProfile";
import ProgressPage from "./pages/dashbord/Progress";
import EditProfile from "./pages/dashbord/EditProfile";
import AddQuiz from "./pages/quiz/AddQuiz";
import LectureQuiz from "./pages/quiz/LectureQuiz";
import AdminQuizResult from "./admin/AdminQuizResult";
import UpdateCourse from "./admin/Courses/UpdateCourse";
import CompletedCourses from "./pages/dashbord/CompletedCourses";
import AdminLectureList from "./admin/AdminLectureList";
import DashboardLayout from "./pages/dashbord/layout/DashboardLayout";
import AdminFAQ from "./admin/AdminFAQ";


const App = () => {
  const { isAuth, user, loading } = UserData();

  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") || "light";
    setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  // const toggleMode = () => {
  //   setMode((prev) => (prev === "light" ? "dark" : "light"));
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* Toggle button for dark mode */}
          {/* <IconButton
            sx={{ position: "fixed", top: 10, right: 10, zIndex: 1300 }}
            onClick={toggleMode}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}

          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/admin/faq" element={<AdminFAQ />} />

            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            />
           <Route
            path="/reset-password"
            element={isAuth ? <Home /> : <ResetPassword />}
          />

            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashbord user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <DashboardLayout user={user} /> : <Login />}
            />
             <Route
              path="/completed-courses"
              element={isAuth ? <CompletedCourses user={user} /> : <Login />}
            />
            <Route path="/progress" 
            element={isAuth?<ProgressPage user={user} />  : <Login/>}
            />
            <Route path="/profile/edit" element={isAuth ? <EditProfile /> : <Login />} />
            
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashbord user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            <Route
              path="/admin/profile"
              element={isAuth ? <AdminProfile user={user} /> : <Login />}
            />
            <Route
              path="/quiz/create/:id"
              element={isAuth && user.role === "admin" ? <AddQuiz /> : <Login />}
            />
            <Route
              path="/lecture/quiz/:id"
              element={isAuth ? <LectureQuiz user={user} /> : <Login />}
            />
            <Route path="/admin/quiz-results" element={<AdminLectureList />} />
            <Route
              path="/admin/quiz-results/:lectureId"
              element={isAuth && user?.role === "admin" ? <AdminQuizResult /> : <Login />}
            />
            <Route
              path="/admin/course/update/:id"
              element={isAuth && user?.role === "admin" ? <UpdateCourse /> : <Login />}
            />



            

          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
};

export default App;
