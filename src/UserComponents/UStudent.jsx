"use client";

import { Users, Search, Edit, Trash2, Loader2, X } from "lucide-react";
import Navbar from "../UserComponents/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const getStudents = async () => {
    setLoading(true);
    const result = await axios.get(
      "http://localhost:5169/api/People/GetStudents",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setStudents(result.data.students);
      setFilteredStudents(result.data.students);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.mobile.includes(searchTerm) ||
        student.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.year.toString().includes(searchTerm) ||
        student.waqt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredStudents(students);
  };

  useEffect(() => {
    getStudents();
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
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="navbar border-2 border-red-400 h-12">
        <Navbar />
      </div>

      <div className="lg:mx-8 ml-0 px-3 sm:px-4 mt-[16px] lg:px-6">
        {/* Header Section */}
        <div className="top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl flex items-center gap-3 font-bold text-gray-800">
            <Users className="hover:scale-125 hover:cursor-pointer transition-transform duration-200 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            Students
          </h1>

          <div className="relative flex-1 lg:w-80 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name, mobile, field, year, or waqt..."
              value={searchTerm}
              onInput={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm transition-all duration-200"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredStudents.length} student
            {filteredStudents.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        )}

        {/* Table Section */}
        <div className="table mt-4 sm:mt-6 lg:mt-8 w-full">
          <div className="head flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
            <h1 className="pl-4 sm:pl-6 text-lg sm:text-xl font-sans font-semibold py-4 bg-black text-white">
              Student List
            </h1>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <div className="max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        No.
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Mobile
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Waqt
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Field
                      </th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((c, ind) => (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {ind + 1}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.name}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.mobile}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.waqt}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.field}
                        </td>
                        <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                          {c.year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden max-h-[400px] overflow-y-auto">
              {filteredStudents.map((c) => (
                <div
                  key={c.id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Mobile:</span> {c.mobile}
                      </div>
                      <div>
                        <span className="font-medium">Waqt:</span> {c.waqt}
                      </div>
                      <div>
                        <span className="font-medium">Field:</span> {c.field}
                      </div>
                      <div>
                        <span className="font-medium">Year:</span> {c.year}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {searchTerm && filteredStudents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No students found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UStudent;
