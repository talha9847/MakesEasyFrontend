// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.svg";
// import home from "../assets/home.svg";
// import about from "../assets/about.svg";
// import contact from "../assets/contact.svg";
// import logout from "../assets/logout.svg";

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-black text-white shadow-lg z-50 ">
//       <div className="flex justify-between items-center px-4 py-2">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img
//             className="h-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
//             src={logo}
//             alt="Logo"
//           />
//           <span className="text-2xl text-white font-semibold tracking-wide hover:scale-105 transition-transform duration-300">
//             Makes Easy
//           </span>
//         </div>

//         {/* Nav Links */}
//         <ul className="flex items-center gap-8 text-lg">
//           {[
//             { to: "/admin/dashboard", img: home, text: "Dashboard" },
//             { to: "/admin/users", img: about, text: "Users" },
//             { to: "/contactus", img: contact, text: "Contact" },
//             { to: "/", img: logout, text: "Logout" },
//           ].map((item, index) => (
//             <Link
//               key={index}
//               to={item.to}
//               className="relative flex flex-col items-center group"
//             >
//               {/* Icon */}
//               <img
//                 className="h-6 w-6 transition-transform duration-300 group-hover:scale-125"
//                 src={item.img}
//                 alt={item.text}
//               />
//               {/* Hover Tooltip */}
//               <span className="absolute bottom-[-30px] px-3 py-1 text-xs font-medium rounded-md bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                 {item.text}
//               </span>
//             </Link>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import about from "../assets/about.svg";
import contact from "../assets/contact.svg";
import logout from "../assets/logout.svg";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/User/Logout",
        null,
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/login");

      localStorage.clear();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { to: "/user/dashboard", img: home, text: "Dashboard" },
    { to: "/users/members", img: about, text: "Members" },
    { to: "/user/students", img: contact, text: "Students" },
    { to: "/", img: logout, text: "Logout" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white shadow-lg z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="lg:px-9  px-4">
        <div className="flex justify-between items-center py-3 lg:py-2">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img
              className="h-8 sm:h-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
              src={logo}
              alt="Logo"
            />
            <span className="text-lg sm:text-xl lg:text-2xl text-white font-semibold tracking-wide hover:scale-105 transition-transform duration-300">
              Makes Easy
            </span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-lg">
            {navItems.map((item, index) =>
              item.text == "Logout" ? (
                <li
                  key={index}
                  className="relative flex flex-col items-center group px-2 py-1 cursor-pointer"
                  onClick={handleLogout}
                >
                  <img
                    className="h-6 w-6 transition-transform duration-300 group-hover:scale-125"
                    src={item.img}
                    alt={item.text}
                  />
                  <span className="absolute bottom-[-35px] px-3 py-1 text-xs font-medium rounded-md bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                    {item.text}
                  </span>
                </li>
              ) : (
                <Link
                  key={index}
                  to={item.to}
                  className="relative flex flex-col items-center group px-2 py-1"
                >
                  <img
                    className="h-6 w-6 transition-transform duration-300 group-hover:scale-125"
                    src={item.img}
                    alt={item.text}
                  />
                  <span className="absolute bottom-[-35px] px-3 py-1 text-xs font-medium rounded-md bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                    {item.text}
                  </span>
                </Link>
              )
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none group"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-700">
            <ul className="space-y-1">
              {navItems.map((item, index) =>
                item.text == "Logout" ? (
                  <li
                    key={index}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
                    onClick={handleLogout}
                  >
                    <img className="h-5 w-5" src={item.img} alt={item.text} />
                    <span className="text-base font-medium">{item.text}</span>
                  </li>
                ) : (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
                  >
                    <img className="h-5 w-5" src={item.img} alt={item.text} />
                    <span className="text-base font-medium">{item.text}</span>
                  </Link>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
