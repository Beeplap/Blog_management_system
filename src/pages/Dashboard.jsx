import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
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
      <div className="bg-teal-500 text-white shadow-md p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 flex-nowrap">
        <div className="text-xl sm:text-2xl font-bold">
          <span className="text-yellow-400">Blog</span>Verse
        </div>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {navitems.map((item, index) => (
            <li key={index} className="w-full md:w-auto">
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 w-full ${
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
        <div className="flex items-center justify-end space-x-2 md:space-x-4 w-full md:w-auto">
          <span className="text-base sm:text-lg">{user?.name || "Guest"}</span>
          <button className="bg-white text-teal-500 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-200 text-sm sm:text-base md:w-auto">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 mx-2 sm:mx-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
          Discover Blog Posts
        </h2>
        <input
          type="text"
          placeholder="Search blogs by title, content, or author..."
          className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-1/2 text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/createblogs"
          className="bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600 w-full sm:w-auto text-center text-sm sm:text-base"
        >
          + Create New Blog
        </Link>
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link
              to={`/singleblogs/${blog._id}`}
              key={blog._id}
              className="bg-white w-full sm:w-[48%] lg:w-[31%] p-3 sm:p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1">
                {blog.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                By <span className="font-medium">{blog.author.name}</span>
              </p>
              <img
                src={blog.image || "/default-image.jpg"}
                onError={(e) => (e.target.src = "/default-image.jpg")}
                alt={blog.title}
                className="w-full h-36 sm:h-40 md:h-48 object-cover rounded mb-2 sm:mb-3"
              />
              <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base line-clamp-3">
                {blog.content}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-auto">
                Created at: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full text-sm sm:text-base">
            No blogs available.
          </p>
        )}
      </div>

      {/* Child Routes */}
      <div className="p-2 sm:p-4">
        <Outlet context={{ blogs }} />
      </div>
    </section>
  );
};

export default Dashboard;