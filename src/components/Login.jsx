import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { Turtle } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [talukaModal, setTalukaModal] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [idMap, setIdMap] = useState({});

  const onSubmit = async (data) => {
    var form = new FormData();
    form.append("identifier", data.identifier);
    form.append("password", data.password);
    localStorage.clear();
    try {
      const result = await axios.post(
        "http://localhost:5169/api/User/Login",
        form,
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        localStorage.setItem("token", result.data.token);
        if (result.data.role == "Admin1") {
          let form = new FormData();
          form.append("tempToken", localStorage.getItem("token"));
          form.append("role", "Admin1");
          const result = await axios.post(
            "http://localhost:5169/api/User/SetScope",
            form,
            {
              withCredentials: true,
            }
          );
          if (result.status == 200) {
            window.location.href = "admin/dashboard";
          }
        } else if (result.data.role == "Admin2") {
          setAvailableRoles(["Village Admin", "Taluka Admin"]);
          setTalukaModal(true);
        } else if (result.data.role == "Admin3") {
          setAvailableRoles([
            "Village Admin",
            "Taluka Admin",
            "District Admin",
          ]);
          setTalukaModal(true);
        }
      } else {
        return;
      }
    } catch (error) {
      console.error("error here ", error);
    }
  };

  const roleFunction = async (role) => {
    try {
      let form = new FormData();
      form.append("tempToken", localStorage.getItem("token"));
      if (role == "Village Admin") {
        form.append("role", "Admin1");
        const result = await axios.post(
          "http://localhost:5169/api/User/SetScope",
          form,
          {
            withCredentials: true,
          }
        );

        if(result.status==200){
          window.location.href="admin/dashboard"
        }
      }
      if (role == "Taluka Admin") {
        form.append("role", "Admin2");
        const result = await axios.post(
          "http://localhost:5169/api/User/SetScope",
          form,
          {
            withCredentials: true,
          }
        );
        if (result.status == 200) {
          window.location.href = "admin/dashboard";
        }
      } else if (role == "District Admin") {
        form.append("role", "Admin3");
        const result = await axios.post(
          "http://localhost:5169/api/User/SetScope",
          form,
          {
            withCredentials: true,
          }
        );

        if (result.status == 200) {
          window.location.href = "admin/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      <div className="bg-gray-100 min-h-[88.5vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email/Mobile Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email, Mobile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  {...register("identifier", {
                    required: "Email is required",
                  })}
                  type="text"
                  placeholder="Enter your email or mobile"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                />
              </div>
              <p className="text-red-500 text-sm">
                {errors.identifier?.message}
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgotpassword"
                  className="text-sm text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          {/* <div className="relative flex items-center justify-center mt-8 mb-6">
            <div className="border-t border-gray-300 w-full"></div>
            <div className="bg-white px-4 text-sm text-gray-500">OR</div>
            <div className="border-t border-gray-300 w-full"></div>
          </div> */}

          {/* Social Login Buttons */}
          {/* <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9 21.59 18.03 20.37 19.6 18.57C21.16 16.76 22.04 14.47 22.04 12.06C22.04 6.53 17.54 2.04 12 2.04Z" />
              </svg>
              Facebook
            </button>
          </div> */}

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {talukaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Login As
            </h2>

            <div className="flex items-center justify-center flex-col gap-3">
              {availableRoles.map((c, index) => (
                <button
                  key={index}
                  onClick={() => {
                    roleFunction(c);
                  }}
                  className="bg-black text-white px-3 rounded-md"
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTalukaModal(false)}
              className="mt-5 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
