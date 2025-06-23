import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Candle and Gift Icon */}
        <div className="mb-8 flex justify-center space-x-4">
          {/* Candle */}
          <div className="relative">
            <div className="w-6 h-12 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-orange-600"></div>
          </div>
          
          {/* Gift Box */}
          <div className="relative">
            <div className="w-12 h-10 bg-gradient-to-b from-pink-200 to-pink-300 rounded-sm"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-red-300"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-10 bg-red-300"></div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-orange-400 mb-4">404</h1>

        {/* Main heading */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          It looks like this gift has been unwrapped already! 
          <br />
          Let's get you back to our collection.
        </p>

        {/* Decorative candles */}
        <div className="flex justify-center space-x-3 mb-8">
          <div className="w-2 h-6 bg-orange-200 rounded-full relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          <div className="w-2 h-8 bg-pink-200 rounded-full relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-300"></div>
          </div>
          <div className="w-2 h-6 bg-red-200 rounded-full relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-500"></div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-300 to-pink-300 text-gray-700 font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-orange-200 hover:to-pink-200 hover:cursor-pointer " 
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11a2 2 0 010-2.828L6.293 4.465a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default NotFound;
