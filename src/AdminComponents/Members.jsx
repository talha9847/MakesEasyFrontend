// "use client"

// import { useState, useEffect } from "react"
// import Navbar from "./Navbar"
// import Sidebar from "./Sidebar"

// export const Members = () => {
//   const [members, setMembers] = useState([])
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     age: "",
//     waqt: "",
//     occupation: "",
//   })
//   const [isEditing, setIsEditing] = useState(false)
//   const [editId, setEditId] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortField, setSortField] = useState("name")
//   const [sortDirection, setSortDirection] = useState("asc")
//   const [showModal, setShowModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)

//   // Mock IDs from route params - in a real implementation, these would come from your router
//   const routeParams = {
//     vId: 1,
//     tId: 1,
//     dId: 1,
//     sId: 1,
//     cId: 1,
//   }

//   useEffect(() => {
//     // Fetch members data
//     fetchMembers()
//   }, [])

//   const fetchMembers = async () => {
//     try {
//       // Mock data for now - replace with actual API call
//       const mockData = [
//         { id: 1, name: "John Doe", mobile: "1234567890", age: 30, waqt: "Morning", occupation: "Engineer" },
//         { id: 2, name: "Jane Smith", mobile: "9876543210", age: 25, waqt: "Evening", occupation: "Doctor" },
//         { id: 3, name: "Robert Johnson", mobile: "5551234567", age: 45, waqt: "Afternoon", occupation: "Teacher" },
//         { id: 4, name: "Sarah Williams", mobile: "7778889999", age: 32, waqt: "Morning", occupation: "Designer" },
//         { id: 5, name: "Michael Brown", mobile: "3334445555", age: 28, waqt: "Evening", occupation: "Developer" },
//       ]
//       setMembers(mockData)
//     } catch (error) {
//       console.error("Error fetching members:", error)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (isEditing) {
//       // Update existing member
//       try {
//         // API call would go here with route params
//         // const response = await fetch(`api/InsertPeople/${routeParams.vId}/${routeParams.tId}/${routeParams.dId}/${routeParams.sId}/${routeParams.cId}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });

//         const updatedMembers = members.map((member) => (member.id === editId ? { ...member, ...formData } : member))
//         setMembers(updatedMembers)
//         resetForm()
//         setShowModal(false)
//       } catch (error) {
//         console.error("Error updating member:", error)
//       }
//     } else {
//       // Add new member
//       try {
//         // API call would go here with route params
//         // const response = await fetch(`api/InsertPeople/${routeParams.vId}/${routeParams.tId}/${routeParams.dId}/${routeParams.sId}/${routeParams.cId}`, {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });

//         const newMember = {
//           id: members.length + 1,
//           ...formData,
//         }
//         setMembers([...members, newMember])
//         resetForm()
//         setShowModal(false)
//       } catch (error) {
//         console.error("Error adding member:", error)
//       }
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       mobile: "",
//       age: "",
//       waqt: "",
//       occupation: "",
//     })
//     setIsEditing(false)
//     setEditId(null)
//   }

//   const handleEdit = (member) => {
//     setFormData({
//       name: member.name,
//       mobile: member.mobile,
//       age: member.age,
//       waqt: member.waqt,
//       occupation: member.occupation,
//     })
//     setIsEditing(true)
//     setEditId(member.id)
//     setShowModal(true)
//   }

//   const handleDelete = async (id) => {
//     try {
//       // API call would go here
//       const filteredMembers = members.filter((member) => member.id !== id)
//       setMembers(filteredMembers)
//       setShowDeleteModal(false)
//     } catch (error) {
//       console.error("Error deleting member:", error)
//     }
//   }

