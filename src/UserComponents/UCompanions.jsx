import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Award,
  Users,
  CalendarDays,
  Timer,
  Hash,
  Loader2,
} from "lucide-react";
import Navbar from "../UserComponents/Navbar";
import axios from "axios";

const UCompanions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};
  const [companionDetails, setCompanionDetails] = useState([]);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCompanions = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/FourMonth/GetCompanion/${id}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      const data = result.data?.result;
      setLoading(false);
      if (!data || (Array.isArray(data) && data.length === 0)) {
        console.log("Nice tryyyyy"); // No data found or it's an empty array
      } else {
        setCompanionDetails(data);
      }
    }
  };

  useEffect(() => {
    getCompanions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-black animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading Companions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="py-3 border-b border-gray-200 bg-white shadow-sm">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-gray-800 text-white shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">Companion Profile</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Khuruj Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Total Khuruj
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {companionDetails.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Journeys completed</p>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Days Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Total Days
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {companionDetails.length * 120}
                </p>
                <p className="text-xs text-gray-500 mt-1">Days dedicated</p>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Duration Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Per Journey
                </p>
                <p className="text-3xl font-bold text-gray-900">120</p>
                <p className="text-xs text-gray-500 mt-1">Days each</p>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Timer className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Khuruj History Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-6 bg-gradient-to-r from-black to-gray-800 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Khuruj History
              </h2>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />#
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Place
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Start Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        End Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {companionDetails.map((c, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold group-hover:bg-gray-800 transition-colors">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {c.place}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Start
                          </div>
                          {new Date(c.lastTime)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                            .replace(" ", ", ")}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            End
                          </div>
                          {(() => {
                            const date = new Date(c.lastTime);
                            date.setMonth(date.getMonth() + 4);
                            return date
                              .toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })
                              .replace(" ", ", ");
                          })()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-100">
              {companionDetails.map((c, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-base font-semibold text-gray-900">
                            {c.place}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-green-500">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Start Date
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {new Date(c.lastTime)
                                .toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })
                                .replace(" ", ", ")}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-red-500">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" />
                              End Date
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {(() => {
                                const date = new Date(c.lastTime);
                                date.setMonth(date.getMonth() + 4);
                                return date
                                  .toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                  })
                                  .replace(" ", ", ");
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {companionDetails.length === 0 && (
                <div className="p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-base font-medium">
                    No companions found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    No journey records available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Overlay to close action menu */}
      {showActionMenu !== null && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActionMenu(null)}
        />
      )}
    </div>
  );
};

export default UCompanions;
