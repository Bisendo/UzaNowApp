import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBox, FaUsers, FaUserTag, FaArrowUp } from "react-icons/fa";
import { MdExitToApp, MdNotifications, MdDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import UserImage from '../images/image2.jpg';
import ProductImage from '../images/product.jpg';
import OrderImage from '../images/image6.jpg';
import UsersImage from '../images/users.jpg';

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-600 text-white flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">UzaNow</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <MdDashboard className="mr-2" size={20} />
            Dashboard
          </Link>

          <Link
            to="/products"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <FaShoppingCart size={20} className="mr-2" />
            Products
          </Link>

          <Link
            to="/orders"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <FaBox size={20} className="mr-2" />
            Orders
          </Link>

          <Link
            to="/sellers"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <FaUserTag size={20} className="mr-2" />
            Sellers
          </Link>

          <Link
            to="/users"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <FaUsers className="mr-2" size={20} />
            Users
          </Link>

          <Link
            to="/setting"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <FiSettings className="mr-2" size={20} />
            Settings
          </Link>

          <Link
            to="/admin_login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition duration-200 flex items-center"
          >
            <MdExitToApp className="mr-2" size={20} />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 relative p-4 md:p-6">
        {/* Navbar */}
        <header className="bg-blue-600 shadow flex justify-between items-center px-4 py-4 m-0">
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

          <div className="flex items-center space-x-4 ml-auto">
            <MdNotifications size={24} className="text-white cursor-pointer" />
            <FaUserCircle size={24} className="text-white cursor-pointer" />
          </div>
        </header>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card: Products */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Products Overview</h3>
            <div className="flex items-center space-x-2">
              <img
                src={ProductImage}
                alt="Products"
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="text-xl font-bold">150</p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800"
            >
              View Products
            </Link>
          </div>

          {/* Card: Orders */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Orders Overview</h3>
            <div className="flex items-center space-x-2">
              <img
                src={OrderImage}
                alt="Orders"
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="text-xl font-bold">320</p>
            </div>
            <Link
              to="/orders"
              className="text-blue-600 hover:text-blue-800"
            >
              View Orders
            </Link>
          </div>

          {/* Card: Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Users Overview</h3>
            <div className="flex items-center space-x-2">
              <img
                src={UsersImage}
                alt="Users"
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="text-xl font-bold">500</p>
            </div>
            <Link
              to="/users"
              className="text-blue-600 hover:text-blue-800"
            >
              View Users
            </Link>
          </div>

          {/* Card: Settings */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Settings Overview</h3>
            <div className="flex items-center space-x-2">
              <img
                src={UserImage}
                alt="Settings"
                className="w-12 h-12 object-cover rounded-full"
              />
              <p className="text-xl font-bold">Active</p>
            </div>
            <Link
              to="/setting"
              className="text-blue-600 hover:text-blue-800"
            >
              View Settings
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="text-sm text-gray-500">Product Added: New Smartphone</span>
            </li>
            <li className="flex items-center">
              <span className="text-sm text-gray-500">Order Completed: #12345</span>
            </li>
            <li className="flex items-center">
              <span className="text-sm text-gray-500">User Registered: John Doe</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Scroll-to-top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
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

export default AdminPage;