//   const confirmDelete = (id) => {
//     setDeleteId(id)
//     setShowDeleteModal(true)
//   }

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   const getSortIcon = (field) => {
//     if (sortField !== field) return null
//     return sortDirection === "asc" ? "↑" : "↓"
//   }

//   const filteredMembers = members.filter((member) => {
//     return (
//       member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.mobile.includes(searchTerm) ||
//       member.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.waqt.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const sortedMembers = [...filteredMembers].sort((a, b) => {
//     let aValue = a[sortField]
//     let bValue = b[sortField]

//     // Handle numeric fields
//     if (sortField === "age") {
//       aValue = Number(aValue)
//       bValue = Number(bValue)
//     } else {
//       // For string fields
//       aValue = String(aValue).toLowerCase()
//       bValue = String(bValue).toLowerCase()
//     }

//     if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
//     if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
//     return 0
//   })

//   const waqtOptions = ["Morning", "Afternoon", "Evening", "Night"]

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="border-b border-gray-200 bg-white shadow-sm">
//         <Navbar />
//       </div>

//       <div className="flex flex-1">
//         <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
//           <Sidebar />
//         </div>

//         <div className="flex-1 px-6 py-16 ">
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-3 h-8 w-8"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="9" cy="7" r="4"></circle>
//                     <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                   </svg>
//                   Members
//                 </h1>
//                 <p className="text-gray-600">Manage your members database</p>
//               </div>

//               <button
//                 onClick={() => {
//                   resetForm()
//                   setShowModal(true)
//                 }}
//                 className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="9" cy="7" r="4"></circle>
//                   <path d="M19 8v6"></path>
//                   <path d="M16 11h6"></path>
//                 </svg>
//                 Add Member
//               </button>
//             </div>

//             <div className="mt-6 flex items-center gap-4">
//               <div className="relative flex-1 max-w-md">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <circle cx="11" cy="11" r="8"></circle>
//                   <path d="m21 21-4.3-4.3"></path>
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M18 6 6 18"></path>
//                       <path d="m6 6 12 12"></path>
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               <select
//                 value={sortField}
//                 onChange={(e) => {
//                   setSortField(e.target.value)
//                   setSortDirection("asc")
//                 }}
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="age">Sort by Age</option>
//                 <option value="waqt">Sort by Waqt</option>
//                 <option value="occupation">Sort by Occupation</option>
//               </select>

//               <button
//                 onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
//                 className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                 title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
//               >
//                 {sortDirection === "asc" ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="m18 15-6-6-6 6"></path>
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="m6 9 6 6 6-6"></path>
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {filteredMembers.length === members.length
//                   ? `Showing all ${members.length} members`
//                   : `Found ${filteredMembers.length} of ${members.length} members`}
//               </p>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("name")}
//                     >
//                       <div className="flex items-center">Name {getSortIcon("name")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("mobile")}
//                     >
//                       <div className="flex items-center">Mobile {getSortIcon("mobile")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("age")}
//                     >
//                       <div className="flex items-center">Age {getSortIcon("age")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("waqt")}
//                     >
//                       <div className="flex items-center">Waqt {getSortIcon("waqt")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort("occupation")}
//                     >
//                       <div className="flex items-center">Occupation {getSortIcon("occupation")}</div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {sortedMembers.length > 0 ? (
//                     sortedMembers.map((member) => (
//                       <tr key={member.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.mobile}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.age}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                             {member.waqt}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.occupation}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               onClick={() => handleEdit(member)}
//                               className="text-gray-600 hover:text-gray-900"
//                               title="Edit"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
//                                 <path d="m15 5 4 4"></path>
//                               </svg>
//                             </button>

//                             <button
//                               onClick={() => confirmDelete(member.id)}
//                               className="text-red-500 hover:text-red-700"
//                               title="Delete"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               >
//                                 <path d="M3 6h18"></path>
//                                 <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
//                                 <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
//                                 <line x1="10" x2="10" y1="11" y2="17"></line>
//                                 <line x1="14" x2="14" y1="11" y2="17"></line>
//                               </svg>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
//                         {searchTerm ? (
//                           <div className="flex flex-col items-center justify-center text-gray-500">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-8 w-8 mb-2 opacity-50"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <circle cx="11" cy="11" r="8"></circle>
//                               <path d="m21 21-4.3-4.3"></path>
//                             </svg>
//                             <p>No results found for "{searchTerm}"</p>
//                             <button
//                               onClick={() => setSearchTerm("")}
//                               className="mt-2 text-black underline hover:no-underline"
//                             >
//                               Clear search
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center justify-center text-gray-500">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-8 w-8 mb-2 opacity-50"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//                               <circle cx="9" cy="7" r="4"></circle>
//                               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//                               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                             </svg>
//                             <p>No members found</p>
//                             <button
//                               onClick={() => setShowModal(true)}
//                               className="mt-2 text-black underline hover:no-underline"
//                             >
//                               Add your first member
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {sortedMembers.length > 0 && (
//               <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
//                 <p className="text-sm text-gray-500">
//                   Showing {sortedMembers.length} {sortedMembers.length === 1 ? "member" : "members"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Member Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">{isEditing ? "Edit Member" : "Add New Member"}</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 {isEditing
//                   ? "Update the member's information below."
//                   : "Fill in the details to add a new member to the system."}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="p-6 space-y-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="name" className="text-sm font-medium text-gray-700 text-right">
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Full name"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="mobile" className="text-sm font-medium text-gray-700 text-right">
//                     Mobile
//                   </label>
//                   <input
//                     id="mobile"
//                     name="mobile"
//                     type="text"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Phone number"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="age" className="text-sm font-medium text-gray-700 text-right">
//                     Age
//                   </label>
//                   <input
//                     id="age"
//                     name="age"
//                     type="number"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Age"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="waqt" className="text-sm font-medium text-gray-700 text-right">
//                     Waqt
//                   </label>
//                   <select
//                     id="waqt"
//                     name="waqt"
//                     value={formData.waqt}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                   >
//                     <option value="">Select time</option>
//                     {waqtOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <label htmlFor="occupation" className="text-sm font-medium text-gray-700 text-right">
//                     Occupation
//                   </label>
//                   <input
//                     id="occupation"
//                     name="occupation"
//                     type="text"
//                     value={formData.occupation}
//                     onChange={handleInputChange}
//                     className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
//                     placeholder="Occupation"
//                   />
//                 </div>
//               </div>

//               <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     resetForm()
//                     setShowModal(false)
//                   }}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//                 >
//                   {isEditing ? "Update Member" : "Add Member"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 Are you sure you want to delete this member? This action cannot be undone.
//               </p>
//             </div>

//             <div className="px-6 py-4 flex justify-end gap-2">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteId)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


















"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Users, UserPlus, Edit, Trash2, Search, X, Download, Filter, FileText, Calendar, MapPin } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const generateProfessionalPDF = (members, isFiltered = false, searchTerm = "") => {
  const printWindow = window.open("", "_blank")

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // Your actual Makes Easy logo
  const logoBase64 =
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
      <path d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" stroke="#000000" strokeWidth="1.5" />
      <path d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" stroke="#000000" strokeWidth="1.5" />
      <path d="M8.25 9.75L10.5 12L10.5 16M8.25 10.5C8.66421 10.5 9 10.1642 9 9.75C9 9.33579 8.66421 9 8.25 9C7.83579 9 7.5 9.33579 7.5 9.75C7.5 10.1642 7.83579 10.5 8.25 10.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.75 9.75L13.5 12L13.5 16M15.75 10.5C15.3358 10.5 15 10.1642 15 9.75C15 9.33579 15.3358 9 15.75 9C16.1642 9 16.5 9.33579 16.5 9.75C16.5 10.1642 16.1642 10.5 15.75 10.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  `)

  // Calculate pagination - only create pages when needed
  const RECORDS_PER_PAGE = 30;
  const totalRecords = members.length;
  const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / RECORDS_PER_PAGE) : 1;
  
  // Generate table content with pagination
  const generateTablePages = () => {
    if (totalRecords === 0) {
      return `
        <div style="text-align: center; padding: 50px; color: #666; font-size: 14px;">
          <h3>No Members Found</h3>
          <p>No members match the current criteria.</p>
        </div>
      `;
    }

    let pagesHTML = '';
    
    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * RECORDS_PER_PAGE;
      const endIndex = Math.min(startIndex + RECORDS_PER_PAGE, totalRecords);
      const pageMembers = members.slice(startIndex, endIndex);
      
      pagesHTML += `
        <div class="page" ${page > 0 ? 'style="page-break-before: always;"' : ''}>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Waqt</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              ${pageMembers.map((member, index) => `
                <tr>
                  <td>${startIndex + index + 1}</td>
                  <td>${member.name}</td>
                  <td>${member.mobile}</td>
                  <td>${member.age || "N/A"}</td>
                  <td>${member.waqt}</td>
                  <td>${member.occupation}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${totalPages > 1 ? `<div class="page-number">Page ${page + 1} of ${totalPages}</div>` : ''}
        </div>
      `;
    }
    
    return pagesHTML;
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Members Report - Makes Easy</title>
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        
        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #333;
          margin: 0;
          padding: 0;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #000;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .header-right {
          text-align: right;
          font-size: 10px;
        }
        
        .logo {
          width: 30px;
          height: 30px;
        }
        
        .brand-name {
          font-size: 20px;
          font-weight: bold;
        }
        
        .report-title {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .report-title h1 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        
        .filter-info {
          text-align: center;
          margin-bottom: 15px;
          padding: 8px;
          background: #f0f0f0;
          font-size: 11px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        th {
          padding: 8px;
          background: #000;
          color: #fff;
          text-align: left;
          font-size: 11px;
          font-weight: bold;
        }
        
        th:first-child {
          text-align: center;
          width: 50px;
        }
        
        td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
          font-size: 11px;
        }
        
        td:first-child {
          text-align: center;
          font-weight: bold;
        }
        
        tbody tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .page-number {
          text-align: center;
          font-size: 10px;
          color: #666;
          margin-top: 10px;
        }
        
        .page {
          min-height: calc(100vh - 40px);
        }
        
        @media print {
          body {
            font-size: 10px;
          }
          
          th, td {
            padding: 6px;
            font-size: 9px;
          }
          
          .header {
            margin-bottom: 15px;
          }
          
          .logo {
            width: 25px;
            height: 25px;
          }
          
          .brand-name {
            font-size: 16px;
          }
          
          .report-title h1 {
            font-size: 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-left">
          <img src="${logoBase64}" alt="Makes Easy Logo" class="logo">
          <span class="brand-name">Makes Easy</span>
        </div>
        <div class="header-right">
          <div><strong>Report ID:</strong> ME-${Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
          <div><strong>Date:</strong> ${currentDate}</div>
          <div><strong>Time:</strong> ${currentTime}</div>
        </div>
      </div>
      
      <div class="report-title">
        <h1>Members Report</h1>
      </div>
      
      ${isFiltered ? `
        <div class="filter-info">
          <strong>Filtered Results:</strong> "${searchTerm}" | Showing ${totalRecords} records
        </div>
      ` : `
        <div class="filter-info">
          <strong>Total Members:</strong> ${totalRecords}
        </div>
      `}
      
      ${generateTablePages()}
      
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Auto print and handle window closing
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      
      // Close window after print
      printWindow.onafterprint = () => {
        printWindow.close();
      };
      
      // Alternative: close window if user cancels print
      setTimeout(() => {
        if (!printWindow.closed) {
          printWindow.close();
        }
      }, 3000);
    }, 500);
  };
};  


export const Members = () => {
  const [editing, setEditing] = useState(false);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
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
      const filtered = people.filter((member) =>
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
      await axios.put("http://localhost:5169/api/People/UpdatePeople", data);
      toast.success("Member updated Successfully");
      await getPeople();
      setShowModal(false);
    } else {
      var res = axios.post(
        "http://localhost:5169/api/People/InsertPeople/3/1/1/1/1",
        data
      );
      reset();
      toast.success("Member added successfully!");
    }
  };

  const Delete = async (id) => {
    let res = await axios.delete(
      `http://localhost:5169/api/People/DeletePeople/${id}`
    );

    if (res.status === 200) {
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
    var res = await axios.get("http://localhost:5169/Location/GetOccupations");
    await getPeople();
    var talha = res.data.occupation;
    setOccupation(talha);
  };

  const getPeople = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5169/api/People/GetPeopleByVillage",
        {
          withCredentials: true,
        }
      );
      setPeople(res.data.people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const isFiltered = searchTerm !== "";
      generateProfessionalPDF(filteredPeople, isFiltered, searchTerm);
      setIsDownloading(false);
      toast.success("PDF generated successfully!");
    }, 500);
  };

  useEffect(() => {
    handleOccupation();
    getPeople();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="navbar border-b-2 border-gray-200 shadow-sm">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="p-4 lg:p-16  pt-16 ">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Members</h1>
              <p className="text-gray-600 mt-1">Manage your organization members</p>
            </div>
          </div>
          
          {/* Enhanced Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading || filteredPeople.length === 0}
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span className="ml-2 hidden sm:inline">
                  {isDownloading ? 'Generating...' : 'Download PDF'}
                </span>
              </button>

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
                className="flex items-center justify-center bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span className="ml-2">Add Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{people.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Filtered Results</p>
                <p className="text-3xl font-bold text-gray-900">{filteredPeople.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Filter className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Occupations</p>
                <p className="text-3xl font-bold text-gray-900">{new Set(people.map(p => p.occupation)).size}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Age</p>
                <p className="text-3xl font-bold text-gray-900">
                  {people.length > 0 ? Math.round(people.reduce((sum, p) => sum + (p.age || 0), 0) / people.length) : 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Members Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <div className="px-6 py-4 bg-gradient-to-r from-black to-gray-800 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Member List
              </h2>
              {searchTerm && (
                <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                  {filteredPeople.length} of {people.length} members
                </span>
              )}
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-y-auto max-h-[600px]">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Waqt</th>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Occupation</th>
                  <th className="px-6 py-4 text-left text-gray-900 text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPeople.map((member, index) => (
                  <tr key={member.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-gray-600 font-medium text-sm">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{member.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{member.age || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.waqt}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{member.occupation}</td>
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
                          className="p-2 rounded-full hover:bg-blue-100 transition-colors group"
                        >
                          <Edit size={16} className="text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => deletePeople(member.id)}
                          className="p-2 rounded-full hover:bg-red-100 transition-colors group"
                        >
                          <Trash2 size={16} className="text-red-600 group-hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Mobile Card View */}
          <div className="lg:hidden max-h-[600px] overflow-y-auto">
            {filteredPeople.map((member, index) => (
              <div key={member.id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-medium">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.mobile}</p>
                    </div>
                  </div>
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
                      className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => deletePeople(member.id)}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-1 font-medium">{member.age || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {member.waqt}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-500">Occupation:</span>
                    <span className="ml-1 font-medium">{member.occupation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPeople.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No members found" : "No members yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? `No members match "${searchTerm}"`
                  : "Get started by adding a new member."}
              </p>
              {!searchTerm && (
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
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add your first member
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  {editing ? <Edit className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {editing ? "Update Member" : "Add New Member"}
                </h1>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(false);
                  }}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register("name", {
                    required: "Full name is required",
                  })}
                  type="text"
                  name="name"
                  id="fullName"
                  placeholder="Enter full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.name?.message}
                  </span>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Please enter a valid 10-digit mobile number",
                    },
                  })}
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter mobile number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
                {errors.mobile && (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.mobile?.message}
                  </span>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
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
                  placeholder="Enter age"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
                {errors.age && (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.age?.message}
                  </span>
                )}
              </div>

              {/* Waqt Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waqt
                </label>
                <select
                  {...register("waqt", {
                    required: "Please select a Waqt",
                  })}
                  name="waqt"
                  id="waqt"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Waqt</option>
                  <option value="4 Month">4 Month</option>
                  <option value="40 Days">40 Days</option>
                  <option value="10 Days">10 Days</option>
                  <option value="3 Days">3 Days</option>
                </select>
                {errors.waqt && (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.waqt?.message}
                  </span>
                )}
              </div>

              {/* Occupation Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <select
                  {...register("occupationId", {
                    required: "Occupation is required",
                  })}
                  name="occupationId"
                  id="occupation"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Occupation</option>
                  {occupation.map((val) => (
                    <option key={val.id} value={val.id}>
                      {val.occupation}
                    </option>
                  ))}
                </select>
                {errors.occupationId && (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {errors.occupationId?.message}
                  </span>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditing(false);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {editing ? <Edit className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {editing ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};