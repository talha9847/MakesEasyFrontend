"use client";

import { useEffect, useState } from "react";
import Navbar from "../UserComponents/Navbar";
import { Users, Search, X } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

export const UMembers = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Search functionality
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.mobile.includes(searchTerm) ||
          member.waqt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.occupation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPeople(filtered);
    }
  }, [searchTerm, people]);

  const getPeople = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/GetPeopleByVillage",
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        setPeople(res.data.people);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-black animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading Members...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Mobile Header */}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="navbar border-2 border-red-400 h-12">
        <Navbar />
      </div>

      {/* Desktop Sidebar
      <div className="hidden lg:block border-2 border-red-500">
        <Sidebar />
      </div> */}

      <div className=" p-4 lg:p-9">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
          <h1 className="hidden lg:flex text-2xl items-center gap-3 font-bold">
            <Users className="hover:scale-125 hover:cursor-pointer" />
            Members
          </h1>

          <div className="relative flex-1 lg:flex-none lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <div className="px-4 lg:px-6 py-4 bg-black text-white flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-semibold">Member List</h2>
            {searchTerm && (
              <span className="text-sm bg-gray-700 px-2 py-1 rounded">
                {filteredPeople.length} of {people.length} members
              </span>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-y-auto max-h-[500px]">
            <table className="min-w-full">
              <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    No.
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    Waqt
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    Occupation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPeople.map((member, ind) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {ind + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.waqt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.occupation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden max-h-[500px] overflow-y-auto bg-white">
            {filteredPeople.map((member, ind) => (
              <div
                key={member.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-4 space-y-3">
                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-sm">
                          {ind + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-black text-sm font-medium">
                          {member.mobile}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Waqt
                        </span>
                        <span className="text-sm font-semibold text-gray-900 mt-1">
                          {member.waqt}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Occupation
                        </span>
                        <span className="text-sm font-semibold text-gray-900 mt-1">
                          {member.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* No Results Message */}
          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm ? "No members found" : "No members yet"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? `No members match "${searchTerm}"`
                  : "Get started by adding a new member."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
