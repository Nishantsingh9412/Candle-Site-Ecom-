import React, {
    useCallback,
    useEffect,
    useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

// import Alert from '../../miscellaneous/Alert';
import { signUpAction } from "../../../redux/action/auth";
import {
  sendOTPAPI,
  validateOTPAPI
} from "../../../api/index";
import OtpInput from "../../miscellaneous/OtpInput";

const SignUp = () => {
  const APIURL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOTPLabel, setShowOTPLabel] = useState(false);
  const [showOTPButton, setShowOTPBButton] = useState(true);
  // const [alertType, setAlertType] = useState('failure');
  const [otpbuttonLoading, setOTPButtonLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  // const [showAlert, setShowAlert] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  // const [dob, setDob] = useState('');
  // const [gender, setGender] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOtpChange = (value) => {
    setOTP(value);
    console.log("OTP: ", value);
    const OTPdata = {
        email: email,
        otp: value
    }
    if (value.length === 6) {
        validateOTPAPI(OTPdata).then((res) => {
          // OTP is valid
            setShowOTPLabel(false);
            setShowOTPBButton(false);
            toast.success(res?.data?.message);
        }).catch((err) => {
          // OTP is invalid
            toast.error(err?.response?.data?.message);          
        })
    }
  };

  const handleSendOTP = () => {
    setOTPButtonLoading(true);
    setShowOTPLabel(true);

    if (!email.trim()) {
      setOTPButtonLoading(false);
      toast.error("Email is required");
      return;
    }
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegEx.test(email)) {
      setOTPButtonLoading(false);
      toast.error("Enter a valid email");
      return;
    }
    const emailData = {
      email: email,
    };
    sendOTPAPI(emailData)
      .then((res) => {
        console.log("OTP sent successfully: ", res);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.error("Error occurred while sending OTP: ", err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setOTPButtonLoading(false);
      });
  };

  const AutoAddValues = () => {
    const uniqueEmail = `test${Date.now()}@gmail.com`;
    setFname("Tester");
    setLname("User");
    setEmail(uniqueEmail);
    setPassword("123456");
    setConfirmPassword("123456");
  };

  // const googleAuth = () => {
  //     window.open(
  //         `${APIURL}/auth/google/callback`,
  //         "_self"
  //     )
  // }

  const validate = () => {
    if (!fname.trim()) {
      toast.error("First name is required");
      return false;
    }

    if (!lname.trim()) {
      toast.error("Last name is required");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error("Email is not valid");
      return false;
    }

    if (!OTP.trim()) {
      toast.error("OTP is required");
      return false;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!confirmPassword.trim()) {
      toast.error("Confirm password is required");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setButtonLoading(true);
    const signUpData = {
      fname,
      lname,
      email,
      otp: OTP,
      password,
      confirm_password: confirmPassword,
    };

    dispatch(signUpAction(signUpData))
      .then((res) => {
        if (res?.success) {
          navigate(`/account/${res?.result}`);         // Id is coming from the response
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        console.log("Catch block response : ", err?.message);
        toast.error(err?.message);
        console.error(err);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 overflow-hidden">
      <Toaster />
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/20 max-h-[95vh] overflow-y-auto">
        <div className="text-center mb-4 sm:mb-6">
          {/* <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                        Join Scented Gleam
                    </h1> */}
          {/* <p className="text-gray-600 text-xs sm:text-sm">
            Create your account and discover our luxury candles!
          </p> */}
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={fname}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 bg-white/70 text-sm sm:text-base"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lname}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 bg-white/70 text-sm sm:text-base"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                className="w-full p-2 sm:p-3 pr-16 sm:pr-20 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 bg-white/70 text-sm sm:text-base"
                onChange={(e) => setEmail(e.target.value)}
              />
              
              {showOTPButton && (
              <button
                type="button"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:from-amber-600 hover:to-orange-600 cursor-pointer transition-all duration-200 disabled:opacity-50"
                onClick={handleSendOTP}
                disabled={otpbuttonLoading}
              >
                {!otpbuttonLoading ? (
                  "Send OTP"
                ) : (
                  <ClipLoader
                    color={"#FFFFFF"}
                    loading={otpbuttonLoading}
                    size={14}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </button>
              )}
            
            
            </div>
          </div>

          {showOTPLabel && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                OTP
              </label>
              <OtpInput length={6} onChange={handleOtpChange} />
            </div>
          )}

          <div className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="w-full p-2 sm:p-3 pr-10 sm:pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 bg-white/70 text-sm sm:text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors duration-200 mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20}  className="mt-2 hover:cursor-pointer" />
              ) : (
                <Eye size={20}  className="mt-2 hover:cursor-pointer" />
              )}
            </button>
          </div>

          <div className="relative">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              className="w-full p-2 sm:p-3 pr-10 sm:pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 bg-white/70 text-sm sm:text-base"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors duration-200 mt-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={20}  className="mt-2 hover:cursor-pointer" />
              ) : (
                <Eye size={20}  className="mt-2 hover:cursor-pointer" />
              )}
            </button>
          </div>

          <button
            className="w-full py-3 sm:py-4 mt-3 sm:mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-semibold rounded-2xl hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer "
            type="submit"
            disabled={buttonLoading}
          >
            {!buttonLoading ? (
              "Create Account"
            ) : (
              <ClipLoader
                color={"#FFFFFF"}
                loading={buttonLoading}
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>
          <button
            type="button"
            className="w-full py-3 sm:py-4 mt-3 sm:mt-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold rounded-2xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 disabled:opacity-50 hover:cursor-pointer"
            onClick={AutoAddValues} 
            >
                Auto add           
          </button>
          <div className="text-center">
            <span className="text-gray-600 text-xs sm:text-sm">
              Already have an account?
              <a
                href="/login"
                className="text-amber-600 ml-1 font-semibold hover:text-amber-700 hover:underline transition-colors duration-200"
              >
                Sign In
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
