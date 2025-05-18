import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import { MdDelete } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

const MyBlog = () => {
  const [myBlog, setMyBlog] = useState([]);
  const { user } = useContext(Authcontext);
  

  const fetchData = async () => {
    if (user) {
      const response = await axios.get(
        `https://blog-hqx2.onrender.com/blog/${user?._id}`
      );
      setMyBlog(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?._id]);

  const deleteBlogs = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await axios.delete(
        `https://blog-hqx2.onrender.com/blog/${id}`
      );
      if (response.status === 200) {
        setMyBlog((prev) => prev.filter((b) => b._id !== id));
        alert("Blog deleted successfully");
      }
    }
  };
    const navitems = [
      { title: "Home", icon: <IoIosHome />, path: "/dashboard" },
      { title: "Create", icon: <IoCreateOutline />, path: "/createblogs" },
      { title: "My Blogs", icon: <GoBook />, path: "/myblogs" },
    ];
  const sanitizeHTML = (html) => html.replace(/<[^>]+>/g, "");


  return (
    
    

    <section className="min-h-screen bg-gray-100 ">
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
      <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-10 text-center tracking-tight drop-shadow">
        My Blogs
      </h1>
     <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4 items-stretch">
         {myBlog?.length > 0 ? (
          myBlog.map((blog) => (
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
                    Created at: {new Date(blog.createdAt).toLocaleDateString()}{" "}
                    {new Date(blog.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                   {/* Delete button (visible for all users) */}
                <button
                  className=" bg-white bg-opacity-80 hover:bg-red-100 rounded-full p-2 text-xl shadow transition-colors cursor-pointer"
                  title="Delete Blog"
                  onClick= {(e) => {
                    e.preventDefault();
                    
                    deleteBlogs(blog._id);
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
    </section>
  );
};

export default MyBlog;
