import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import { MdDelete } from "react-icons/md";

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

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-10 px-2 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-10 text-center tracking-tight drop-shadow">
        My Blogs
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {myBlog?.length > 0 ? (
          myBlog.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 h-[430px] border border-gray-100 relative group"
            >
              <img
                src={blog.image || "/default-image.jpg"}
                alt={blog.title}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 border border-gray-200 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 truncate">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3 flex-1">
                {blog.content}
              </p>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xs text-gray-500">
                  Created: {new Date(blog.createdAt).toLocaleDateString()}{" "}
                  {new Date(blog.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors text-2xl p-1 rounded-full hover:bg-red-100"
                  title="Delete Blog"
                  onClick={() => deleteBlogs(blog?._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No blogs found.
          </p>
        )}
      </div>
    </section>
  );
};

export default MyBlog;
