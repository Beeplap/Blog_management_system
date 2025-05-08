import { Link, useNavigate } from "react-router-dom";
import img1 from '../assets/anime.png';
import logo from '../assets/lo.png';


const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/Block_management_system/management");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-10">
      <div className="flex w-full max-w-4xl rounded-lg">
        <div
          className="w-1/2 p-10 flex flex-col justify-between rounded-l-lg  "
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100%",
          }}
          
        >
          <div className="flex gap-2 items-center text-2xl font-bold text-black ">
            {" "}
            <img
              className="  w-5 h-5 "
              src={logo}
              alt=""
            />
            React
          </div>
          <div className="text-white bg-opacity-50 p-4 rounded">
            <p className="text-3xl italic">
              "Empowering teams with the tools they deserve."
            </p>
            <p className="mt-4">
              Zeeke Sulker, Director of Digital Marketing Technology
            </p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center "> 
          <div className="bg-white p-8  shadow-lg w-full max-w-md rounded-r-lg">
            <h2 className="text-3xl font-bold mb-2">Welcome back to React</h2>
            <p className="text-gray-600 mb-6">
              Build your design system effortlessly with our powerful component
              library.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue="example123@gmail.com"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  defaultValue="password"
                  className="w-full p-2 border rounded-lg"
                />
                <a href="#" className="text-purple-600 text-sm">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">
                  Remember sign in details
                </label>
              </div>
              <button
                onClick={handleLogin}
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
                <Link to="/Block_management_system/signup" className="text-purple-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
