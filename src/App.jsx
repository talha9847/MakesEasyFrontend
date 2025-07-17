import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./components/Sign";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import { Dashboard } from "./AdminComponents/Dashboard";
import User from "./AdminComponents/User";
import { Memb } from "./AdminComponents/Memb";
import Student from "./AdminComponents/Student";
import Try from "./components/Try";
import { Members } from "./AdminComponents/Members";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import SignOne from "./components/Sign2";
import FourMonth from "./AdminComponents/FourMonth";
import FourtyDays from "./AdminComponents/FourtyDays";
import Companions from "./AdminComponents/Companions";
import Companion from "./AdminComponents/Companion";
import UDashboard from "./UserComponents/UDashboard";
import { UMembers } from "./UserComponents/UMembers";
import UStudent from "./UserComponents/UStudent";
 const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/signup" element={<Sign />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/users" element={<User />} />
            <Route path="/admin/members" element={<Memb />} />
            <Route path="admin/students" element={<Student />} />
            <Route path="admin/talha" element={<Members/>}/>
            <Route path="admin/Try" element={<Try />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/updatepassword" element={<UpdatePassword />} />
            <Route path="/signone" element={<SignOne />} />
            <Route path="/admin/fourmonth" element={<FourMonth />} />
            <Route path="/admin/fourtydays" element={<FourtyDays />} />
            <Route path="/admin/companions" element={<Companions />} />
            <Route path="/admin/companion" element={<Companion />} />
            <Route path="/user/dashboard" element={<UDashboard />} />
            <Route path="/user/members" element={<UMembers />} />
            <Route path="/user/students" element={<UStudent />} />
          </Routes>
        </div>
        <Footer /> {/* Footer will stay at the bottom */}
      </div>
    </Router>
  );
};

export default App;
