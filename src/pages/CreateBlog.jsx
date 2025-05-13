import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import axios from "axios";
import { Authcontext } from "../context/Authcontext";

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(Authcontext);
  const [image, setImage] = useState(null);

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Initial form values
  const initialValues = {
    title: "",
    content: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Blog Title is required"),
    content: Yup.string()
      .required("Content is required")
      .min(6, "Must be at least 6 characters"),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    if (!image) {
      alert("Please upload an image");
      return;
    }
    if (!user?._id) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", image);
    formData.append("author", user._id);

    try {
      const response = await axios.post(
        "https://blog-hqx2.onrender.com/blog/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Blog created:", response.data);
      resetForm();
      navigate("/Blog_management_system/dashboard");
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      alert("Failed to create blog: " + (error.response?.data?.message || error.message));
    }
  };

  const navitems = [
    { title: "Home", icon: <IoIosHome />, path: "/Blog_management_system/dashboard" },
    { title: "Create", icon: <IoCreateOutline />, path: "/Blog_management_system/createblogs" },
    { title: "My Blogs", icon: <GoBook />, path: "/Blog_management_system/myblogs" },
  ];

  const formitems = [
    {
      type: "text",
      name: "title",
      label: "Blog Title",
    },
    {
      type: "text",
      name: "content",
      label: "Blog Content",
    },
    {
      type: "file",
      name: "image",
      label: "Blog Image",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 flex-nowrap">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold">
          <span className="text-yellow-400">Blog</span>Verse
        </div>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {navitems.map((item, index) => (
            <li key={index} className="w-full md:w-auto">
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 w-full group ${
                  location.pathname === item.path
                    ? "bg-teal-700 shadow-md"
                    : "hover:bg-teal-600 hover:shadow-md hover:scale-105"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
          <span className="text-base sm:text-lg md:text-xl">{user?.name || "Guest"}</span>
          <button className="bg-white text-teal-500 px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-sm sm:text-base w-full md:w-auto">
            Logout
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center py-6 sm:py-10 px-2 sm:px-4 mx-2 sm:mx-4">
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-200">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-4 sm:mb-6">
            Create a New Blog
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4 sm:space-y-6">
                {formitems.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <label
                      className="text-gray-700 font-medium mb-1 sm:mb-2 text-base sm:text-lg md:text-xl"
                      htmlFor={item.name}
                    >
                      {item.label}
                    </label>
                    {item.type === "file" ? (
                      <input
                        id={item.name}
                        name={item.name}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500 hover:ring-2 hover:ring-teal-500/50 transition-all duration-200"
                      />
                    ) : (
                      <Field
                        id={item.name}
                        name={item.name}
                        type={item.type}
                        as={item.name === "content" ? "textarea" : "input"}
                        className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500 hover:ring-2 hover:ring-teal-500/50 transition-all duration-200"
                        placeholder={item.label}
                        rows={item.name === "content" ? 5 : undefined}
                      />
                    )}
                    <ErrorMessage
                      name={item.name}
                      component="div"
                      className="text-red-500 text-xs sm:text-sm mt-1"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 sm:py-3 rounded-lg hover:bg-teal-600 hover:shadow-md hover:scale-105 transition-all duration-200 text-base sm:text-lg md:text-xl"
                >
                  Publish Blog
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;