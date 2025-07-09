import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import { useAsyncError } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Check if all required fields are filled
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

    try {
      const result = await axios.post(
        "http://localhost:5169/api/User/Register",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("lhlloo")

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

        // ✅ Clear the form here after success
        reset({
          FirstName: "",
          LastName: "",
          Email: "",
          Mobile: "",
          password: "",
        });

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

  const password = watch("password"); // Watch password field

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
      <div className="flex items-center justify-center bg-gray-100 text-black mt-20">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                First Name
              </label>
              <input
                {...register("FirstName", {
                  required: "First name is required",
                })}
                type="text"
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="John"
              />
              <p className="text-red-500 text-xs pl-1">
                {errors.FirstName?.message}
              </p>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Last Name
              </label>
              <input
                {...register("LastName", { required: "Last name is required" })}
                type="text"
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="Doe"
              />
              <p className="text-red-500 text-xs pl-1">
                {errors.LastName?.message}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email Format",
                  },
                })}
                type="email"
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="talha@gmail.com"
              />
              <p className="text-red-500 text-xs pl-1">
                {errors.Email?.message}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Mobile</label>
              <input
                {...register("Mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Mobile number is not valid",
                  },
                })}
                type="text"
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="9106704675"
              />
              <p className="text-red-500 text-xs">{errors.Mobile?.message}</p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                Country
              </label>
              <select
                {...register("countryId", {
                  required: "Please select country",
                })}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  clearErrors("countryId"); // Clear error message when country is selected
                }}
              >
                <option value="">Select Country</option>
                {countries.map((country) => {
                  return (
                    <option key={country.countryId} value={country.countryId}>
                      {country.countryName}
                    </option>
                  );
                })}
              </select>
              <p className="text-red-500 text-xs pl-1">
                {errors.countryId?.message}
              </p>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold mb-1">State</label>
              <select
                {...register("stateId", { required: "Please select state" })}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  clearErrors("stateId");
                }}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs pl-1">
                {errors.stateId?.message}
              </p>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                District
              </label>
              <select
                {...register("distId", { required: "Please select district" })}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
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
              <p className="text-red-500 text-xs pl-1">
                {errors.distId?.message}
              </p>
            </div>

            {/* Taluka */}
            <div>
              <label className="block text-xs font-semibold mb-1">Taluka</label>
              <select
                {...register("talukaId", { required: "Please select taluka" })}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
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
              <p className="text-red-500 text-xs pl-1">
                {errors.talukaId?.message}
              </p>
            </div>

            {/* Village */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold mb-1">
                Village
              </label>
              <select
                {...register("villageId", {
                  required: "Please select village",
                })}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                value={selectedVillage}
                onChange={(e) => {
                  setSelectedVillage(e.target.value);
                  clearErrors("villageId");
                }}
              >
                <option value="">Select Village</option>
                {villages.map((village) => (
                  <option key={village.villageId} value={village.villageId}>
                    {village.villageName}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs pl-1">
                {errors.villageId?.message}
              </p>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-semibold mb-1">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character long",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 pt-[6px]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <p className="text-red-500 text-xs pl-1">
                {errors.password?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-xs font-semibold mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showCnfPassword ? "text" : "password"}
                className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                placeholder="********"
              />
              <button
                onClick={() => setShowCnfPassword(!showCnfPassword)}
                className="absolute right-3 pt-[6px]"
              >
                {showCnfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              <p className="text-xs text-red-500 pl-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-3">
              <button className="w-full px-4 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 focus:ring-2 focus:ring-black transition">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
