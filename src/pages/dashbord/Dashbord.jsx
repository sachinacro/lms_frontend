// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import Layout from "../../admin/Utils/Layout";
// import axios from "axios";
// import { server } from "../../main";
// import "./dashbord.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { mycourse } = CourseData();
//   const [user, setUser] = useState({});
//   const [stats, setStats] = useState({
//     enrolled: 0,
//     watched: 0,
//     totalLectures: 0,
//   });

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const { data } = await axios.get(`${server}/api/user/me`, {
//           headers: { token: localStorage.getItem("token") },
//         });
//         setUser(data.user);
//       } catch (err) {
//         navigate("/login");
//       }
//     }

//     // Calculate stats
//     const enrolled = mycourse?.length || 0;
//     const watched = mycourse?.reduce((acc, c) => acc + (c.watchedLectures || 0), 0);
//     const totalLectures = mycourse?.reduce((acc, c) => acc + (c.totalLectures || 0), 0);

//     setStats({ enrolled, watched, totalLectures });

//     fetchUser();
//   }, [mycourse]);

//   // Calculate overall progress percentage
//   const overallProgress =
//     stats.totalLectures > 0 ? Math.round((stats.watched / stats.totalLectures) * 100) : 0;

//   return (
//     <Layout>
//       <div className="dashboard-container">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="profile-box">
//             <img
//               src={user.avatar?.url || "/default-avatar.png"}
//               alt="Avatar"
//               className="avatar"
//             />
//             <h3>{user.name || "User"}</h3>
//           </div>

//           {/* Progress in Sidebar */}
//           <div className="sidebar-progress">
//             <h4>Overall Progress</h4>
//             <div className="progress-bar">
//               <div
//                 className="progress-bar-fill"
//                 style={{ width: `${overallProgress}%` }}
//               ></div>
//             </div>
//             <p>{overallProgress}% Completed</p>
//             <p>
//               {stats.watched} of {stats.totalLectures} Lectures watched
//             </p>
//           </div>

//           <nav className="sidebar-nav">
//             <Link to="/profile/edit">Edit Profile</Link>
//             <Link to="/profile/change-password">Change Password</Link>
//             <Link to="/support">Support</Link>
//             <Link to="/logout">Logout</Link>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="dashboard-main">
//           <h2>Welcome, {user.name?.split(" ")[0]}</h2>

//           {/* User Stats */}
//           <div className="user-stats">
//             <div className="stat-box">
//               <h4>Enrolled Courses</h4>
//               <p>{stats.enrolled}</p>
//             </div>
//             <div className="stat-box">
//               <h4>Lectures Watched</h4>
//               <p>{stats.watched}</p>
//             </div>
//           </div>

//           {/* Enrolled Courses */}
//           <section>
//             <h3>Your Courses</h3>
//             <div className="dashboard-courses">
//               {mycourse && mycourse.length > 0 ? (
//                 mycourse.map((course) => {
//                   const progress = course.totalLectures
//                     ? Math.round(
//                         (course.watchedLectures / course.totalLectures) * 100
//                       )
//                     : 0;

//                   return (
//                     <div key={course._id} className="course-progress-card">
//                       <h4>{course.title}</h4>

//                       <div className="progress-bar-container">
//                         <div className="progress-bar">
//                           <div
//                             className="progress-bar-fill"
//                             style={{ width: `${progress}%` }}
//                           ></div>
//                         </div>
//                         <p>{progress}% Completed</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="empty-message">No enrolled courses found.</p>
//               )}
//             </div>
//           </section>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/coursecard/CourseCard";
// import Layout from "../../admin/Utils/Layout";
// import axios from "axios";
// import { server } from "../../main";
// import "./dashbord.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { mycourse } = CourseData();
//   const [user, setUser] = useState({});
//   const [stats, setStats] = useState({
//     enrolled: 0,
//     watched: 0,
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await axios.get(`${server}/api/user/me`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });
//         setUser(data.user);
//       } catch (error) {
//         navigate("/login");
//       }
//     };

//     // Stats set kar raha hai
//     setStats({
//       enrolled: mycourse?.length || 0,
//       watched: mycourse?.reduce(
//         (acc, course) => acc + (course.watchedLectures || 0),
//         0
//       ),
//     });

//     fetchUser();
//   }, [mycourse]);

//   return (
//     <Layout>
//       <div className="dashboard-container">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="profile-box">
//             <img
//               src={user.avatar || "/default-avatar.png"}
//               alt="Avatar"
//               className="avatar"
//             />
//             <h3>{user.name || "User"}</h3>
//           </div>
//           <nav className="sidebar-nav">
//             <Link to="/profile/edit">📝 Edit Profile</Link>
//             <Link to="/profile/change-password">🔐 Change Password</Link>
//             <Link to="/support">📩 Support</Link>
//             <Link to="/logout">🚪 Logout</Link>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="dashboard-main">
//           <h2>👋 Welcome, {user.name?.split(" ")[0] || "User"}</h2>

//           {/* User Stats */}
//           <div className="user-stats">
//             <div className="stat-box">
//               <h4>📚 Enrolled Courses</h4>
//               <p>{stats.enrolled}</p>
//             </div>
//             <div className="stat-box">
//               <h4>🎥 Lectures Watched</h4>
//               <p>{stats.watched}</p>
//             </div>
//           </div>

//           {/* Enrolled Courses */}
//           <section>
//             <h3>Your Courses</h3>
//             <div className="dashboard-courses">
//               {mycourse && mycourse.length > 0 ? (
//                 mycourse.map((course) => (
//                   <CourseCard key={course._id} course={course} />
//                 ))
//               ) : (
//                 <p className="empty-message">😔 No enrolled courses found.</p>
//               )}
//             </div>
//           </section>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import axios from "axios";
import { server } from "../../main";
import Sidebar from "./sidebar/Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import "./dashbord.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { mycourse } = CourseData();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ enrolled: 0, completed: 0 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/dashboard`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setUser(data.user);
        setStats({
          enrolled: data.stats.totalCourses,
          completed: data.stats.completedCourses,
        });
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`dashboard-main ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <h2>👋 Welcome, {user.name?.split(" ")[0] || "User"}</h2>

        <div className="user-stats">
          <div className="stat-box">
            <h4>📚 Enrolled Courses</h4>
            <p>{stats.enrolled}</p>
          </div>
          <div className="stat-box">
            <Link to="/completed-courses" style={{ textDecoration: "none", color: "inherit" }}>
              <h4>🎓 Completed Courses</h4>
              <p>{stats.completed}</p>
            </Link>
          </div>
        </div>

        <section>
          <h3>Your Courses</h3>
          <div className="dashboard-courses">
            {mycourse && mycourse.length > 0 ? (
              mycourse.map((course) => <CourseCard key={course._id} course={course} />)
            ) : (
              <p className="empty-message">😔 No enrolled courses found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import CourseCard from "../../components/coursecard/CourseCard";
// import axios from "axios";
// import { server } from "../../main";
// import Sidebar from "./sidebar/Sidebar";
// import { FiMenu, FiX } from "react-icons/fi";
// import "./dashbord.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { mycourse } = CourseData();
//   const [user, setUser] = useState({});
//   const [isOpen, setIsOpen] = useState(true); // Sidebar open by default on desktop
//   const [stats, setStats] = useState({ enrolled: 0, completed: 0 });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await axios.get(`${server}/api/user/dashboard`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });
//         setUser(data.user);
//         setStats({
//           enrolled: data.stats.totalCourses,
//           completed: data.stats.completedCourses,
//         });
//       } catch (error) {
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   return (
//     <div className={`dashboard-wrapper ${isOpen ? "slide-open" : "slide-closed"}`}>
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//       <div className="dashboard-main">
//         <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </div>

//         <h2>👋 Welcome, {user.name?.split(" ")[0] || "User"}</h2>

//         <div className="user-stats">
//           <div className="stat-box">
//             <h4>📚 Enrolled Courses</h4>
//             <p>{stats.enrolled}</p>
//           </div>
//           <div className="stat-box">
//             <Link to="/completed-courses" style={{ textDecoration: "none", color: "inherit" }}>
//               <h4>🎓 Completed Courses</h4>
//               <p>{stats.completed}</p>
//             </Link>
//           </div>
//         </div>

//         <section>
//           <h3>Your Courses</h3>
//           <div className="dashboard-courses">
//             {mycourse && mycourse.length > 0 ? (
//               mycourse.map((course) => <CourseCard key={course._id} course={course} />)
//             ) : (
//               <p className="empty-message">😔 No enrolled courses found.</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

