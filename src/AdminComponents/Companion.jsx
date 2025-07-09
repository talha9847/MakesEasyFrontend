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
  Info,
  Users,
  CalendarDays,
  Timer,
  Hash,
  Plus,
  X,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";

const Companion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};
  const [companionDetails, setCompanionDetails] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getCompanions = async () => {
    const result = await axios.get(
      `http://localhost:5169/api/FourMonth/Get40Data/${id}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      const data = result.data?.result;

      if (!data || (Array.isArray(data) && data.length === 0)) {
        console.log("Nice tryyyyy"); // No data found or it's an empty array
      } else {
        setCompanionDetails(data);
      }
    }
  };

  const handleDelete = (index) => {
    // Add your delete logic here
    console.log("Delete item:", index);
    setShowActionMenu(null);
  };

  const onSubmit = async (data) => {
    try {
      let formData = new FormData();
      data.date = `${data.date}-01`;
      formData.append("lastTime", data.date);
      formData.append("place", data.place);
      if (edit) {
        formData.append("id", editId);
        console.log(data);
        const result = await axios.put(
          "http://localhost:5169/api/FourMonth/UpdateCompanion",
          formData,
          {
            withCredentials: true,
          }
        );
        if (result.status == 200) {
          toast.success("Edited Successfully");
          setShowAddForm(false);
          reset({
            date: "",
            place: "",
          });
          getCompanions();
        } else {
          toast.error("Some error occured");
          setShowAddForm(false);
          reset({
            date: "",
            place: "",
          });
        }
      } else {
        formData.append("pId", id);
        const result = await axios.post(
          "http://localhost:5169/api/FourMonth/Add40Companion",
          formData,
          {
            withCredentials: true,
          }
        );
        if (result.status == 200) {
          toast.success("Added Successfully");
          setShowAddForm(false);
          reset({
            date: "",
            place: "",
          });
          getCompanions();
        } else {
          toast.error("Some Unexpected thing occured");
        }
      }
    } catch (error) {
      toast.error("Server sorry We are sorry for that");
    }
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    reset({
      date: "",
      place: "",
    });
  };

  useEffect(() => {
    getCompanions();
  }, []);

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
                  {companionDetails.length * 40}
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
                <p className="text-3xl font-bold text-gray-900">40</p>
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
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setEdit(false);
                    setShowAddForm(true)
                    reset({
                      date:"",
                      place:""
                    })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Detail</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditId(c.id);
                              setEdit(true);
                              reset({
                                date: new Date(c.lastTime)
                                  .toISOString()
                                  .slice(0, 7), // "YYYY-MM"
                                place: c.place,
                              });
                              setShowAddForm(true);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
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
                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowActionMenu(
                                showActionMenu === index ? null : index
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {showActionMenu === index && (
                            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[120px]">
                              <button
                                onClick={() => {
                                  setEdit(true);
                                  setEditId(c.id);
                                  reset({
                                    date: new Date(c.lastTime)
                                      .toISOString()
                                      .slice(0, 7), // "YYYY-MM"
                                    place: c.place,
                                  });
                                  setShowAddForm(true);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                                Delete
                              </button>
                            </div>
                          )}
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

      {/* Add Detail Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-6 bg-gradient-to-r from-black to-gray-800 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  Add Detail
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Date (Month & Year)
                </label>
                <input
                  {...register("date", { required: "Date is required" })}
                  type="month"
                  id="date"
                  name="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <span className="text-red-500 text-xs pl-2">
                  {errors.date?.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor="place"
                  className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Place
                </label>
                <input
                  {...register("place", { required: "Place is required" })}
                  type="text"
                  id="place"
                  name="place"
                  placeholder="Enter place name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl  transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <span className="text-xs text-red-500 pl-2">
                  {errors.place?.message}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Add Detail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Companion;
