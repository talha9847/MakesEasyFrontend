"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  UserCheck,
  UserX,
  Filter,
  Menu,
} from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [status, setStatus] = useState("approved");
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState({
    approved: [],
    pending: [],
    rejected: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      var response = await axios.get(
        "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/User/GetUsers",
        { withCredentials: true }
      );
      var data = response.data;
      setLength({
        approved: data.approved,
        pending: data.pending,
        rejected: data.rejected,
      });

      const talha = data[status];

      setUsers(talha);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  const handleUpdateStatus = async (userId, status) => {
    console.log(userId);
    console.log(status);

    try {
      const response = await axios.patch(
        `https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/User/UpdateStatus/${userId}/${status}`,{},
        { withCredentials: true }
      );
      console.log("Server response:", response.data);
    } catch (error) {}
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgb(208,187,55)] text-white">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        className="mt-16 sm:mt-0"
      />

      <Navbar />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      
      <div className="flex flex-col flex-1 lg:mx-8">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-black">User Management</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:py-16 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            {/* Header section */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-black hidden lg:block">
                  User Management
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  View and manage user accounts
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Main content card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Search header */}
              <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <h3 className="text-lg leading-6 font-medium text-black">
                    Users
                  </h3>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 h-9 w-full sm:w-64 rounded-md border border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="px-2 sm:px-4 lg:px-6 py-4 sm:py-5">
                {/* Status tabs */}
                <div className="mb-4 sm:mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                      <button
                        onClick={() => setStatus("approved")}
                        className={`flex-1 py-3 sm:py-4 px-1 text-center border-b-2 font-medium text-xs sm:text-sm ${
                          status === "approved"
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Approved</span>
                          <span className="sm:hidden">App.</span>
                          <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.approved.length}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStatus("pending")}
                        className={`flex-1 py-3 sm:py-4 px-1 text-center border-b-2 font-medium text-xs sm:text-sm ${
                          status === "pending"
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Pending</span>
                          <span className="sm:hidden">Pend.</span>
                          <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.pending.length}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStatus("rejected")}
                        className={`flex-1 py-3 sm:py-4 px-1 text-center border-b-2 font-medium text-xs sm:text-sm ${
                          status === "rejected"
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Rejected</span>
                          <span className="sm:hidden">Rej.</span>
                          <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                            {length.rejected.length}
                          </span>
                        </div>
                      </button>
                    </nav>
                  </div>
                </div>

                {/* Table section */}
                <div className="mt-4 sm:mt-6">
                  {/* Mobile card view */}
                  <div className="block sm:hidden space-y-4">
                    {users.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-500">No users found</p>
                      </div>
                    ) : (
                      users.map((user) => (
                        <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                <span className="font-medium text-sm">
                                  {user.name.charAt(0).toUpperCase()}
                                  {user.name.split(" ")[1] ? user.name.split(" ")[1][0].toUpperCase() : ''}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-black truncate">
                                  {user.name.toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {user.email}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.mobile}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <div
                                className={
                                  user.status == "Approved" || user.status == "Rejected"
                                    ? "cursor-pointer"
                                    : ""
                                }
                                onClick={() => {
                                  if (user.status == "Approved") {
                                    handleUpdateStatus(user.id, "Pending").then(() => {
                                      toast.info(`Heads up! ${user.name.toUpperCase()}'s status is now set to PENDING.`);
                                      fetchData();
                                    });
                                  } else if (user.status === "Rejected") {
                                    handleUpdateStatus(user.id, "Approved").then(() => {
                                      toast.warning(`⚠️ Status Update: ${user.name.toUpperCase()} is now approved.`);
                                      fetchData();
                                    });
                                  }
                                }}
                              >
                                {getStatusBadge(user.status)}
                              </div>
                              {status === "pending" && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => {
                                      handleUpdateStatus(user.id, "Approved").then(() => {
                                        toast.success(`${user.name.toUpperCase()} has been approved! 🎉`);
                                        fetchData();
                                      });
                                    }}
                                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100"
                                  >
                                    <UserCheck className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateStatus(user.id, "Rejected").then(() => {
                                        toast.warning(`⚠️ Unfortunately, ${user.name.toUpperCase()} has been rejected.`);
                                        fetchData();
                                      });
                                    }}
                                    className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100"
                                  >
                                    <UserX className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Desktop table view */}
                  <div className="hidden sm:block overflow-x-auto rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-black">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Mobile
                          </th>
                          <th
                            scope="col"
                            className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Status
                          </th>
                          {status === "pending" && (
                            <th
                              scope="col"
                              className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                          <tr>
                            <td
                              colSpan={status === "pending" ? 5 : 4}
                              className="px-6 py-4 text-center text-sm text-gray-500 hover:text-black"
                            >
                              No users found
                            </td>
                          </tr>
                        ) : (
                          users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                    <span className="font-medium text-xs sm:text-sm">
                                      {user.name.charAt(0).toUpperCase()}
                                      {user.name.split(" ")[1] ? user.name.split(" ")[1][0].toUpperCase() : ''}
                                    </span>
                                  </div>
                                  <div className="ml-2 sm:ml-4">
                                    <div className="text-xs sm:text-sm font-medium text-black hover:text-black cursor-pointer truncate max-w-32 sm:max-w-none">
                                      {user.name.toUpperCase()}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-black hover:text-black cursor-pointer">
                                <div className="truncate max-w-32 sm:max-w-none">
                                  {user.email}
                                </div>
                              </td>
                              <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-black">
                                {user.mobile}
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                <div
                                  className={
                                    user.status == "Approved" || user.status == "Rejected"
                                      ? "cursor-pointer"
                                      : ""
                                  }
                                  onClick={() => {
                                    if (user.status == "Approved") {
                                      handleUpdateStatus(user.id, "Pending").then(() => {
                                        toast.info(`Heads up! ${user.name.toUpperCase()}'s status is now set to PENDING.`);
                                        fetchData();
                                      });
                                    } else if (user.status === "Rejected") {
                                      handleUpdateStatus(user.id, "Approved").then(() => {
                                        toast.warning(`⚠️ Status Update: ${user.name.toUpperCase()} is now approved.`);
                                        fetchData();
                                      });
                                    }
                                  }}
                                >
                                  {getStatusBadge(user.status)}
                                </div>
                              </td>
                              {status === "pending" && (
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-1 sm:space-x-2">
                                    <button
                                      onClick={() => {
                                        handleUpdateStatus(user.id, "Approved").then(() => {
                                          toast.success(`${user.name.toUpperCase()} has been approved! 🎉`);
                                          fetchData();
                                        });
                                      }}
                                      className="inline-flex items-center px-2 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100"
                                    >
                                      <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                                      <span className="hidden lg:inline">Approve</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleUpdateStatus(user.id, "Rejected").then(() => {
                                          toast.warning(`⚠️ Unfortunately, ${user.name.toUpperCase()} has been rejected.`);
                                          fetchData();
                                        });
                                      }}
                                      className="inline-flex items-center px-2 sm:px-2.5 py-1 sm:py-1.5 border border-gray-300 text-xs font-medium rounded text-black bg-white hover:bg-gray-100"
                                    >
                                      <UserX className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                                      <span className="hidden lg:inline">Reject</span>
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;