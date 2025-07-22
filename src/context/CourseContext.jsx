// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { server } from "../main";

// const CourseContext = createContext();

// export const CourseContextProvider = ({ children }) => {
//   const [courses, setCourses] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [mycourse, setMyCourse] = useState([]);

//   // ✅ Search-enabled version of fetchCourses
//   const fetchCourses = async (searchTerm = "") => {
//     try {
//       const { data } = await axios.get(
//         `${server}/api/course/all${searchTerm ? `?search=${searchTerm}` : ""}`
//       );
//       setCourses(data.courses);
//     } catch (err) {
//       console.error("Failed to fetch courses", err);
//     }
//   };

//   const fetchMyCourse = async () => {
//     try {
//       const { data } = await axios.get(`${server}/api/mycourse`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       setMyCourse(data.courses);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     if (localStorage.getItem("token")) {
//       fetchMyCourse();
//     }
//   }, []);

//   return (
//     <CourseContext.Provider
//       value={{
//         courses,
//         fetchCourses,
//         course,
//         mycourse,
//         fetchMyCourse,
//       }}
//     >
//       {children}
//     </CourseContext.Provider>
//   );
// };

// export const CourseData = () => useContext(CourseContext);

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null); // ✅ Changed from [] to null
  const [mycourse, setMyCourse] = useState([]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
      // console.log("Fetched Courses:", data.courses); // ✅ Helpful debug
    } catch (error) {
      console.log("Fetch courses error:", error);
    }
  };

  const fetchCourse = async (id) => {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyCourse = async () => {
  try {
    const { data } = await axios.get(`${server}/api/mycourse`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log("📦 My Courses:", data.courses); // 👈 Check what you're getting here
    setMyCourse(data.courses);
  } catch (error) {
    console.log(error);
  }
};
const handleDelete = async () => {
  await axios.delete(`${server}/api/course/${course._id}`, {
    headers: { token: localStorage.getItem("token") }
  });

  toast.success("Deleted");
};



 useEffect(() => {
  fetchCourses();
  if(localStorage.getItem("token")) {
    fetchMyCourse(); //Jab koi non-auth user ho tab bhi unnecessarily mycourse wala call nahi marega.
  }
}, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
