import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import img1 from "../assets/anime.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Authcontext } from "../context/Authcontext";
import { useContext } from "react";

const Login = () => {
  const { login } = useContext(Authcontext);
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

      login(token, user);

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
      resetForm();
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl rounded-lg">
        <div
          className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        >
          <div></div>
          <div className="text-white bg-opacity-50 p-4 rounded">
            <p className="text-xl sm:text-2xl lg:text-3xl italic">
              "Step into a world of endless possibilities and inspiration."
            </p>
            <p className="mt-4 text-sm sm:text-base">John Doe, Visionary and Innovator</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r-lg">
          <div className="p-6 sm:p-8 w-full max-w-full sm:max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome back to Blog Manager
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                <a href="#" className="text-purple-600 text-sm block mt-1">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700 text-sm sm:text-base">
                  Remember sign in details
                </label>
              </div>
              <ToastContainer />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700"
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
              <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
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
        to="/"
        className="text-blue-600 p-5 underline text-sm sm:text-base"
      >
        Back to landing page
      </Link>
    </div>
  );
};

export default Login;