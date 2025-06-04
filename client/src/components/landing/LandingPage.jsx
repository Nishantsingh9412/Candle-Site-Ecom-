import React from "react";
import Carousel from "./components/Carousel";
import TopProducts from "./components/TopProducts";
import PressSection from "./components/PressSection";

const LandingPage = () => {
  return (
    <div>
      <Carousel />
      <TopProducts />
      <PressSection />
      {/* Testing Section */}
      {/* Niana */}
      {/* <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Niana</h1>
        <p className="text-xl mb-8">Your one-stop solution for all your needs</p>
        <button className="px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </div>     */}
    </div>
  );
};

export default LandingPage;
