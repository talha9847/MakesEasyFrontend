"use client";

import { Users, UserPlus, Edit, Trash2, Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getStudents = async () => {
    setLoading(true);
    const result = await axios.get(
      "http://localhost:5169/api/People/GetStudents",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setStudents(result.data.students);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (editing) {
      let id = editId;
      let updatedData = { ...data, id: id };
      const result = await axios.put(
        "http://localhost:5169/api/People/UpdateStudent",
        updatedData,
        { withCredentials: true }
      );
      if (result.status == 200) {
        toast.success("Student Updated Successfullly");
        await getStudents();
        setShowModal(false);
      }
    } else {
      const result = await axios.post(
        "http://localhost:5169/api/People/InsertStudent",
        data,
        { withCredentials: true }
      );
      if (result.status == 200) {
        await getStudents();
        toast.success("Student Added Successfully");
        setShowModal(false);
      }
    }
  };

  const editFunction = (c) => {
    setShowModal(true);
    reset({
      name: c.name,
      mobile: c.mobile,
      age: c.age,
      waqt: c.waqt,
      field: c.field,
      year: c.year,
    });
  };

  const deleteFunction = async (id) => {
    const result = await Swal.fire({
      title: "Are sure you want to delete student?",
      text: "This action cannot be undone.",
      icon: "warning",
      background: "#111827",
      color: "#f9fafb",
      iconColor: "#f59e0b",
      showCancelButton: true,
      confirmButtonColor: "#f9fafb",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "border border-gray-700 shadow-lg",
        title: "text-lg font-semibold tracking-wide",
        htmlContainer: "text-gray-300",
        confirmButton:
          "bg-white text-gray-900 px-4 py-2 font-medium uppercase tracking-wide",
        cancelButton:
          "bg-gray-700 text-gray-100 px-4 py-2 font-medium uppercase tracking-wide",
        actions: "gap-3",
      },
    });

    if (result.isConfirmed) {
      const del = await axios.delete(
        `http://localhost:5169/api/People/DeleteStudent/${id}`,
        { withCredentials: true }
      );

      if (del.status == 200) {
        toast.warning("Student Deleted Successfulllyy");
        await getStudents();
      }
    }
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
          <p className="text-gray-600 text-lg">Loading Members...</p>
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
          <button
            onClick={() => {
              setEditing(false);
              setShowModal(true);
              reset({
                name: "",
                mobile: "",
                waqt: "",
                age: "",
                field: "",
                year: "",
              });
            }}
            className="flex items-center justify-center border-2 border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-all duration-200 w-full sm:w-auto text-sm sm:text-base font-medium"
          >
            <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Add Student</span>
          </button>
        </div>

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
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-gray-900 text-sm lg:text-base font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        0
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        John Doe
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        9876543210
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        40 Days
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        Computer Science
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base">
                        2023
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <Edit size={16} className="text-blue-700" />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <Trash2 size={16} className="text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {students.map((c, ind) => (
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
                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditing(true);
                                editFunction(c);
                                setEditId(c.id);
                              }}
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Edit size={16} className="text-blue-700" />
                            </button>
                            <button
                              onClick={() => {
                                deleteFunction(c.id);
                              }}
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Trash2 size={16} className="text-red-700" />
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
            <div className="md:hidden max-h-[400px] overflow-y-auto">
              {/* Sample Student Card */}
              <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">John Doe</h3>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <Edit size={14} className="text-blue-700" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <Trash2 size={14} className="text-red-700" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Mobile:</span> 9876543210
                    </div>
                    <div>
                      <span className="font-medium">Waqt:</span> 40 Days
                    </div>
                    <div>
                      <span className="font-medium">Field:</span> Computer
                      Science
                    </div>
                    <div>
                      <span className="font-medium">Year:</span> 2023
                    </div>
                  </div>
                </div>
              </div>

              {students.map((c) => (
                <div
                  key={c.id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{c.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditing(true);
                            editFunction(c);
                            setEditId(c.id);
                          }}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Edit size={14} className="text-blue-700" />
                        </button>
                        <button
                          onClick={() => {
                            deleteFunction(c.id);
                          }}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Trash2 size={14} className="text-red-700" />
                        </button>
                      </div>
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
          </div>
        </div>

        {/* Modal Design */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-800">
                {editing ? "Update Student" : "Add Student"}
              </h2>

              <div className="space-y-4">
                <div>
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.name?.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    {...register("mobile", {
                      required: "Mobile Number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Please enter valid Mobile Number",
                      },
                    })}
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  />
                  {errors.mobile && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.mobile?.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    {...register("age", {
                      required: "Age is required",
                      pattern: {
                        value: /^(1[01][0-9]|120|[1-9][0-9]?)$/,
                        message: "Enter a valid age between 1 and 120",
                      },
                    })}
                    type="number"
                    name="age"
                    id="age"
                    placeholder="21"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  />
                  {errors.age && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.age?.message}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    {...register("waqt", {
                      required: "Please select Waqt",
                    })}
                    name="waqt"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Waqt</option>
                    <option value="4 Month">4 Month</option>
                    <option value="40 Days">40 Days</option>
                    <option value="10 Days">10 Days</option>
                    <option value="3 Days">3 Days</option>
                  </select>
                  {errors.waqt && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.waqt?.message}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    {...register("field", {
                      required: "Please select a field",
                    })}
                    name="field"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select field</option>

                    <optgroup label="School">
                      <option value="10th">10th</option>
                      <option value="11th Arts">11th Arts</option>
                      <option value="11th Commerce">11th Commerce</option>
                      <option value="11th Science">11th Science</option>
                      <option value="12th Arts">12th Arts</option>
                      <option value="12th Commerce">12th Commerce</option>
                      <option value="12th Science">12th Science</option>
                    </optgroup>

                    <optgroup label="College - Arts, Commerce & Science">
                      <option value="B.A.">B.A.</option>
                      <option value="M.A.">M.A.</option>
                      <option value="B.COM.">B.COM.</option>
                      <option value="M.COM.">M.COM.</option>
                      <option value="B.SC.">B.SC.</option>
                      <option value="M.SC.">M.SC.</option>
                      <option value="BCA">BCA (Computer Applications)</option>
                      <option value="MCA">MCA (Computer Applications)</option>
                      <option value="BBA">BBA (Business Administration)</option>
                      <option value="MBA">MBA (Business Administration)</option>
                      <option value="BMS">BMS (Management Studies)</option>
                      <option value="PGDM">PGDM (Diploma in Management)</option>
                    </optgroup>

                    <optgroup label="Engineering & Technology">
                      <option value="Diploma in Engineering">
                        Diploma in Engineering
                      </option>
                      <option value="B.E">B.E</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.E">M.E</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="B.Arch">B.Arch (Architecture)</option>
                      <option value="M.Arch">M.Arch (Architecture)</option>
                      <option value="B.Plan">B.Plan (Planning)</option>
                      <option value="M.Plan">M.Plan (Planning)</option>
                      <option value="B.Des">B.Des (Design)</option>
                      <option value="M.Des">M.Des (Design)</option>
                    </optgroup>

                    <optgroup label="Medical & Allied Health">
                      <option value="MBBS">MBBS</option>
                      <option value="BDS">BDS</option>
                      <option value="BAMS">BAMS</option>
                      <option value="BHMS">BHMS</option>
                      <option value="BUMS">BUMS</option>
                      <option value="BSMS">BSMS</option>
                      <option value="BVSc">BVSc (Veterinary)</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS (Surgery)</option>
                      <option value="MDS">MDS (Dental Surgery)</option>
                      <option value="BPT">BPT (Physiotherapy)</option>
                      <option value="MPT">MPT (Physiotherapy)</option>
                      <option value="BMLT">
                        BMLT (Medical Lab Technology)
                      </option>
                      <option value="BOT">BOT (Occupational Therapy)</option>
                      <option value="BASLP">BASLP (Speech & Audiology)</option>
                      <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                      <option value="M.Sc. Nursing">M.Sc. Nursing</option>
                      <option value="GNM">GNM (Nursing)</option>
                      <option value="ANM">ANM (Nursing)</option>
                      <option value="B.Pharm">B.Pharm</option>
                      <option value="D.Pharm">D.Pharm</option>
                      <option value="M.Pharm">M.Pharm</option>
                      <option value="MPH">MPH (Public Health)</option>
                    </optgroup>

                    <optgroup label="Education">
                      <option value="B.Ed">B.Ed</option>
                      <option value="M.Ed">M.Ed</option>
                      <option value="D.Ed">D.Ed</option>
                    </optgroup>

                    <optgroup label="Law">
                      <option value="LLB">LLB (Bachelor of Laws)</option>
                      <option value="LLM">LLM (Master of Laws)</option>
                    </optgroup>

                    <optgroup label="Other / Competitive">
                      <option value="ITI">ITI</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="PHD">Ph.D</option>
                      <option value="CA">CA (Chartered Accountant)</option>
                      <option value="CS">CS (Company Secretary)</option>
                      <option value="CMA">
                        CMA (Cost & Management Accounting)
                      </option>
                      <option value="UPSC">UPSC</option>
                      <option value="SSC">SSC</option>
                      <option value="Bank PO">Bank PO</option>
                    </optgroup>
                  </select>
                  {errors.field && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.field?.message}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    {...register("year", {
                      required: "Please select the year/level",
                    })}
                    name="year"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select year/level</option>

                    <optgroup label="School">
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                    </optgroup>

                    <optgroup label="College">
                      <option value="1st Year">1st Year (FY)</option>
                      <option value="2nd Year">2nd Year (SY)</option>
                      <option value="3rd Year">3rd Year (TY)</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="6th Year">6th Year</option>
                    </optgroup>
                  </select>
                  {errors.year && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {errors.year?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    reset({
                      name: "",
                      mobile: "",
                      age: "",
                      waqt: "",
                      field: "",
                      year: "",
                    });
                    setShowModal(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto font-medium"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto font-medium"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
