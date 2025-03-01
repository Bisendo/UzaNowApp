import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaServicestack, FaUserCircle, FaStore } from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdNotifications } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa"; // Importing FaArrowUp
import serviceImage from "../images/image7.jpg";
import SellerImage from "../images/about.jpg";
import AdminImage from "../images/image3.jpg";
import axios from "axios";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user_name,setUsername ] = useState([]);


  useEffect(()=>{
    // FETCH USERNAME  FROM BACKEND
    axios.get("http://localhost:4001/auth").then((response)=>{
      setUsername(response.data);
    })
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-700 text-white flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">UzaNow</h1>
        </div>
        <nav className="space-y-4">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Home
          </Link>

          <Link
            to="/admin_login"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaUserShield size={20} className="mr-2" />
            Admin
          </Link>

          <Link
            to="/seller|login"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaStore size={20} className="mr-2" />
            Seller
          </Link>

          <Link
            to="/service"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaServicestack size={20} className="mr-2" />
            Service
          </Link>

          <Link
            to="/aboutus"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <MdContactMail size={20} className="mr-2" />
            About Us
          </Link>

          <Link
            to="/login"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <MdExitToApp size={20} className="mr-2" />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 relative">
        {/* Navbar */}
        <header className="bg-blue-700 shadow flex justify-between items-center px-4 py-4">
  {/* Toggle button for mobile */}
  <button
    onClick={toggleSidebar}
    className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  {/* Left side content (optional logo or other items) */}
  <div className="flex items-center space-x-4">
    {/* You can add logo or any other items here */}
  </div>

  {/* Notification and Profile for desktop, aligned to the right */}
  <div className="ml-auto flex items-center space-x-4">

    <MdNotifications size={24} className="text-white cursor-pointer" />
    <FaUserCircle size={24} className="text-white cursor-pointer" />
    {user_name.map((value,key)=>{ return <div></div> })}

 
  </div>
</header>
        {/* Content */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-800">
                Our Services
              </h3>
              <img
                src={serviceImage}
                alt="Our Services"
                className="mt-4 w-full rounded-lg"
              />
              <p className="mt-4 text-blue-600">
                <Link
                  to="/service"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-all"
                >
                  View Service
                </Link>
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-800">Seller</h3>
              <img
                src={SellerImage}
                alt="Seller"
                className="mt-4 w-full rounded-lg"
              />
              <p className="mt-4 text-blue-600">
                <Link
                  to="/seller_login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-all"
                >
                  View Seller
                </Link>
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-800">Admin</h3>
              <img
                src={AdminImage}
                alt="Admin"
                className="mt-4 w-full rounded-lg"
              />
              <p className="mt-4 text-blue-600">
                <Link
                  to="/admin_login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-all"
                >
                  View Admin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll-to-top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-200"
      >
        <FaArrowUp size={24} />
      </button>

      {/* Overlay for Sidebar (Mobile Only) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
