// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { Users, UserPlus, Edit, Trash2 } from "lucide-react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";

// export const Memb = () => {
//   const [editing, setEditing] = useState(false);
//   const [people, setPeople] = useState([]);
//   const [occupation, setOccupation] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     if (editing) {
//       await axios.put("https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/UpdatePeople", data);
//       toast.success("Member updated Successfully");
//       await getPeople();
//       setShowModal(false);
//     } else {
//       var res = axios.post(
//         "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/InsertPeople/3/1/1/1/1",
//         data
//       );
//       reset();
//       toast.success("Member added successfully!");
//     }
//   };

//   const Delete = async (id) => {
//     let res = await axios.delete(
//       `https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/DeletePeople/${id}`
//     );

//     if (res.status === 200) {
//       toast.warning(`User Deleted Successfully`);
//     } else {
//       toast.error("Error in Deleting User");
//     }
//   };

//   const deletePeople = async (id) => {
//     const result = await Swal.fire({
//       title: "Delete item?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       background: "#111827",
//       color: "#f9fafb",
//       iconColor: "#f59e0b",
//       showCancelButton: true,
//       confirmButtonColor: "#f9fafb",
//       cancelButtonColor: "#374151",
//       confirmButtonText: "Yes, delete it",
//       cancelButtonText: "Cancel",
//       customClass: {
//         popup: "border border-gray-700 shadow-lg",
//         title: "text-lg font-semibold tracking-wide",
//         htmlContainer: "text-gray-300",
//         confirmButton:
//           "bg-white text-gray-900 px-4 py-2 font-medium uppercase tracking-wide",
//         cancelButton:
//           "bg-gray-700 text-gray-100 px-4 py-2 font-medium uppercase tracking-wide",
//         actions: "gap-3",
//       },
//     });

//     if (result.isConfirmed) {
//       await Delete(id);
//       await getPeople();
//     }
//   };
//   const handleOccupation = async () => {
//     var res = await axios.get("https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/Location/GetOccupations");
//     await getPeople();
//     var talha = res.data.occupation;
//     setOccupation(talha);
//   };

//   const getPeople = async () => {
//     try {
//       const res = await axios.get(
//         "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/GetPeopleByVillage",
//         {
//           withCredentials: true,
//         }
//       );
//       setPeople(res.data.people);
//     } catch (error) {
//       console.error("Error fetching people:", error);
//     }
//   };

//   useEffect(() => {
//     handleOccupation();
//     getPeople();
//   }, []);

//   return (
//     <div>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="navbar border-2 border-red-400 h-12">
//         <Navbar />
//       </div>
//       <div className="border-2 border-red-500">
//         <Sidebar />
//       </div>

//       <div className="ml-64">
//         <div className="top flex justify-between px-4 py-3 items-center">
//           <h1 className="p-3 text-2xl flex items-center gap-3 font-bold">
//             <Users className="hover:scale-125 hover:cursor-pointer" />
//             Members
//           </h1>
//           <button
//             onClick={() => {
//               setShowModal(true);
//               handleOccupation();
//               reset({
//                 name: "",
//                 mobile: "",
//                 age: "",
//                 waqt: "",
//                 occupationId: "",
//               });
//             }}
//             className="flex items-center justify-center border-2 border-black  py-2 px-4 rounded-lg  hover:bg-black hover:text-white transition-all duration-200"
//           >
//             <UserPlus className="mr-2 h-5 w-5" />
//             <span>Add member</span>
//           </button>
//         </div>

