import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/girl.mp4"; // Adjust if video name differs

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover object-top z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative text-center z-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
          Welcome to Blog Management System
        </h1>
        <div className="flex flex-col justify-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 text-base sm:text-lg w-full sm:w-auto transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 text-base sm:text-lg w-full sm:w-auto transition-all duration-200"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;