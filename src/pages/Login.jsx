import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import img1 from "../assets/anime.png";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Authcontext } from "../context/Authcontext";
import { useContext } from "react";

const Login = () => {
  const { login } = useContext(Authcontext); // ✅ Correctly use the login function from Authcontext
  const navigate = useNavigate();

  



  const postData = async (values) => {
    try {
      const response = await axios.post(
        "https://blog-hqx2.onrender.com/user/login",
        values
      );

      

      toast.success("User Login Successfully!");

      const { token, user } = response.data;

      console.log("Received Token:", token);
      console.log("Received User:", user);

      // ✅ Call login with received values
      login(token, user);

      // Redirect to the management page after successful login
      navigate("/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Login error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await postData(values);
      resetForm(); // Reset the form after submission
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center justify-center p-10">
      <div className="flex w-full max-w-4xl rounded-lg">
        <div
          className="w-1/2 p-10 flex flex-col justify-between rounded-l-lg"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100%",
          }}
        >
          <div></div>
          <div className="text-white bg-opacity-50 p-4 rounded">
            <p className="text-3xl italic">
              "Step into a world of endless possibilities and inspiration."
            </p>
            <p className="mt-4">John Doe, Visionary and Innovator</p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 shadow-lg w-full max-w-md rounded-r-lg">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back to Blog Manager
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="Blog text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example123@gmail.com"
                  className="w-full p-2 border rounded-lg"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                ) : null}
              </div>
              <div>
                <label className="Blog text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="eg:P@SsW0rD"
                  className="w-full p-2 border rounded-lg"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                ) : null}
                <a href="#" className="text-purple-600 text-sm">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700 ">
                  Remember sign in details
                </label>
              </div>
              <ToastContainer />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-full"
              >
                Log in
              </button>
              <div className="text-center text-gray-500 my-4">OR</div>
              <button className="w-full border p-3 rounded-lg flex items-center justify-center">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
              <p className="text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/Blog_management_system/signup"
                  className="text-purple-600"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Link
        to="/Blog_management_system"
        className="text-blue-600 p-5 ml-150 underline"
      >
        Back to landing page
      </Link>
    </div>
  );
};

export default Login;