//         <div className="table mt-10 px-4 w-full">
//           <div className="head flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 h-[500px]">
//             <h1 className="pl-6 text-xl font-sans font-semibold py-4 bg-black text-white rounded-t-lg">
//               Member List
//             </h1>
//             <div className="overflow-y-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
//                   <tr>
//                     <th className="px-6 py-4 text-left  text-gray-900 text-[17px] font-semibold">
//                       Name
//                     </th>
//                     <th className="px-6 py-4 text-left  text-gray-900 text-[17px] font-semibold">
//                       Mobile
//                     </th>
//                     <th className="px-6 py-4 text-left  text-gray-900 text-[17px] font-semibold">
//                       Waqt
//                     </th>
//                     <th className="px-6 py-4 text-left  text-gray-900 text-[17px] font-semibold">
//                       Occupation
//                     </th>
//                     <th className="px-6 py-4 text-left  text-gray-900 text-[17px] font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {people.map((member) => (
//                     <tr
//                       key={member.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {member.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {member.mobile}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {member.waqt}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {member.occupation}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => {
//                               setShowModal(true);
//                               setEditing(true);
//                               reset({
//                                 id: member.id,
//                                 name: member.name,
//                                 mobile: member.mobile,
//                                 age: member.age,
//                                 waqt: member.waqt,
//                                 occupationId: member.occupationId,
//                               });
//                             }}
//                             className="p-1 rounded-full hover:bg-gray-200 transition-colors"
//                           >
//                             <Edit size={18} className="text-blue-700" />
//                           </button>
//                           <button
//                             onClick={() => {
//                               deletePeople(member.id);
//                             }}
//                             className="p-1 rounded-full hover:bg-gray-200 transition-colors"
//                           >
//                             <Trash2 size={18} className="text-red-700" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-opacity-50  flex items-center justify-center">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col p-6 gap-4 bg-white rounded-lg shadow-lg w-96"
//           >
//             <h1 className="text-xl text-center">
//               {editing ? "Update Member" : "Add Member"}
//             </h1>
//             <div className="flex flex-col">
//               <input
//                 {...register("name", {
//                   required: "Full name is requiered",
//                 })}
//                 type="text"
//                 name="name"
//                 id="fullName"
//                 placeholder="Talha Malek"
//                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//               <span className="text-red-500 text-sm">
//                 {errors.name?.message}
//               </span>
//             </div>

//             <div className="flex flex-col">
//               <input
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[6-9]\d{9}$/,
//                     message: "Please enter Valid Mobile number",
//                   },
//                 })}
//                 type="text"
//                 name="mobile"
//                 id="mobile"
//                 placeholder="9106704675"
//                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//               <span className="text-sm text-red-500">
//                 {errors.mobile?.message}
//               </span>
//             </div>

//             <div className="flex flex-col">
//               <input
//                 {...register("age", {
//                   required: "Age is required",
//                   pattern: {
//                     value: /^(1[01][0-9]|120|[1-9][0-9]?)$/,
//                     message: "Enter a valid age between 1 and 120",
//                   },
//                 })}
//                 type="number"
//                 name="age"
//                 id="age"
//                 placeholder="21"
//                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//               <span className="text-sm text-red-500">
//                 {errors.age?.message}
//               </span>
//             </div>

//             <div className="flex flex-col">
//               <select
//                 {...register("waqt", {
//                   required: "Please  Select a Waqt",
//                 })}
//                 name="waqt"
//                 id="waqt"
//                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               >
//                 <option value="">Select Waqt</option>
//                 <option value="4 Month">4 Month</option>
//                 <option value="40 Days">40 Days</option>
//                 <option value="10 Days">10 Days</option>
//                 <option value="3 Days">3 Days</option>
//               </select>

//               <span className="text-sm text-red-500">
//                 {errors.waqt?.message}
//               </span>
//             </div>

//             <div className="flex flex-col">
//               <select
//                 {...register("occupationId", {
//                   required: "Occupation is required",
//                 })}
//                 name="occupationId"
//                 id="occupation"
//                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               >
//                 <option value="">Select Occupation</option>
//                 {occupation.map((val) => (
//                   <option key={val.id} value={val.id}>
//                     {val.occupation}
//                   </option>
//                 ))}
//               </select>
//               <span className="text-sm text-red-500">
//                 {errors.occupationId?.message}
//               </span>
//             </div>

//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditing(false);
//                 }}
//                 className="bg-gray-500 text-white p-2 rounded-lg w-full hover:bg-gray-600 focus:outline-none"
//               >
//                 Close
//               </button>

