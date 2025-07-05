import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  
 async function loginUser(email, password, navigate, fetchMyCourse) {
  setBtnLoading(true);

  try {
    const { data } = await axios.post(`${server}/api/user/login`, {
      email,
      password,
    });

    toast.success(data.message);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsAuth(true);
    setBtnLoading(false);

    fetchMyCourse(); // optional

    // ✅ Redirect based on role
    if (data.user.role === "admin" || data.user.mainrole === "admin") {
      navigate("/account");  // ya admin dashboard
    } else {
      navigate(`/${data.user._id}/dashboard`);
    }
  } catch (error) {
    setBtnLoading(false);
    setIsAuth(false);
    const message = error?.response?.data?.message || "Login failed. Please try again.";
    toast.error(message);
  }
}


  function logout() {
  localStorage.clear();
  setUser([]);
  setIsAuth(false);
  toast.success("Logged Out");
}

  

async function registerUser(name, email, password, phone, navigate) {
  setBtnLoading(true);
  
  
  try {
    const { data } = await axios.post(`${server}/api/user/register`, {
      name,
      email,
      password,
      phone, // 🔥 include phone
    });
    console.log(data);
    

    toast.success(data.message);
    localStorage.setItem("activationToken", data.activationToken);
    setBtnLoading(false);
    navigate("/verify");
  } catch (error) {
    setBtnLoading(false);
    toast.error(error.response?.data?.message || "Registration failed");
  }
}

async function loginWithGoogle(idToken, navigate, fetchMyCourse) {
  setBtnLoading(true);
  try {
    const { data } = await axios.post(`${server}/api/user/google-login`, {
      token: idToken,
    });

    toast.success(data.message);

    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsAuth(true);
    setBtnLoading(false);

    console.log("Google User Data:", data.user); // 👀 Check this in browser console

    const isAdmin = data.user.role === "admin" || data.user.mainrole === "admin";
    navigate(isAdmin ? "/account" : `/${data.user._id}/dashboard`);

    fetchMyCourse();
  } catch (error) {
    setBtnLoading(false);
    setIsAuth(false);
    const message = error?.response?.data?.message || "Google login failed";
    toast.error(message);
  }
}



  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
   <UserContext.Provider
  value={{
    user,
    setUser,
    setIsAuth,
    isAuth,
    loginUser,
    btnLoading,
    loading,
    registerUser,
    setBtnLoading,
    verifyOtp,
    fetchUser,
    logout, // 👈 yeh add karo
  }}
>

      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);