import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Blog Management System
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/Blog_management_system/login")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/Blog_management_system/signup")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
