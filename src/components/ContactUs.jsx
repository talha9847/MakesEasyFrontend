"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";
import axios from "axios";

const HelpAndSupport = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const [activeTab, setActiveTab] = useState("general");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [subject, setSubject] = useState();
  const subjec = watch("subject", ""); // Watch subject input

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const onSubmit = async (data) => {
    console.log("on Submit clicked");
    const result = await axios.post(
      "http://localhost:5169/api/Message/PostMessage",
      data
    );

    if (result.status == 200) {
      toast.success("Thanks for contacting us. Our team will respond soon.");
      reset({
        name: "",
        email: "",
        subject: "",
        message: "",
        privacy: "",
      });
    } else {
      toast.error("Some unexpected error occured");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      {/* Hero Section */}
      <div className=" bg-black text-white py-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Help & Support
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl font-light">
              We're here to help you get the most out of our platform. Find
              answers to common questions or reach out to our support team.
            </p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            How Can We Help You?
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from our support options below to find the assistance you
            need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option 1 */}
          <div className="bg-white border-2 border-black rounded-lg p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              Live Chat Support
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Chat with our support team in real-time for immediate assistance
              with your questions.
            </p>
            <div className="text-center">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Option 2 */}
          <div className="bg-white border-2 border-black rounded-lg p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              Knowledge Base
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Browse our comprehensive knowledge base for tutorials, guides, and
              troubleshooting tips.
            </p>
            <div className="text-center">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Explore Articles
              </button>
            </div>
          </div>

          {/* Option 3 */}
          <div className="bg-white border-2 border-black rounded-lg p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">
              Submit a Ticket
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Create a support ticket for complex issues that require detailed
              investigation by our team.
            </p>
            <div className="text-center">
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Left Column - Contact Info */}
            <div className="md:w-2/5 bg-black text-white p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <div className="w-16 h-1 bg-white mb-8"></div>
                <p className="text-gray-300 mb-10">
                  Have a question or need assistance? Reach out to our support
                  team using the contact information below.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email</h3>
                      <p className="text-gray-300 mt-1">
                        support@makeseasy.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Phone</h3>
                      <p className="text-gray-300 mt-1">+91 99791 41748</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Address</h3>
                      <p className="text-gray-300 mt-1">
                        84, Makes Easy, Malek Street
                      </p>
                      <p className="text-gray-300">
                        Zankharda, Surat India, 394421
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Working Hours</h3>
                      <p className="text-gray-300 mt-1">
                        Monday - Friday : 7PM - 8AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="md:w-3/5 p-10">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:ring-black focus:border-black"
                      placeholder="John Doe"
                    />
                    <p className="text-red-500 text-xs px-1">
                      {errors.name?.message}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:ring-black focus:border-black"
                      placeholder="john@example.com"
                    />
                    <p className="text-red-500 text-xs px-1">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                      maxLength: {
                        value: 100,
                        message: "Subject must be at most 100 characters",
                      },
                    })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md   focus:border-black"
                    placeholder="How can we help you?"
                  />
                  <div className="flex  justify-between items-center">
                    <p className="text-red-500 text-xs px-1">
                      {errors.subject?.message}
                    </p>
                    <p className="">{subjec.length}/100</p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "message is required",
                    })}
                    id="message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:border-black"
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                  <p className="text-red-500 text-xs px-1">
                    {errors.message?.message}
                  </p>
                </div>

                <div className="flex items-start">
                  <input
                    {...register("privacy", {
                      required: "Accept Privacy And Policy",
                    })}
                    id="privacy"
                    type="checkbox"
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black mt-1"
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-black font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to the processing of my data.
                    <p className="pt-[-2px] text-red-500 text-xs">
                      {errors.privacy?.message}
                    </p>
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Send Message
                  <Send className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
            <div className="w-16 h-1 bg-black mb-8"></div>
            <p className="text-lg mb-8 text-gray-600">
              Feel free to visit us at our headquarters for any in-person
              queries or support. We're always ready to welcome you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-black mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Address</h3>
                  <p className="text-gray-600">84, Makes Easy, Malek Street</p>
                  <p className="text-gray-600">
                    Zankharda, Surat India, 394421
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-black mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Phone</h3>
                  <p className="text-gray-600">+91 99791 41748</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-black mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday to Friday from 9:00 AM to 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/h84isArmDTCEEu3d7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 bg-black text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors duration-300"
            >
              <MapPin className="w-5 h-5 mr-2 " />
              View on Google Maps
            </a>
          </div>

          <div className="lg:w-1/2">
            <div className="h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.433617029575!2d73.1419167!3d21.4215833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI1JzE3LjciTiA3M8KwMDgnMzAuOSJF!5e0!3m2!1sen!2sin!4v1711900000000!5m2!1sen!2sin"
                className="inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or
            concerns you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
