import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    var form = new FormData();
    form.append("email", data.email);

    try {
      const result = await axios.post(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/User/forgotPassword",
        form,
        {
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
            <h2 className="text-3xl font-bold text-gray-800">
              {emailSent ? "Check Your Email" : "Forgot Password?"}
            </h2>
            <p className="text-gray-600 mt-2">
              {emailSent
                ? "We've sent a password reset link to your email address"
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </div>

          {!emailSent ? (
            <>
              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:border-black text-sm"
                    />
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Send Reset Link Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-black hover:underline flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  If an account with that email exists, you'll receive a
                  password reset link shortly.
                </p>
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full px-4 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
                >
                  Try Different Email
                </button>

                <Link
                  to="/login"
                  className="block w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200 text-center"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
