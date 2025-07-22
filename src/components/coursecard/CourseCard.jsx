import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course, isAdmin = false }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting course");
      }
    }
  };

  return (
    <div className="course-card-v2">
      <div className="image-container">
        {/* <img
          src={
            course.image
              ? `${server}/${course.image}`
              : "https://cdn-icons-png.flaticon.com/512/219/219986.png"
          }
          alt={course.title}
        /> */}
        <img
  src={
    course?.image?.url
      ? course.image.url  // ✅ Correct Cloudinary URL
      : "https://cdn-icons-png.flaticon.com/512/219/219986.png"
  }
  alt={course.title}
/>

        {course.price === 0 && <span className="badge-free">Free</span>}
      </div>

      <div className="card-body">
        <h3 className="title">{course.title}</h3>
        <p className="creator">👨‍🏫 {course.createdBy?.name || "Unknown"}</p>
        <p className="meta">⏱ {course.duration || "N/A"} weeks</p>
        <p className="price">
          💰 {course.price === 0 ? <span className="free">Free</span> : `₹${course.price}`}
        </p>
      </div>

      <div className="card-footer">
        {isAuth ? (
          <>
            {user?.role === "admin" ? (
              <>
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="action-btn blue"
                >
                  ➕ Add Lecture
                </button>
                <button
                  onClick={() => navigate(`/admin/course/update/${course._id}`)}
                  className="action-btn yellow"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => deleteHandler(course._id)}
                  className="action-btn red"
                >
                  🗑️ Delete
                </button>
              </>
            ) : user?.subscription?.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="action-btn green"
              >
                📘 Study
              </button>
            ) : (
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="action-btn primary"
              >
                💳 Buy Now
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="action-btn primary"
          >
            🚀 Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;


// import React from "react";
// import "./courseCard.css";
// import { server } from "../../main";
// import { UserData } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { CourseData } from "../../context/CourseContext";

// const CourseCard = ({ course }) => {
//   const navigate = useNavigate();
//   const { user, isAuth } = UserData();
//   const { fetchCourses } = CourseData();

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         const { data } = await axios.delete(`${server}/api/course/${id}`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });

//         toast.success(data.message);
//         fetchCourses();
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Error deleting course");
//       }
//     }
//   };

//   return (
//     <div className="course-card">
//       <div className="card-image-wrapper">
//         <img
//           src={
//             course.image
//               ? `${server}/${course.image}`
//               : "https://cdn-icons-png.flaticon.com/512/219/219986.png"
//           }
//           alt="course"
//           className="course-image"
//         />
//       </div>

//       <div className="course-details">
//         <h3>{course.title}</h3>
//         <p className="instructor">👨‍🏫 {course.createdBy.name || "Unknown"}</p>
//         <p>⏱ Duration: {course.duration || "N/A"} weeks</p>
//         <p>💰 Price: ₹{course.price || 0}</p>
//       </div>

//       <div className="course-actions">
//         {isAuth ? (
//           <>
//             {user && user.role === "admin" ? (
//               <button
//                 onClick={() => navigate(`/course/study/${course._id}`)}
//                 className="course-btn blue"
//               >
//                 ➕ Add Lecture
//               </button>
//             ) : user?.subscription?.includes(course._id) ? (
//               <button
//                 onClick={() => navigate(`/course/study/${course._id}`)}
//                 className="course-btn green"
//               >
//                 📘 Study
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate(`/course/${course._id}`)}
//                 className="course-btn primary"
//               >
//                 💳 Buy Now
//               </button>
//             )}
//           </>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="course-btn primary"
//           >
//             🚀 Get Started
//           </button>
//         )}

//         {user?.role === "admin" && (
//           <div className="admin-actions">
//             <button
//               onClick={() =>
//                 navigate(`/admin/course/update/${course._id}`)
//               }
//               className="course-btn yellow"
//             >
//               ✏️ Update
//             </button>
//             <button
//               onClick={() => deleteHandler(course._id)}
//               className="course-btn red"
//             >
//               🗑️ Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
