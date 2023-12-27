import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthProvider = createContext();
function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  const [login, setLogin] = useState(false);
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    // phone: "",
    pass: "",
    cpass: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    pass: "",
  });

  const registerHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };
  const loginHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
  const SubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      });
      const res = await response.json();
      if (response.ok) {
        setUserRegister({
          name: "",
          email: "",
          // phone: "",
          pass: "",
          cpass: "",
        });

        toast.success(res.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        // toast(res.message ? res.message : res.msg);
        toast.error(res.message ? res.message : res.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const SubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const res = await response.json();
      if (response.ok) {
        storeToken(res.token);
        setLogin({
          email: "",
          pass: "",
        });
        toast.success(res.msg ? res.msg : res, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      } else {
        toast.error(res.message ? res.message : res.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  let isLoggedIn = !!token;
  return (
    <>
      <AuthProvider.Provider
        value={{
          storeToken,
          LogoutUser,
          isLoggedIn,
          userRegister,
          setUserRegister,
          userLogin,
          setUserLogin,
          registerHandler,
          loginHandler,
          SubmitRegister,
          SubmitLogin,
          login,
          setLogin,
        }}
      >
        {children}
      </AuthProvider.Provider>
    </>
  );
}
const useAuth = () => {
  return useContext(AuthProvider);
};
export { AuthContext, useAuth };
