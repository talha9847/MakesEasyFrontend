import Navbar from "..//components/Navbar";
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Activity,
  PieChart,
  TrendingUp,
  Eye,
  Calendar as CalendarIcon,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UDashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    students: 0,
    "4Months": 0,
    "40Days": 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://makeseasy-hmahd6dwgmecc0ex.canadacentral-01.azurewebsites.net/api/People/GetCount",
          {
            withCredentials: true,
          }
        );
        setStats(res.data.count);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar />
      <div className="flex mt-10">
        {/* Sidebar - Hidden on mobile, visible on desktop */}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-20  transition-all duration-300">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome back! Here's an overview of your statistics
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Card 1 - Total Houses */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  12%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Houses
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  88
                </h3>
              </div>
            </div>

            {/* Card 2 - Members */}
            <div
              onClick={() => navigate("/admin/members")}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  8%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Members
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.members}
                </h3>
              </div>
            </div>

            {/* Card 3 - Students */}
            <div
              onClick={() => navigate("/admin/students")}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  3%
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Students
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.students}
                </h3>
              </div>
            </div>

            {/* Card 4 - 4 Months */}
            <div onClick={()=>{navigate("/admin/fourmonth")}} className="hover:cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  4 Month
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats["4Months"]}
                </h3>
              </div>
            </div>

            {/* Card 5 - 40 Days */}
            <div onClick={()=>{navigate("/admin/fourtydays")}} className="hover:cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl group-hover:from-rose-100 group-hover:to-rose-200 transition-all duration-300">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  40 Days
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats["40Days"]}
                </h3>
              </div>
            </div>
          </div>

          {/* Charts and Events Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 xl:col-span-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  Prayer Times Today
                </h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-sm">
                    Today
                  </button>
                </div>
              </div>

              <div className="h-48 sm:h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 overflow-y-auto">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 h-full">
                  {/* Fajr */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">F</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Fajr
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Azan: 5:12 AM</p>
                        <p>Jamat: 5:25 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Ishraq */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">I</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Ishraq
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">6:45 AM</p>
                    </div>
                  </div>

                  {/* Chasht */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">C</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Chasht
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">9:30 AM</p>
                    </div>
                  </div>

                  {/* Zuhr */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">Z</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Zuhr
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Azan: 12:35 PM</p>
                        <p>Jamat: 1:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Asr */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Asr
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Azan: 4:20 PM</p>
                        <p>Jamat: 4:35 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Maghrib */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Maghrib
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Azan: 7:15 PM</p>
                        <p>Jamat: 7:20 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Awwabin */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">Aw</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Awwabin
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">7:45 PM</p>
                    </div>
                  </div>

                  {/* Isha */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">Is</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Isha
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <p>Azan: 8:40 PM</p>
                        <p>Jamat: 9:00 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Subah Sadiq */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Subah Sadiq
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">4:58 AM</p>
                    </div>
                  </div>

                  {/* Tahajjud */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Tahajjud
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">3:30 AM</p>
                    </div>
                  </div>

                  {/* Tulu Aftab */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">TA</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Tulū' al-Fajr
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">6:15 AM</p>
                    </div>
                  </div>

                  {/* Zawal */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">Za</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Zawāl
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">12:30 PM</p>
                    </div>
                  </div>

                  {/* Gurub */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Ghurūb
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">7:10 PM</p>
                    </div>
                  </div>

                  {/* Sehri */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">Se</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Suhur
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">5:00 AM</p>
                    </div>
                  </div>

                  {/* Iftari */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white text-xs font-bold">If</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Iftar
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">7:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-6">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      Community Meeting
                    </p>
                    <p className="text-sm text-gray-500">01/01/01</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      Property Inspection
                    </p>
                    <p className="text-sm text-gray-500">02/01/01</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      Maintenance Day
                    </p>
                    <p className="text-sm text-gray-500">03/01/01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities and Important Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  Notice Board
                </h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">
                      Important: Masjid cleaning drive this Friday
                    </p>
                    <p className="text-sm text-gray-500">Posted 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">
                      Ramadan Iftar arrangements updated
                    </p>
                    <p className="text-sm text-gray-500">Posted 4 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">
                      New Quran classes starting next week
                    </p>
                    <p className="text-sm text-gray-500">Posted 1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">
                      Donation drive for flood relief continues
                    </p>
                    <p className="text-sm text-gray-500">Posted 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  Important Dates
                </h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  View Calendar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-gradient-to-br from-gray-50 to-white">
                  <h4 className="font-bold text-gray-900 mb-3">Next 3 Days</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Meeting</span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        01/01/01
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Inspection
                      </span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        02/01/01
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Payment Due
                      </span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        03/01/01
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-gradient-to-br from-gray-50 to-white">
                  <h4 className="font-bold text-gray-900 mb-3">Upcoming</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Maintenance
                      </span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        01/01/01
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Community Event
                      </span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        02/01/01
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">
                        Board Meeting
                      </span>
                      <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        03/01/01
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UDashboard;