//               <button
//                 type="submit"
//                 className="bg-black text-white p-2 rounded-lg w-full ml-2 hover:bg-gray-800 focus:outline-none"
//               >
//                 {editing ? "Update" : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Users, UserPlus, Edit, Trash2, Search, X } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export const Memb = () => {
  const [editing, setEditing] = useState(false);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    if (editing) {
      await axios.put("https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/UpdatePeople", data,{withCredentials:true});
      setShowModal(false);
      toast.success("Member updated Successfully");
      await getPeople();
    } else {
      const res = await axios.post(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/InsertPeople",
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        reset();
        toast.success("Member added successfully!");
        await getPeople();
      } else {
        toast.error("An Error Occured");
      }
    }
  };

  const Delete = async (id) => {
    let res = await axios.delete(
      `https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/DeletePeople/${id}`,
      { withCredentials: true }
    );

    if (res.status === 200) {
      await getPeople();
      toast.warning(`User Deleted Successfully`);
    } else {
      toast.error("Error in Deleting User");
    }
  };

  const deletePeople = async (id) => {
    const result = await Swal.fire({
      title: "Delete item?",
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
      await Delete(id);
      await getPeople();
    }
  };

  const handleOccupation = async () => {
    var res = await axios.get("https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/Location/GetOccupations");
    await getPeople();
    var talha = res.data.occupation;
    setOccupation(talha);
  };

  const getPeople = async () => {
    try {
      const res = await axios.get(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/GetPeopleByVillage",
        {
          withCredentials: true,
        }
      );
      setPeople(res.data.people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    handleOccupation();
    getPeople();
  }, []);

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

          {/* Add Member Button */}
          <button
            onClick={() => {
              setShowModal(true);
              handleOccupation();
              reset({
                name: "",
                mobile: "",
                age: "",
                waqt: "",
                occupationId: "",
              });
            }}
            className="flex items-center justify-center border-2 border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white transition-all duration-200 w-full lg:w-auto"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            <span>Add member</span>
          </button>
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
                  <th className="px-6 py-4 text-left text-gray-900 text-[17px] font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPeople.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setEditing(true);
                            reset({
                              id: member.id,
                              name: member.name,
                              mobile: member.mobile,
                              age: member.age,
                              waqt: member.waqt,
                              occupationId: member.occupationId,
                            });
                          }}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Edit size={18} className="text-blue-700" />
                        </button>
                        <button
                          onClick={() => deletePeople(member.id)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Trash2 size={18} className="text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden max-h-[500px] overflow-y-auto">
            {filteredPeople.map((member) => (
              <div
                key={member.id}
                className="border-b border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{member.mobile}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setEditing(true);
                        reset({
                          id: member.id,
                          name: member.name,
                          mobile: member.mobile,
                          age: member.age,
                          waqt: member.waqt,
                          occupationId: member.occupationId,
                        });
                      }}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Edit size={16} className="text-blue-700" />
                    </button>
                    <button
                      onClick={() => deletePeople(member.id)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-700" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Waqt:</span>
                    <span className="ml-1 font-medium">{member.waqt}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Occupation:</span>
                    <span className="ml-1 font-medium">
                      {member.occupation}
                    </span>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-6 gap-4 bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h1 className="text-xl text-center font-semibold">
              {editing ? "Update Member" : "Add Member"}
            </h1>

            <div className="flex flex-col">
              <input
                {...register("name", {
                  required: "Full name is required",
                })}
                type="text"
                name="name"
                id="fullName"
                placeholder="Talha Malek"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </span>
            </div>

            <div className="flex flex-col">
              <input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Please enter Valid Mobile number",
                  },
                })}
                type="text"
                name="mobile"
                id="mobile"
                placeholder="9106704675"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span className="text-sm text-red-500 mt-1">
                {errors.mobile?.message}
              </span>
            </div>

            <div className="flex flex-col">
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
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span className="text-sm text-red-500 mt-1">
                {errors.age?.message}
              </span>
            </div>

            <div className="flex flex-col">
              <select
                {...register("waqt", {
                  required: "Please Select a Waqt",
                })}
                name="waqt"
                id="waqt"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Waqt</option>
                <option value="4 Month">4 Month</option>
                <option value="40 Days">40 Days</option>
                <option value="10 Days">10 Days</option>
                <option value="3 Days">3 Days</option>
              </select>
              <span className="text-sm text-red-500 mt-1">
                {errors.waqt?.message}
              </span>
            </div>

            <div className="flex flex-col">
              <select
                {...register("occupationId", {
                  required: "Occupation is required",
                })}
                name="occupationId"
                id="occupation"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Occupation</option>
                {occupation.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.occupation}
                  </option>
                ))}
              </select>
              <span className="text-sm text-red-500 mt-1">
                {errors.occupationId?.message}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditing(false);
                }}
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
              >
                {editing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
