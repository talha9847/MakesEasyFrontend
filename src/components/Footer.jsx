import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-2 sm:py-3 md:py-2 lg:py-1 sticky bottom-0 right-0 left-0 z-10 border-t border-gray-800">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <p className="text-xs sm:text-sm md:text-base lg:text-base font-light tracking-wide">
          &copy; {new Date().getFullYear()} <span className="hover:font-bold"> Makes Easy.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;