import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { IoCreateOutline, IoPersonCircleOutline } from "react-icons/io5";
import { IoIosHome, IoIosAddCircleOutline } from "react-icons/io";
import { GoBook } from "react-icons/go";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(Authcontext);
  const location = useLocation();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://blog-hqx2.onrender.com/blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navitems = [
    { title: "Home", icon: <IoIosHome />, path: "/dashboard" },
    { title: "Create", icon: <IoCreateOutline />, path: "/createblogs" },
    { title: "My Blogs", icon: <GoBook />, path: "/myblogs" },
  ];

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-teal-500 text-white shadow-md p-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <span className="text-yellow-400">Blog</span>Verse
        </div>
        <ul className="flex space-x-6">
          {navitems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-teal-700"
                    : "hover:bg-teal-600"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <span className="text-lg">{user?.name || "Guest"}</span>
          <button className="bg-white text-teal-500 px-4 py-2 rounded hover:bg-gray-200">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md p-4 mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">
          Discover Blog Posts
        </h2>
        <input
          type="text"
          placeholder="Search blogs by title, content, or author..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/createblogs"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          + Create New Blog
        </Link>
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white w-full sm:w-[48%] lg:w-[30%] p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                By <span className="font-medium">{blog.author.name}</span>
              </p>
              <img
                src={blog.image || "/default-image.jpg"}
                onError={(e) => (e.target.src = "/default-image.jpg")}
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <p className="text-gray-700 mb-2">{blog.content}</p>
              <p className="text-xs text-gray-500">
                Created at: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No blogs available.
          </p>
        )}
      </div>

      {/* Child Routes */}
      <div className="p-4">
        <Outlet context={{ blogs }} />
      </div>
    </section>
  );
};

export default Dashboard;
