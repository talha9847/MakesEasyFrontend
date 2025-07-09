import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useAsyncError } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignOne = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (
      !data.FirstName ||
      !data.LastName ||
      !data.Email ||
      !data.Mobile ||
      !data.password
    ) {
      console.error("Required fields are missing.");
      return;
    }

    // Check if email is verified
    if (!isEmailVerified) {
      toast.error("Please verify your email address before submitting");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5169/api/User/Register",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("lhlloo");

      if (result.status === 200) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        reset({
          FirstName: "",
          LastName: "",
          Email: "",
          Mobile: "",
          password: "",
        });

        // Reset email verification states
        setIsEmailVerified(false);
        setShowOtpInput(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else if (result.status == 356) {
        toast.warning("Email or Mobile number already exists");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const password = watch("password");
  const email = watch("Email");

  // Email verification function
  const handleEmailVerification = async () => {
    console.log(email);
    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.error("Please enter a valid email address first");
      return;
    }

    setIsVerifyingEmail(true);
    try {
      // Replace with your actual email verification API endpoint
      const result = await axios.post(
        `http://localhost:5169/api/User/GenerateOtp/${email}`
      );

      if (result.status === 200) {
        setShowOtpInput(true);
        toast.success("OTP sent to your email!");
      }
      if (result.status == 306) {
        toast.error("This is email is already Exist");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 306) {
        toast.error("This email already exists.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
      console.error("Email verification failed:", error);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleOtpVerification = async (otpValue) => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const result = await axios.post(
        `http://localhost:5169/api/User/VerifyOTP/${email}/${otpValue}`
      );

      if (result.status === 200) {
        setIsEmailVerified(true);
        setShowOtpInput(false);
        toast.success("Email verified successfully!");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5169/Location/GetCountries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countryModel);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`http://localhost:5169/Location/GetStates/${selectedCountry}`)
        .then((res) => res.json())
        .then((data) => {
          setStates(data.stateModel);
        })
        .catch((error) => {
          console.error("Error fetching states: ", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(`http://localhost:5169/Location/GetDistricts/${selectedState}`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.distModel);
        });
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`http://localhost:5169/Location/GetTalukas/${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => {
          setTalukas(data.talukaModel);
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedTaluka) {
      fetch(`http://localhost:5169/Location/GetVillages/${selectedTaluka}`)
        .then((res) => res.json())
        .then((data) => {
          setVillages(data.villageModel);
        });
    }
  }, [selectedTaluka]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6 mt-4 mb-4 sm:mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Compact Header */}
            <div className="bg-black px-4 py-4 sm:px-6 sm:py-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                Create Account
              </h2>
              <p className="text-gray-300 text-center mt-1 text-xs sm:text-sm">
                Join us today and get started
              </p>
            </div>

            {/* Compact Form */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Personal Info - Compact */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("FirstName", {
                          required: "First name is required",
                        })}
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        placeholder="First name"
                      />
                      {errors.FirstName && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.FirstName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("LastName", {
                          required: "Last name is required",
                        })}
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Last name"
                      />
                      {errors.LastName && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.LastName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info - Compact */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                        {isEmailVerified && (
                          <span className="text-green-600 ml-1">
                            ✓ Verified
                          </span>
                        )}
                      </label>
                      <div className="flex gap-2">
                        <input
                          {...register("Email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid Email Format",
                            },
                          })}
                          type="email"
                          className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Email address"
                          disabled={isEmailVerified}
                        />
                        {!isEmailVerified && (
                          <button
                            type="button"
                            onClick={handleEmailVerification}
                            disabled={isVerifyingEmail}
                            className="px-3 py-0 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                          >
                            {isVerifyingEmail ? "Sending..." : "Verify"}
                          </button>
                        )}
                      </div>
                      {errors.Email && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.Email?.message}
                        </p>
                      )}
                    </div>

                    {/* OTP Input - Shows only when email verification is initiated */}
                    {showOtpInput && !isEmailVerified && (
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            {...register("otp", {
                              required: showOtpInput
                                ? "OTP is required"
                                : false,
                              pattern: {
                                value: /^\d{6}$/,
                                message: "OTP must be 6 digits",
                              },
                            })}
                            type="text"
                            maxLength="6"
                            className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                            placeholder="Enter 6-digit OTP"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const otpValue = watch("otp");
                              handleOtpVerification(otpValue);
                            }}
                            disabled={isVerifyingOtp}
                            className="px-3 py-2 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                          >
                            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                          </button>
                        </div>
                        {errors.otp && (
                          <p className="text-red-500 text-xs mt-0.5">
                            {errors.otp?.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Check your email for the 6-digit verification code
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("Mobile", {
                          required: "Mobile is required",
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Mobile number is not valid",
                          },
                        })}
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        placeholder="10-digit mobile"
                      />
                      {errors.Mobile && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.Mobile?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Info - More Compact Grid */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
                    Location Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("countryId", {
                          required: "Please select country",
                        })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          clearErrors("countryId");
                        }}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option
                            key={country.countryId}
                            value={country.countryId}
                          >
                            {country.countryName}
                          </option>
                        ))}
                      </select>
                      {errors.countryId && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.countryId?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("stateId", {
                          required: "Please select state",
                        })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          clearErrors("stateId");
                        }}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.stateId} value={state.stateId}>
                            {state.stateName}
                          </option>
                        ))}
                      </select>
                      {errors.stateId && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.stateId?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        District <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("distId", {
                          required: "Please select district",
                        })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        value={selectedDistrict}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          clearErrors("distId");
                        }}
                      >
                        <option value="">Select District</option>
                        {districts.map((dist) => (
                          <option key={dist.distId} value={dist.distId}>
                            {dist.distName}
                          </option>
                        ))}
                      </select>
                      {errors.distId && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.distId?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Taluka <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("talukaId", {
                          required: "Please select taluka",
                        })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        value={selectedTaluka}
                        onChange={(e) => {
                          setSelectedTaluka(e.target.value);
                          clearErrors("talukaId");
                        }}
                      >
                        <option value="">Select Taluka</option>
                        {talukas.map((taluka) => (
                          <option key={taluka.talukaId} value={taluka.talukaId}>
                            {taluka.talukaName}
                          </option>
                        ))}
                      </select>
                      {errors.talukaId && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.talukaId?.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Village <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("villageId", {
                          required: "Please select village",
                        })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                        value={selectedVillage}
                        onChange={(e) => {
                          setSelectedVillage(e.target.value);
                          clearErrors("villageId");
                        }}
                      >
                        <option value="">Select Village</option>
                        {villages.map((village) => (
                          <option
                            key={village.villageId}
                            value={village.villageId}
                          >
                            {village.villageName}
                          </option>
                        ))}
                      </select>
                      {errors.villageId && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.villageId?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Info - Compact */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
                    Security Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be 6 character long",
                            },
                          })}
                          type={showPassword ? "text" : "password"}
                          className="w-full px-3 py-2 pr-10 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                          type={showCnfPassword ? "text" : "password"}
                          className="w-full px-3 py-2 pr-10 text-sm bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCnfPassword(!showCnfPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCnfPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.confirmPassword?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-medium py-2.5 px-4 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 text-sm"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignOne;
