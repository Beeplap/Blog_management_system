import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          Welcome to the Blog Management System
        </h1>
        <p className="text-gray-700 mb-6">
          This is your dashboard where you can view your data and manage your
          account.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700">Profile</h2>
            <p className="text-gray-600">
              Manage your personal information and settings.
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700">Analytics</h2>
            <p className="text-gray-600">
              View your data and performance metrics.
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700">Settings</h2>
            <p className="text-gray-600">
              Customize your preferences and account options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
