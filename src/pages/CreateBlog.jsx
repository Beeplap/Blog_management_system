import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  // Initial blog details
  const initialValues = {
    blogtitle: "",
    yourContent: "",
    featureImage: null,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    blogtitle: Yup.string().required("Blog Title is required"),
    yourContent: Yup.string()
      .required("Content is required")
      .min(6, "Must be at least 6 characters"),
    featureImage: Yup.mixed()
      .required("Feature Image is required")
      .test("fileSize", "Image must be less than 10MB", (value) => {
        return value && value.size <= 10 * 1024 * 1024; // 10MB in bytes
      }),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form Values:", values);
    resetForm(); // Reset form after submission
    navigate("/dashboard"); // Redirect to homepage
  };

  const navitems = [
    { title: "Home", icon: "🏠", path: "/dashboard" },
    { title: "Create", icon: "✍️", path: "/createblogs" },
    { title: "My Blogs", icon: "📚", path: "/myblogs" },
  ];

  const formitems = [
    {
      type: "text",
      name: "blogtitle",
      label: "Blog Title",
    },
    {
      type: "text",
      name: "yourContent",
      label: "Your Content",
    },
    {
      type: "file",
      name: "featureImage",
      label: "Feature Image",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-teal-500 text-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xl sm:text-2xl font-bold">
          <span className="text-yellow-400">Blog</span>Verse
        </div>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {navitems.map((item, index) => (
            <li key={index} className="w-full sm:w-auto">
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 w-full ${
                  window.location.pathname === item.path
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
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <span className="text-base sm:text-lg">Alu</span>
          <button className="bg-white text-teal-500 px-4 py-2 rounded hover:bg-gray-200 w-full sm:w-auto">
            Logout
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center py-6 sm:py-10 px-4 sm:px-6">
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 sm:p-8 w-full max-w-full sm:max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-teal-600 mb-4 sm:mb-6">
            Create a New Blog
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4 sm:space-y-6">
              {formitems.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <label
                    className="text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base"
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
                      onChange={(event) => {
                        setFieldValue(
                          item.name,
                          event.currentTarget.files[0]
                        );
                      }}
                      className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  ) : (
                    <Field
                      id={item.name}
                      name={item.name}
                      type={item.type}
                      as={item.name === "yourContent" ? "textarea" : "input"}
                      className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder={item.label}
                      rows={item.name === "yourContent" ? 5 : undefined}
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
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all duration-200 text-base sm:text-lg"
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