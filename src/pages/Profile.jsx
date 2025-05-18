import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Authcontext } from "../context/Authcontext";

const Profile = () => {
  const { user, logout } = useContext(Authcontext);
  const [previewPic, setPreviewPic] = useState(user?.profilePic || null);
  const [showGenderWarning, setShowGenderWarning] = useState(false);
  const [genderOptions, setGenderOptions] = useState([
    { value: "", label: "Select your gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other " },
  ]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^\+?\d{7,15}$/, "Invalid phone number")
      .nullable()
      .notRequired(),
    sex: Yup.string().oneOf(["male", "female", "other"], "Invalid selection"),
  });

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    contact: user.contact || "",
    sex: user.sex || "",
    profilePic: null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contact", values.contact || "");
      formData.append("sex", values.sex || "");
      if (values.profilePic) {
        formData.append("profilePic", values.profilePic);
      }

      const response = await axios.put(
        "https://blog-hqx2.onrender.com/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully!");
      setSubmitting(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => {
            // Handle gender select change with extra logic
            const onGenderChange = (e) => {
              const val = e.target.value;
              if (val === "other") {
                setShowGenderWarning(true);
                // Remove the "other" option from dropdown options
                setGenderOptions((opts) =>
                  opts.filter((opt) => opt.value !== "other")
                );
                // Reset gender selection to empty string
                setFieldValue("sex", "");
              } else {
                setShowGenderWarning(false);
                setFieldValue("sex", val);
              }
            };

            return (
              <Form className="space-y-6">
                {/* Profile Pic Preview and Upload */}
                <div className="flex flex-col items-center">
                  {previewPic ? (
                    <img
                      src={previewPic}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-teal-500"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-6xl font-bold mb-4">
                      {initialValues.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <input
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      setFieldValue("profilePic", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewPic(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                  />
                  <ErrorMessage
                    name="profilePic"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <Field
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="+1234567890"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Sex / Gender */}
                <div className="mb-4">
                  <label
                    htmlFor="sex"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Gender:
                  </label>
                  <Field
                    as="select"
                    id="sex"
                    name="sex"
                    value={values.sex}
                    onChange={onGenderChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {genderOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Field>
                  {showGenderWarning && (
                    <p className="text-sm text-gray-500 mt-1 italic">
                      not buying it — only male or female, thanks
                    </p>
                  )}
                  <ErrorMessage
                    name="sex"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md text-white ${
                      isSubmitting
                        ? "bg-teal-300 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    } transition`}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => logout()}
                    className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
