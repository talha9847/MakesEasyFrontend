import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 right-0 left-0 z-50">
      {/* Main navbar container */}
      <div className="flex justify-between items-center w-full">
        {/* Logo section */}
        <div className="logo flex justify-center items-center gap-2 p-3">
          <img
            className="hover:scale-125 transition-transform duration-100 hover:cursor-pointer"
            src={logo}
            alt="Logo"
          />
          <span className="text-xl sm:text-2xl hover:cursor-pointer hover:scale-110 transition-transform duration-200 hover:ml-1 hover:font-bold">
            Makes Easy
          </span>
        </div>

        {/* Desktop navigation - hidden on mobile/tablet */}
        <ul className="hidden lg:flex gap-5 pr-8 text-lg">
          <Link
            to="/"
            className="hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 px-2"
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 px-2"
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 px-2"
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 px-2"
          >
            Log In
          </Link>
          <Link
            to="/signone"
            className="hover:text-xl cursor-pointer hover:font-bold transition-all duration-200 px-2"
          >
            Sign Up
          </Link>
        </ul>

        {/* Hamburger menu button - visible on mobile/tablet */}
        <button
          className="lg:hidden p-3 hover:bg-gray-800 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <div
              className={`w-6 h-0.5  bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all bg-opacity-0 absolute w-full duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col bg-black">
          <Link
            to="/"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200  last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200  last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200  last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200  last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/signone"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;