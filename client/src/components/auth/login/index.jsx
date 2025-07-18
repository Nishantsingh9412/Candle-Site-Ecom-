import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import {
  // googleAuthAction,
  loginAction,
} from "../../../redux/action/auth";

const SignIn = () => {
  const APIURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // const googleAuth = () => {
  //     window.open(
  //         `${APIURL}/auth/google/callback`,
  //         "_self"
  //     )
  // }

  const validate = () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegEx.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setBtnLoading(true);

    const loginData = {
      email: email,
      password: password,
    };

    dispatch(loginAction(loginData))
      .then((res) => {
        if (res.success) {
          const userRole = res.result.role;
          if (userRole === "admin") {
            navigate("/admin/home");
          } else {
            navigate(`/account/${res?.result?._id}`);
          }
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-amber-600 hover:text-amber-800 font-medium text-sm hover:underline transition-colors duration-200"
            >
              Forgot Password?
            </a>
          </div>

          <button
            className="w-full py-3 mt-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer transform hover:scale-[1.02] shadow-lg"
            type="submit"
            disabled={btnLoading}
          >
            {!btnLoading ? (
              "Sign In"
            ) : (
              <ClipLoader
                color={"#FFFFFF"}
                loading={btnLoading}
                size={14}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>

          <button
            onClick={() => {
              setEmail("nishu2020ns@gmail.com");
              setPassword("123456");
            }}
            className="w-full py-2 mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer transform hover:scale-[1.02] shadow-lg"
          >
            {!btnLoading ? (
              "Admin Login (Demo)"
            ) : (
              <ClipLoader
                color={"#FFFFFF"}
                loading={btnLoading}
                size={14}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>

          <button
            onClick={() => {
              setEmail("test1750846689636@gmail.com");
              setPassword("123456");
            }}
            className="w-full py-2 mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer transform hover:scale-[1.02] shadow-lg"
          >
            {!btnLoading ? (
              "User Login (Demo)"
            ) : (
              <ClipLoader
                color={"#FFFFFF"}
                loading={btnLoading}
                size={14}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>

          <div className="text-center pt-4">
            <span className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-amber-600 hover:text-amber-800 font-semibold hover:underline transition-colors duration-200"
              >
                Sign Up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
