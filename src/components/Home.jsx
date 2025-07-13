import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-6">
            Simplify Your Digital Experience with{" "}
            <span className="text-black underline decoration-4 decoration-gray-800">
              Makes Easy
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The all-in-one platform to store, manage, communicate, and share
            your content with unprecedented simplicity and efficiency.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/signone"
              className="bg-black text-white px-8 py-3 rounded-lg text-xl font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Get Started →
            </Link>
            <Link
              to="/login"
              className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg text-xl font-medium hover:bg-gray-50 transition shadow-lg hover:shadow-xl"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-2">
            Our Powerful Features
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Everything you need to manage your digital content in one seamless
            platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white">
              <div className="bg-black text-white p-4 rounded-full mb-6 group-hover:bg-white group-hover:text-black transition flex items-center justify-center w-16 h-16">
                <span className="text-2xl font-bold">💾</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Intelligent Storage</h3>
              <p className="text-gray-600 group-hover:text-gray-200">
                Advanced data organization with AI-powered search and automatic
                categorization to keep everything at your fingertips.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white">
              <div className="bg-black text-white p-4 rounded-full mb-6 group-hover:bg-white group-hover:text-black transition flex items-center justify-center w-16 h-16">
                <span className="text-2xl font-bold">🔄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Seamless Sharing</h3>
              <p className="text-gray-600 group-hover:text-gray-200">
                Share media and documents with custom permissions, expiring
                links, and real-time collaborative editing tools.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white">
              <div className="bg-black text-white p-4 rounded-full mb-6 group-hover:bg-white group-hover:text-black transition flex items-center justify-center w-16 h-16">
                <span className="text-2xl font-bold">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Communication</h3>
              <p className="text-gray-600 group-hover:text-gray-200">
                Integrated messaging, commenting, and notification systems that
                adapt to your workflow and communication style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial/Stats Section */}
      <div className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Trusted by Thousands of Users
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <p className="text-4xl font-bold">10K+</p>
              <p className="text-gray-300 mt-2">Active Users</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold">5M+</p>
              <p className="text-gray-300 mt-2">Files Stored</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold">99.9%</p>
              <p className="text-gray-300 mt-2">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to simplify your workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of satisfied users who have transformed how they
            manage digital content.
          </p>
          <Link
            to="/signone"
            className="bg-black text-white px-10 py-4 rounded-lg text-xl font-medium hover:bg-gray-800 transition inline-block"
          >
            Join Us Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
