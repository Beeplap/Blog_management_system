import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import img2 from "../assets/girl.jpeg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://blog-hqx2.onrender.com/user/register",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Signup response:", response.data);
        toast.success("User signed up successfully");
        navigate("/Blog_management_system/login");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        console.error("Signup error:", error);
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl rounded-lg">
        <div
          className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        >
          <div></div>
          <div className="text-white bg-opacity-50 p-4 rounded">
            <p className="text-xl sm:text-2xl lg:text-3xl italic">
              "Empower your journey with intelligent solutions"
            </p>
            <p className="mt-4 text-sm sm:text-base">
              Join us today and take the first step toward managing your Blogs
              efficiently. Sign up now to unlock powerful tools and features
              designed to simplify your life.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r-lg">
          <div className="p-6 sm:p-8 w-full max-w-full sm:max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create your account</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Wick"
                  className="w-full p-2 border rounded-lg"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                ) : null}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
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
                <label className="block text-gray-700">Password</label>
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
                  <p className="text-red-500 text-sm">{formik.errors.password}</p>
                ) : null}
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="w-full p-2 border rounded-lg"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                ) : null}
              </div>
              <ToastContainer />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700"
              >
                Create account
              </button>
              <div className="text-center text-gray-500 my-4">OR</div>
              <button className="w-full border p-3 rounded-lg flex items-center justify-center">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign up with Google
              </button>
              <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
                Have an account?{" "}
                <Link
                  to="/Blog_management_system/login"
                  className="text-purple-600"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Link
        to="/Blog_management_system"
        className="text-blue-600 p-5 underline text-sm sm:text-base"
      >
        Back to landing page
      </Link>
    </div>
  );
};

export default Signup;