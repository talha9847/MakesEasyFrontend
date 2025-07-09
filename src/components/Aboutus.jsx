import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Talha from "../assets/ImgTalha.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Navbar is already sticky in your original code, just making sure it's preserved */}
      <Navbar />

      {/* Hero Section */}
      <div className=" bg-black text-white py-32 overflow-hidden">
        <div className=" inset-0 opacity-20">
          <div className="inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              About Makes Easy
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl font-light leading-relaxed">
              We are dedicated to providing a platform that simplifies data
              storage, media sharing, and communication for individuals and
              businesses alike. Our innovative solutions empower users to
              achieve more with less effort.
            </p>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="fill-white"
          >
            <path
              fillOpacity="1"
              d="M0,96L80,106.7C160,117,320,139,480,149.3C640,160,800,160,960,138.7C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <div className="">
              <div className="a -top-10 -left-10 w-24 h-24 bg-black opacity-10 rounded-full"></div>
              <div className=" -bottom-10 -right-10 w-32 h-32 bg-black opacity-10 rounded-full"></div>
              <div className=" z-10 bg-white p-10 border-2 border-black rounded-lg shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <div className="w-16 h-1 bg-black mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to create a user-friendly platform where data
                  storage, sharing, and collaboration become effortless,
                  empowering users to achieve more with ease. We believe in
                  making technology accessible to everyone, regardless of their
                  technical expertise.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="">
              <div className=" top-10 right-10 w-24 h-24 bg-black opacity-10 rounded-full"></div>
              <div className=" bottom-10 left-10 w-32 h-32 bg-black opacity-10 rounded-full"></div>
              <div className=" z-10 bg-white p-10 border-2 border-black rounded-lg shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <div className="w-16 h-1 bg-black mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to become a trusted leader in providing seamless
                  and secure solutions for storing, sharing, and managing data
                  in a connected digital world. We aim to revolutionize how
                  people interact with their digital assets, making the process
                  intuitive and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improved Team Section with Round Shapes */}
  

      {/* Core Values Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Our Core Values</h2>
          <div className="w-24 h-1 bg-black mx-auto mt-6 mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do and help us deliver
            exceptional experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Value 1 */}
          <div className="group  bg-white p-8 rounded-lg border-2 border-gray-200 shadow-lg transition-all duration-300 hover:border-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className=" top-0 right-0 -mt-5 -mr-5 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Innovation</h3>
            <div className="w-12 h-1 bg-black mb-6"></div>
            <p className="text-gray-600 leading-relaxed">
              We constantly strive to bring innovative solutions to our users,
              simplifying their experience. We embrace new technologies and
              ideas to stay ahead of the curve and provide cutting-edge
              solutions.
            </p>
          </div>

          {/* Value 2 */}
          <div className="group  bg-white p-8 rounded-lg border-2 border-gray-200 shadow-lg transition-all duration-300 hover:border-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className=" top-0 right-0 -mt-5 -mr-5 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Integrity</h3>
            <div className="w-12 h-1 bg-black mb-6"></div>
            <p className="text-gray-600 leading-relaxed">
              We prioritize trust and transparency in every interaction with our
              users and partners. We believe in doing what's right, even when no
              one is watching, and we hold ourselves to the highest ethical
              standards.
            </p>
          </div>

          {/* Value 3 */}
          <div className="group  bg-white p-8 rounded-lg border-2 border-gray-200 shadow-lg transition-all duration-300 hover:border-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className=" top-0 right-0 -mt-5 -mr-5 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
            <div className="w-12 h-1 bg-black mb-6"></div>
            <p className="text-gray-600 leading-relaxed">
              We believe in fostering strong connections and working together to
              achieve success. By collaborating with our users, partners, and
              each other, we create solutions that truly meet the needs of our
              community.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="bg-black text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl leading-relaxed mb-12">
              From a small startup to a growing platform, our journey has been
              defined by our commitment to simplifying digital experiences.
            </p>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20"></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {/* Item 1 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold">2020</h3>
                      <p className="text-gray-300 mt-2">
                        Founded with a vision to simplify data storage
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <p className="text-gray-300">
                        Makes Easy was born out of a need to make data storage
                        more accessible to everyone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold">2021</h3>
                      <p className="text-gray-300 mt-2">
                        Launched our first platform version
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <p className="text-gray-300">
                        After months of development, we launched our platform to
                        the public with great success.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold">2022</h3>
                      <p className="text-gray-300 mt-2">
                        Expanded our team and features
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <p className="text-gray-300">
                        Growing demand led to team expansion and the addition of
                        new innovative features.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold">Today</h3>
                      <p className="text-gray-300 mt-2">
                        Continuing to innovate and grow
                      </p>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      <p className="text-gray-300">
                        We continue to evolve our platform based on user
                        feedback and technological advancements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the simplicity
            and power of Makes Easy.
          </p>
          <Link
            to="/signone"
            className="inline-flex items-center px-8 py-3 border-2 border-black bg-black text-white font-medium text-lg rounded-md hover:bg-white hover:text-black transition-colors duration-300"
          >
            Sign Up Now
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
