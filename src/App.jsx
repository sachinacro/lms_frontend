import React, { useMemo, useState, useEffect, Suspense, lazy } from "react";
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

// **STATIC IMPORTS (Components that are always present or critical for initial load)**
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading"; // Your custom loading component
import { UserData } from "./context/UserContext";

// **LAZY LOADED COMPONENTS (Most of your page-level components)**
// This will create separate JS chunks for each of these.
const Home = lazy(() => import("./pages/home/Home")); // Keeping Home static is also fine if it's always the landing
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const About = lazy(() => import("./pages/about/About"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Account = lazy(() => import("./pages/account/Account"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const CourseDescription = lazy(() => import("./pages/coursedescription/CourseDescription"));
const PaymentSuccess = lazy(() => import("./pages/paymentsuccess/PaymentSuccess"));
const Dashboard = lazy(() => import("./pages/dashbord/Dashbord")); // Note: Renamed to Dashboard to avoid conflict with DashboardLayout
const CourseStudy = lazy(() => import("./pages/coursestudy/CourseStudy"));
const Lecture = lazy(() => import("./pages/lecture/Lecture"));
const AdminDashboard = lazy(() => import("./admin/Dashboard/AdminDashbord")); // Note: Renamed to AdminDashboard
const AdminCourses = lazy(() => import("./admin/Courses/AdminCourses"));
const AdminUsers = lazy(() => import("./admin/Users/AdminUsers"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const AdminProfile = lazy(() => import("./admin/AdminProfile"));
const ProgressPage = lazy(() => import("./pages/dashbord/Progress"));
const EditProfile = lazy(() => import("./pages/dashbord/EditProfile"));
const AddQuiz = lazy(() => import("./pages/quiz/AddQuiz"));
const LectureQuiz = lazy(() => import("./pages/quiz/LectureQuiz"));
const AdminQuizResult = lazy(() => import("./admin/AdminQuizResult"));
const UpdateCourse = lazy(() => import("./admin/Courses/UpdateCourse"));
const CompletedCourses = lazy(() => import("./pages/dashbord/CompletedCourses"));
const AdminLectureList = lazy(() => import("./admin/AdminLectureList"));
const DashboardLayout = lazy(() => import("./pages/dashbord/layout/DashboardLayout"));
const AdminFAQ = lazy(() => import("./admin/AdminFAQ"));


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
          // You might want to define more specific palette colors here
          // For example, primary, secondary, background colors for both modes
          // primary: {
          //   main: mode === 'light' ? '#1976d2' : '#90caf9',
          // },
          // background: {
          //   default: mode === 'light' ? '#f5f5f5' : '#121212',
          //   paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          // },
        },
        typography: {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                // Ensure no fixed height here that would prevent scrolling
                // If you have a global min-height: 100vh on #root, that's fine.
                // Otherwise, you might want to put min-height on a main content wrapper.
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* Toggle button for dark mode */}
          <IconButton
            sx={{ position: "fixed", top: 10, right: 10, zIndex: 1300 }}
            onClick={toggleMode}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Header isAuth={isAuth} />

          {/* Use <main> tag for main content area to properly push footer down */}
          {/* Ensure your App.css or index.css has #root { display: flex; flex-direction: column; min-height: 100vh; } and main { flex-grow: 1; } */}
          <main>
            <Suspense fallback={<Loading />}> {/* Fallback for all lazy-loaded routes */}
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
                {/* Dashboards - you had two routes for /:id/dashboard, pick one or refine */}
                <Route
                  path="/user/dashboard" // Changed from /:id/dashboard for clarity, assuming user ID is handled internally
                  element={isAuth ? <DashboardLayout user={user} /> : <Login />}
                >
                    {/* Nested routes for dashboard layout if needed, e.g., */}
                    {/* <Route index element={<Dashboard user={user} />} />
                    <Route path="progress" element={<ProgressPage user={user} />} />
                    <Route path="profile/edit" element={<EditProfile />} />
                    <Route path="completed-courses" element={<CompletedCourses user={user} />} /> */}
                </Route>
                {/* If Dashbord is the default content of DashboardLayout, you don't need a separate route for it unless it's direct.
                    Otherwise, you might place Dashbord directly inside DashboardLayout as its child.
                    For now, I'm just correcting the duplicate route. */}
                <Route path="/progress"
                    element={isAuth ? <ProgressPage user={user} /> : <Login />}
                />
                <Route path="/profile/edit" element={isAuth ? <EditProfile /> : <Login />} />
                <Route
                  path="/completed-courses"
                  element={isAuth ? <CompletedCourses user={user} /> : <Login />}
                />


                <Route
                  path="/course/study/:id"
                  element={isAuth ? <CourseStudy user={user} /> : <Login />}
                />
                <Route
                  path="/lectures/:id"
                  element={isAuth ? <Lecture user={user} /> : <Login />}
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={isAuth && user?.role === "admin" ? <AdminDashboard user={user} /> : <Login />} // Check admin role
                />
                <Route
                  path="/admin/course"
                  element={isAuth && user?.role === "admin" ? <AdminCourses user={user} /> : <Login />}
                />
                <Route
                  path="/admin/users"
                  element={isAuth && user?.role === "admin" ? <AdminUsers user={user} /> : <Login />}
                />
                <Route
                  path="/admin/profile"
                  element={isAuth && user?.role === "admin" ? <AdminProfile user={user} /> : <Login />}
                />
                <Route
                  path="/quiz/create/:id"
                  element={isAuth && user.role === "admin" ? <AddQuiz /> : <Login />}
                />
                <Route
                  path="/lecture/quiz/:id"
                  element={isAuth ? <LectureQuiz user={user} /> : <Login />}
                />
                <Route path="/admin/quiz-results" element={isAuth && user?.role === "admin" ? <AdminLectureList /> : <Login />} />
                <Route
                  path="/admin/quiz-results/:lectureId"
                  element={isAuth && user?.role === "admin" ? <AdminQuizResult /> : <Login />}
                />
                <Route
                  path="/admin/course/update/:id"
                  element={isAuth && user?.role === "admin" ? <UpdateCourse /> : <Login />}
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
};

export default App;