import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-orange-400 rounded-full opacity-20 animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-red-400 rounded-full opacity-20 animate-ping delay-1000"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-pink-400 rounded-full opacity-15 animate-bounce delay-300"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Candle SVG Icon */}

        {/* 404 Text with enhanced glow effect */}
        <div className="mb-6 relative">
          <div className="relative z-10">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 filter drop-shadow-2xl">
              404
            </h1>
          </div>
          <div className="absolute inset-0 z-0">
            <h1 className="text-8xl md:text-9xl font-bold text-yellow-400 blur-xl opacity-30 animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* Main heading with subtle animation */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-wide animate-fade-in">
          Page Not Found
        </h2>

        {/* Description with better typography */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-md mx-auto">
          The candle you're looking for seems to have
          <span className="text-orange-400 font-medium animate-pulse">
            {" "}
            burned out
          </span>
          . Don't worry, we'll help you find your way back.
        </p>

        {/* Enhanced decorative elements */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
        </div>

        {/* Enhanced CTA Button */}
        <p
          onClick={() => navigate("/")}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 hover:from-yellow-400 hover:to-orange-400 group border border-orange-400/20 backdrop-blur-sm cursor-pointer"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:animate-pulse transition-transform group-hover:-translate-x-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11a2 2 0 010-2.828L6.293 4.465a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Light your way back home
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </p>

        {/* Subtle bottom accent */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default NotFound;
