import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl mb-8">
          We are a team dedicated to providing the best service possible.
        </p>
        <button className="px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-gray-200 transition duration-300">
          Learn More
        </button>
      </div>
    </>
  );
};

export default AboutUs;
