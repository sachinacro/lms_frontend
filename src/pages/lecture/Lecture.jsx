import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams , Link} from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { CourseData } from "../../context/CourseContext";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState(null);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const { course } = CourseData(); // Access course info from context
  const [isEditMode, setIsEditMode] = useState(false);
const [editingLectureId, setEditingLectureId] = useState(null);


  // 🔒 Access control - block access only if not admin, not subscribed & course isn't free
  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription.includes(params.id) &&
      course?.price > 0
    ) {
      navigate("/");
    }
  }, [user, course]);

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
       toast.error('Failed to fetch lectures');
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
  setBtnLoading(true);
  e.preventDefault();
  const myForm = new FormData();
  myForm.append("title", title);
  myForm.append("description", description);
  myForm.append("video", video);  // 👈 Correct field name
  console.log("🎥 Video File:", video);


  try {
    const { data } = await axios.post(
      `${server}/api/course/${params.id}`,
      myForm,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message);
    setBtnLoading(false);
    setShow(false);
    fetchLectures();
    setTitle("");
    setDescription("");
    setvideo("");
    setVideoPrev("");
  } catch (error) {
    toast.error(error.response.data.message);
    setBtnLoading(false);
  }
};


  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
  try {
    const { data } = await axios.get(
      `${server}/api/user/progress?course=${params.id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCompleted(data.courseProgressPercentage);
    setCompletedLec(data.completedLectures);
    setLectLength(data.allLectures);

    // ✅ Added for safe fallback
    if (!data.progress[0].quizProgress) {
      data.progress[0].quizProgress = {};
    }

    setProgress(data.progress);
  } catch (error) {
    console.log(error);
  }
}


 const addProgress = async (id) => {
  try {
    const { data } = await axios.post(
      `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    fetchProgress(); // ✅ Refresh after update
  } catch (error) {
    toast.error(error.response?.data?.message || "Progress update failed");
  }
};

const editHandler = (lec) => {
  setIsEditMode(true);
  setShow(true);
  setTitle(lec.title);
  setDescription(lec.description);
  setEditingLectureId(lec._id);
  setVideoPrev(`${server}/${lec.video}`);
};
const resetForm = () => {
  setTitle("");
  setDescription("");
  setvideo("");
  setVideoPrev("");
  setIsEditMode(false);
  setEditingLectureId(null);
  setShow(false);
};


const updateHandler = async (e) => {
  e.preventDefault();
  setBtnLoading(true);

  const myForm = new FormData();
  myForm.append("title", title);
  myForm.append("description", description);
  if (video) myForm.append("video", video); // Only if updated

  try {
    const { data } = await axios.put(
      `${server}/api/lecture/${editingLectureId}`,
      myForm,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast.success(data.message);
    resetForm();
    fetchLectures();
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    setBtnLoading(false);
  }
};


useEffect(() => {
  if (lecture) {
    setTitle(lecture.title || "");
    setDescription(lecture.description || "");
  }
}, [lecture]);



  const downloadCertificate = async () => {
  try {
    const { data } = await axios.get(`${server}/api/certificate/${params.id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
      responseType: "blob", // So browser treats it as a file
    });

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Certificate-${course?.title}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
    toast.error("Failed to download certificate.");
  }
};


  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progress-container">
          <div className="progress-label">
            Lecture Completed: {completedLec} / {lectLength}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completed}%` }}
            >
              {Math.round(completed)}%
            </div>
          </div>
          {completed === 100 && progress[0]?.quizPassed && (
              <button
                className="common-btn"
                onClick={downloadCertificate}
                style={{ backgroundColor: "#28a745", color: "#fff", marginTop: "10px" }}
              >
                🎓 Download Certificate
              </button>
            )}
            {completed === 100 && !progress[0]?.quizPassed && (
              <p style={{ color: "crimson", fontWeight: "bold" }}>
                🎯 You must pass all quizzes (50%+) to unlock the certificate.
              </p>
            )}



</div>
          

          <div className="lecture-page">
            <div className="left">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                     <video
  key={lecture._id}
  src={lecture?.video?.url}
  width={"100%"}
  controls
  controlsList="nodownload noremoteplayback"
  disablePictureInPicture
  disableRemotePlayback
  autoPlay
  onEnded={() => {
    console.log("📽️ Video Ended");
    addProgress(lecture._id);
  }}
></video>

                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1>Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="right">
              {user && user.role === "admin" && (
                <button className="common-btn" onClick={() => setShow(!show)}>
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}

              {show && (
                <div className="lecture-form">
                  <h2>Add Lecture</h2>
                  <form
  onSubmit={isEditMode ? updateHandler : submitHandler}
  encType="multipart/form-data"
>

                    <label htmlFor="text">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <label htmlFor="text">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <input type="file" onChange={changeVideoHandler} />

                    {videoPrev && <video src={videoPrev} width={300} controls />}

                    <button type="submit" className="common-btn" disabled={btnLoading}>
                      {btnLoading
                        ? "Please Wait..."
                        : isEditMode
                        ? "Update Lecture"
                        : "Add Lecture"}
                    </button>
                  </form>

                </div>
              )}


              {/* {lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={e._id}>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`lecture-number ${
                        lecture._id === e._id && "active"
                      }`}
                    >
                      {i + 1}. {e.title}{" "}
                      {progress[0] &&
                        progress[0].completedLectures.includes(e._id) && (
                          <span
                            style={{
                              background: "red",
                              padding: "2px",
                              borderRadius: "6px",
                              color: "greenyellow",
                            }}
                          >
                            <TiTick />
                          </span>
                        )}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className="common-btn"
                        style={{ background: "red" }}
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete {e.title}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No Lectures Yet!</p>
              )} */}
              {lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={e._id}>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`lecture-number ${lecture._id === e._id && "active"}`}
                    >
                      {i + 1}. {e.title}{" "}
                      {progress[0] &&
                        progress[0].completedLectures.includes(e._id) && (
                          <span
                            style={{
                              background: "red",
                              padding: "2px",
                              borderRadius: "6px",
                              color: "greenyellow",
                            }}
                          >
                            <TiTick />
                          </span>
                        )}
                    </div>

                    {/* ✅ Admin Button: Add Quiz */}
                    {user?.role === "admin" && (
                      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <button
                          className="common-btn"
                          style={{ background: "red" }}
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>

                        <button
                          className="common-btn"
                          style={{ background: "orange" }}
                          onClick={() => editHandler(e)}
                        >
                          ✏️ Edit
                        </button>

                        <Link
                          className="common-btn"
                          to={`/quiz/create/${e._id}`}
                        >
                          ➕ Add Quiz
                        </Link>
                      </div>
                    )}



                    {/* ✅ Student Button: Take Quiz */}
                    {user?.role !== "admin" && e.quiz?.length > 0 && (
                      <>
                        {progress[0]?.quizProgress?.[e._id]?.passed ? (
                          <button
                            className="common-btn"
                            style={{ backgroundColor: "green", color: "#fff", marginBottom: "10px" }}
                            disabled
                          >
                            ✅ Quiz Passed
                          </button>
                        ) : (
                          <Link
                            to={`/lecture/quiz/${e._id}`}
                            className="common-btn"
                            style={{ marginBottom: "10px" }}
                          >
                            📝 Take Quiz
                          </Link>
                        )}
                      </>
                    )}

                  </div>
                ))
              ) : (
                <p>No Lectures Yet!</p>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
