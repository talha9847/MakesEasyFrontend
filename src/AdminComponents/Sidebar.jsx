import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="w-64 bg-black text-white fixed bottom-0 top-[6.7vh] left-0 p-5 h-[89.5vh]">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/admin/users" className="block">
              Manage Users
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/admin/members" className="block">
              Members
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/admin/students" className="block">
              Students
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/admin/settings" className="block">
              Site Settings
            </Link>
          </li>
          <li className="hover:bg-red-700 p-2 rounded">
            <Link to="/admin/logout" className="block">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
