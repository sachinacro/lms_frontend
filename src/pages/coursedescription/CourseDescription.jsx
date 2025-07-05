import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");

    // Free course bypass logic
    if (course.price === 0) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${server}/api/course/enroll/${params.id}`,
          {},
          {
            headers: {
              token,
            },
          }
        );
        toast.success(data.message || "Enrolled in free course");
        await fetchUser();
        await fetchCourses();
        await fetchMyCourse();
        navigate(`/course/study/${params.id}`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Free course enrollment failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Paid course
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      setLoading(true);
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: { token },
        }
      );

      const options = {
        key: "rzp_test_HhWhYhg9mE0cgn",
        amount: order.amount,
        currency: "INR",
        name: "E learning",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          } = response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: { token },
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error("Payment verification failed.");
          }
        },
        theme: {
          color: "#8a4baf",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>
              <p>Let's get started with course At ₹{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                
                <button
                disabled={loading}
                onClick={async () => {
                  if (course.price === 0) {
                    setLoading(true);
                    try {
                      const { data } = await axios.post(
                        `${server}/api/course/enroll/${course._id}`,
                        {},
                        {
                          headers: {
                            token: localStorage.getItem("token"),
                          },
                        }
                      );
                      toast.success(data.message || "Enrolled in free course");
                      await fetchUser();
                      await fetchMyCourse();
                      navigate(`/course/study/${course._id}`);
                    } catch (err) {
                      toast.error(err.response?.data?.message || "Failed to enroll in free course");
                    } finally {
                      setLoading(false);
                    }
                  } else {
                    checkoutHandler();
                  }
                }}
                className="common-btn"
              >
                {loading ? "Please wait..." : course.price === 0 ? "Start Learning" : "Buy Now"}
              </button>

              )}


            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
