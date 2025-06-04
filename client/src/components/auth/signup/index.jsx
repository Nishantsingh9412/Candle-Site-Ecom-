import React, {
    // useCallback,
    // useEffect,
    useState
} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
// import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import signUpImage from '../../../assets/img/signup-image.gif';

// import Alert from '../../miscellaneous/Alert';
import { signUpAction } from '../../../redux/action/auth';
import {
    sendOTPAPI,
    // validateOTPAPI
} from '../../../api/index';
import OtpInput from '../../miscellaneous/OtpInput';


const SignUp = () => {
    const APIURL = import.meta.env.VITE_API_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showOTPLabel, setShowOTPLabel] = useState(false);
    // const [alertType, setAlertType] = useState('failure');
    const [otpbuttonLoading, setOTPButtonLoading] = useState(false);
    const [OTP, setOTP] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    // const [dob, setDob] = useState('');
    // const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);


    const handleOtpChange = (value) => {
        setOTP(value);
        console.log("OTP: ", value);
        // const OTPdata = {
        //     email: email,
        //     otp: value
        // }
        // if (value.length === 6) {
        //     validateOTPAPI(OTPdata).then((res) => {
        //         console.log("OTP validated successfully: ", res);
        //         setOTPValidated(true);
        //     }).catch((err) => {
        //         console.error("Error occurred while validating OTP: ", err);
        //         setOTPValidated(false);
        //     })
        // }
    };

    const handleSendOTP = () => {
        setOTPButtonLoading(true);
        setShowOTPLabel(true);

        if (!email.trim()) {
            setOTPButtonLoading(false);
            toast.error('Email is required');
            return;
        }
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegEx.test(email)) {
            setOTPButtonLoading(false);
            toast.error('Enter a valid email');
            return;
        }
        const emailData = {
            email: email
        }
        sendOTPAPI(emailData)
            .then((res) => {
                console.log("OTP sent successfully: ", res);
                toast.success(res?.data?.message);
            })
            .catch((err) => {
                console.error("Error occurred while sending OTP: ", err);
                toast.error(err?.response?.data?.message);
            }).finally(() => {
                setOTPButtonLoading(false);
            });
    };

    const AutoAddValues = () => {
        const uniqueEmail = `test${Date.now()}@gmail.com`;
        setFname('Tester');
        setLname('User');
        setEmail(uniqueEmail);
        setPassword('123456');
    }




    // const googleAuth = () => {
    //     window.open(
    //         `${APIURL}/auth/google/callback`,
    //         "_self"
    //     )
    // }

    const validate = () => {
        if (!fname.trim()) {
            toast.error('First name is required');
            return false;
        }

        if (!lname.trim()) {
            toast.error('Last name is required');
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            toast.error('Email is required');
            return false;
        } else if (!emailPattern.test(email)) {
            toast.error('Email is not valid');
            return false;
        }

        if (!OTP.trim()) {
            toast.error('OTP is required');
            return false;
        }

        if (!password.trim()) {

            toast.error('Password is required');
            return false;
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        if (!confirmPassword.trim()) {
            toast.error('Confirm password is required');
            return false;
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    }

    const handleSubmitForm = ((e) => {
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
            confirm_password: confirmPassword
        }

        dispatch(signUpAction(signUpData))
            .then((res) => {
                if (res?.success) {
                    navigate('/admin');
                } else {
                    toast.error(res?.message);
                }
                console.log(res);
            })
            .catch((err) => {
                console.log("Catch block response : ", err?.message);
                toast.error(err?.message);
                console.error(err);
            })
            .finally(() => {
                setButtonLoading(false);
            });
    });



    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            <Toaster />
            <div className="md:w-2/5 w-full p-8 mt-4 flex flex-col justify-center overflow-y-auto bg-white rounded-l-lg shadow-2xl">
                <div className="flex flex-col items-center justify-center mt-4">
                    <h1 className="text-4xl font-bold mb-4 text-center text-themeRed">
                        Join the <span className="text-themeDarkRed">College-ERP</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">Create your account and start your journey!</p>
                </div>
                <form onSubmit={handleSubmitForm}>
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className='font-bold text-lg'>First Name</label>
                                <input
                                    type="text"
                                    value={fname}
                                    className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed"
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className='font-bold text-lg'>Last Name</label>
                                <input
                                    type="text"
                                    value={lname}
                                    className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed"
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="font-bold text-lg">Email ID / Mobile Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={email}
                                    className="w-full mt-2 p-4 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p
                                    className="absolute mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-themeRed text-white text-center font-medium px-4 rounded hover:bg-white hover:text-themeRed cursor-pointer"
                                    onClick={handleSendOTP}
                                    disabled={otpbuttonLoading}
                                    style={{ pointerEvents: otpbuttonLoading ? 'none' : 'auto' }}
                                >
                                    {
                                        !otpbuttonLoading ?
                                            'Send OTP' :
                                            <p className='px-4 py-1 mt-1'>
                                                <ClipLoader
                                                    color={'#FFFFFF'}
                                                    loading={otpbuttonLoading}
                                                    size={20}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                            </p>
                                    }
                                </p>
                            </div>
                        </div>

                        {showOTPLabel && (
                            <div>
                                <label className='font-bold text-lg'>OTP</label>
                                <OtpInput length={6} onChange={handleOtpChange} />
                            </div>
                        )}
                        <div className="relative">
                            <label className='font-bold text-lg'>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                className="absolute inset-y-0 mt-5 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={'20'} /> : <FaEye size={'20'} />}
                            </div>
                        </div>
                        <div className="relative">
                            <label className='font-bold text-lg'>Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                className="w-full mt-2 p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-themeRed pr-10"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div
                                className="absolute inset-y-0 mt-5 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={'20'} /> : <FaEye size={'20'} />}
                            </div>
                        </div>
                        <button
                            className="w-full py-5 mb-4 bg-themeRed text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-700 hover:bg-themeDarkRed transition-all duration-300 hover:rounded-full"
                            style={{ cursor: buttonLoading ? 'not-allowed' : 'pointer' }}
                            type='submit'
                            disabled={buttonLoading}
                        >
                            {!buttonLoading ? 'Sign Up' : (
                                <ClipLoader
                                    color={'#FFFFFF'}
                                    loading={buttonLoading}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            )}
                        </button>
                        <div className="text-center">
                            <span>Already have an account?
                                <a href="/login" className="text-themeRed ml-2 font-medium hover:cursor-pointer hover:underline">
                                    Sign In
                                </a>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex md:w-3/5 w-full items-center justify-center overflow-y-auto bg-themeDarkRed rounded-r-lg">
                <img
                    alt="sign-up image"
                    src={signUpImage}
                    className="object-cover w-4/5 h-full rounded-r-lg"
                />
            </div>
        </div>
    );
};

export default SignUp;
