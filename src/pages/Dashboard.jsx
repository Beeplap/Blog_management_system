import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";
import { FaUserEdit } from "react-icons/fa";

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
    {
      title: "Home",
      icon: <IoIosHome />,
      path: "/dashboard",
    },
    {
      title: "Create",
      icon: <IoCreateOutline />,
      path: "/createblogs",
    },
    {
      title: "My Blogs",
      icon: <GoBook />,
      path: "/myblogs",
    },
  ];

  const sanitizeHTML = (html) => html.replace(/<[^>]+>/g, "");

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold">
          <span className="text-yellow-400">Blog</span>Verse
        </div>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {navitems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-teal-700 shadow-md"
                    : "hover:bg-teal-600 hover:shadow-md"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-end items-center space-x-2 md:space-x-4 w-full md:w-auto">
          <Link
            className=" flex items-center gap-2 bg-transparent text-white border border-transparent  px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:border-white hover:shadow-md transition-all duration-200 text-sm sm:text-base"
            to={"/profile"}
          >
            <FaUserEdit />
            {user?.name || "Guest"}
          </Link>
          <Link
            to={"/"}
            className="bg-white text-teal-500 px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-sm sm:text-base"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-around gap-4 mx-2 sm:mx-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
          Discover Blog Posts
        </h2>
        <input
          type="text"
          placeholder="Search blogs by title..."
          className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-1/2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       
      </div>  

      {/* Blog List */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4 items-stretch">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link
              to={`/singleblogs/${blog._id}`}
              key={blog._id}
              className="bg-white w-full sm:w-[48%] lg:w-[31%] p-4 rounded-xl shadow-md hover:scale-101 hover:drop-shadow-2xl transition-all duration-300 flex flex-col h-[320px] sm:h-[360px] md:h-[400px] relative group"
            >
              <div className="relative mb-3">
                <img
                  src={blog.image || "/default-image.jpg"}
                  alt={blog.title}
                  className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>

              <div className="flex flex-col flex-1">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors duration-300 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  By <span className="font-medium">{blog.author.name}</span>
                </p>
                <p className="text-gray-700 text-sm line-clamp-3 overflow-hidden mb-3">
                  {sanitizeHTML(blog.content)}
                </p>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Created at: {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  {/* Show delete button only if token exists */}
                  {localStorage.getItem("token") && user?._id === blog.author._id && (
                    <button
                      className="bg-white bg-opacity-80 hover:bg-red-100 rounded-full p-2 text-xl shadow transition-colors"
                      title="Delete Blog"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(
                            "Are you sure you want to delete this blog?"
                          )
                        ) {
                          axios
                            .delete(
                              `https://blog-hqx2.onrender.com/blog/${blog._id}`
                            )
                            .then(() => {
                              setBlogs((prev) =>
                                prev.filter((b) => b._id !== blog._id)
                              );
                            });
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
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
