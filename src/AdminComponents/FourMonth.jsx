"use client";

import { Users, Loader2, ArrowLeft, Calendar, Hash } from "lucide-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FourMonth = () => {
  const [companion, setCompanion] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCompanions = async () => {
    setLoading(true);
    const result = await axios.get(
      "http://localhost:5169/api/FourMonth/GetFourMonth",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setCompanion(result.data.result);
      setLoading(false);
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
          <p className="text-gray-600 text-lg">Loading Students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="navbar border-2 border-red-400 h-12">
        <Navbar />
      </div>

      <div className="lg:mx-8 ml-0 px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl flex items-center gap-3 font-bold text-gray-800">
                <div className="p-2 bg-black rounded-xl shadow-lg">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                Companions Of 4-Month Khuruj
              </h1>
              <p className="text-sm text-gray-600 mt-1 ml-1">
                Manage and track companion information
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {companion.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Companions</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">4-Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table mt-4 sm:mt-6 lg:mt-8 w-full">
          <div className="head flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <div className="px-6 py-5 bg-gradient-to-r from-black to-gray-800">
              <div className="flex items-center justify-between">
                <h1 className="text-lg sm:text-xl font-sans font-semibold text-white flex items-center gap-3">
                  <Hash className="w-5 h-5" />
                  List Of Companions
                </h1>
                <div className="hidden sm:block">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    {companion.length} entries
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <div className="max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 lg:px-6 py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          No.
                        </div>
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Name
                        </div>
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Total
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Last Time
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {companion.map((c, ind) => (
                      <tr
                        onClick={() => {
                          navigate("/admin/companions", {
                            state: { id: c.id, name: c.name },
                          });
                        }}
                        key={c.id}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 cursor-pointer group"
                      >
                        <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-semibold group-hover:bg-gray-800 transition-colors">
                            {ind + 1}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm lg:text-base font-medium text-gray-900">
                          {c.name}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {c.total}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm lg:text-base text-gray-600">
                          {c.lastTime === "1111-11-11" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              Not found
                            </span>
                          ) : (
                            new Date(c.lastTime)
                              .toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                              })
                              .replace(" ", ", ")
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Mobile Card View */}
            <div className="md:hidden max-h-[450px] overflow-y-auto">
              {companion.map((c, ind) => (
                <div
                  onClick={() => {
                    navigate("/admin/companions", {
                      state: { id: c.id, name: c.name },
                    });
                  }}
                  key={c.id}
                  className="relative border-b border-gray-100 last:border-b-0 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 cursor-pointer group"
                >
                  {/* Card Number Badge */}
                  <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full min-w-[28px] text-center group-hover:bg-gray-800 transition-colors">
                    {ind + 1}
                  </div>

                  <div className="p-5 pl-16">
                    {/* Header with Name */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                          {c.name}
                        </h3>
                        <div className="w-8 h-0.5 bg-black mt-2 rounded-full"></div>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3 border-l-4 border-black">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            Total Count
                          </span>
                          <span className="text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded-full">
                            {c.total}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3 border-l-4 border-black">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Last Time
                          </span>
                          <span className="text-sm font-medium text-gray-800">
                            {c.lastTime === "1111-11-11" ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Not found
                              </span>
                            ) : (
                              new Date(c.lastTime)
                                .toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })
                                .replace(" ", ", ")
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {companion.length === 0 && (
                <div className="p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-base font-medium">
                    No companions found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Check back later for updates
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourMonth;
