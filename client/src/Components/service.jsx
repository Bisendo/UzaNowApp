import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle, FaStore, FaArrowUp, FaSearch, FaBars } from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdDashboard, MdNotifications } from "react-icons/md";
import serviceImage from "../images/image8.jpg";

const ServicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-500 text-white flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-4">UzaNow</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 transition text-white duration-200 flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Home
          </Link>
          <Link
            to="/seller_login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition text-white duration-200 flex items-center"
          >
            <FaStore size={20} className="mr-2" />
            Seller
          </Link>
          <Link
            to="/aboutus"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdContactMail className="mr-2" size={20} />
            About Us
          </Link>
          <Link
            to="/dashboard"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdDashboard className="mr-2" size={20} />
            Dashboard
          </Link>
          <Link
            to="/login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdExitToApp className="mr-2" size={20} />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white relative">
        {/* Navbar */}
        <header className="bg-blue-500 shadow flex justify-between items-center px-4 py-4 z-20 sticky top-0">
          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={24} />
          </button>

          {/* Search Bar */}
          <div className="flex items-center w-1/3 bg-white rounded-md shadow-lg p-2">
            <FaSearch size={20} className="text-blue-500" />
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full p-2 focus:outline-none"
            />
          </div>

          {/* Navbar Icons */}
          <div className="flex items-center space-x-4">
            <MdNotifications size={24} className="text-white cursor-pointer" />
            <FaUserCircle size={24} className="text-white cursor-pointer" />
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Components */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="w-full overflow-hidden rounded-t-lg">
                  <img
                    src={serviceImage}
                    alt="Service"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-black font-bold text-center">Bag</p>
                  <p className="text-black font-semibold text-center">
                    Quantity: <span className="font-bold text-blue-700">12</span>
                  </p>
                  <p className="text-black font-semibold text-center">
                    Phone Number: <br />
                    <span className="text-blue-700">+255 655 344 222</span>
                  </p>
                  <p className="text-gray-600 font-semibold text-center">
                    Tsh 12000/=
                  </p>
                  <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      </main>

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

export default ServicePage;
