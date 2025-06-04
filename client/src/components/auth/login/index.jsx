import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  // googleAuthAction,
  loginAction,
} from "../../../redux/action/auth";
import signInImage from "../../../assets/img/sign_in_first.gif";

const SignIn = () => {
  const APIURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const loginData = {
      email: email,
      password: password,
    };

    dispatch(loginAction(loginData))
      .then((res) => {
        if (res.success) {
          navigate("/admin");
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch('/path_to_googleAuthController', {
  //     method: 'GET', // or 'POST'
  //     // Additional fetch options...
  // }).then(response => response.json())
  //     .then(data => {
  //         if (data.redirectUrl) {
  //             window.location.href = data.redirectUrl; // Perform the redirection
  //         }
  //     }).catch(error => console.error('Error:', error));

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Toaster />
      <div className="md:w-2/5 w-full p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full bg-white shadow-2xl rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-themeRed">
            Sign in
          </h2>
          {/* <button
                        onClick={googleAuth}
                        className="w-full py-4 mb-6 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-300">
                        <FcGoogle size={'1.5em'} className='mr-2' />
                        Sign in with Google
                    </button> */}
          {/* <div className="flex items-center justify-center mb-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-600">or sign in with email</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div> */}
          <form onSubmit={handleLoginSubmit}>
            <label className="font-semibold text-lg">Username or Email</label>
            <input
              type="text"
              className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-semibold text-lg">Password</label>
            <input
              type="password"
              className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mb-4">
              <a href="#" className="text-themeRed font-medium hover:underline">
                Forgot?
              </a>
            </div>
            {/* {alertMessage && showAlert && (
                            <Alert
                                message={alertMessage}
                                onClose={handleCloseAlert}
                                type={alertType}
                            />
                        )} */}
            <button
              className="w-full py-5 mb-4 bg-themeRed text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-700 hover:bg-themeRed transition-all duration-300 hover:rounded-full"
              type="submit"
            >
              Sign In
            </button>

            <button
              className="w-full py-5 mb-4 bg-themeRed  hover:cursor-pointer text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-700 hover:bg-themeRed transition-all duration-300 hover:rounded-full"
              type="submit"
              onClick={() => {
                setEmail("nishu2020ns@gmail.com");
                setPassword("123456");
              }}
            >
              Test User
            </button>
            <div className="text-center">
              <span className="text-gray-600">
                Don't have an account?
                <a
                  href="/signup"
                  className="text-themeRed ml-2 font-medium hover:underline"
                >
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div
        className="hidden md:flex md:w-3/5 w-full items-center justify-center bg-cover bg-center"
        // style={{ backgroundImage: `url(${pana2})` }}
      >
        <img
          alt="sign-in image"
          src={signInImage}
          className="object-cover w-4/5 h-full rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default SignIn;
