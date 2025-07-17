import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 right-0 left-0 z-50">
      {/* Main navbar container */}
      <div className="flex justify-between items-center w-full">
        {/* Logo section */}
        <div className="logo  flex justify-center items-center gap-2 p-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"     className="cursor-pointer hover:scale-125 transition-transform duration-200">
            {/* Simple bulb glass */}
            <path 
              d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
              className="hover:stroke-yellow-400 hover:fill-opacity-20 transition-all duration-300"
            />
            
            {/* Bulb base */}
            <path 
              d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" 
              stroke="white" 
              strokeWidth="1.5"
              className="hover:stroke-yellow-500 transition-colors duration-300"
            />
            
            {/* Bulb screw threads */}
            <path 
              d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" 
              stroke="white" 
              strokeWidth="1.5"
              className="hover:stroke-yellow-500 transition-colors duration-300"
            />
            
            {/* Simple filament */}
            <path 
              d="M8.5 9.5L10.5 12L13.5 12L15.5 9.5M10.5 12L10.5 16M13.5 12L13.5 16" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              className="hover:stroke-orange-400 transition-colors duration-300"
            />
          </svg>
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
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
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
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200 last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200 last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contactus"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200 last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="block py-3 px-4 text-base hover:bg-gray-800 transition-colors duration-200 last:border-b-0"
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