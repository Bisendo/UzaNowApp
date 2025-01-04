import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaServicestack, FaUserCircle } from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdNotifications } from "react-icons/md";

const Seller = () => {
  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { phone, username, password, email } = formData;
    if (!phone || !username || !password || !email) {
      setError("All fields are required!");
      return;
    }

    setError(""); // Clear error
    console.log("Form submitted:", formData);
    alert("Seller information submitted successfully!");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-500">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-500 text-black flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-4">UzaNow</h1>
        </div>
        <nav className="space-y-2 ">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition text-white duration-200 flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Home
          </Link>

          <Link
            to="/service"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition text-white duration-200 flex items-center"
          >
            <FaServicestack size={20} className="mr-2" />
            Service
          </Link>

          <Link
            to="/aboutus"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdContactMail className="mr-2 hover:text-black" size={20} />
            About Us
          </Link>

          <Link
            to="/login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdExitToApp className="mr-2 hover:text-white" size={20} />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 relative">
        {/* Navbar */}
        <header className="bg-blue-500 shadow flex justify-between items-center px-4 py-4">
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

          {/* Logo and notification for mobile */}
          <div className="flex items-center space-x-4">
            <MdNotifications
              size={24}
              className="text-white md:hidden cursor-pointer"
            />
            {/* Profile Icon */}
            <FaUserCircle
              size={24}
              className="text-white md:hidden cursor-pointer"
            />
          </div>

          {/* Notification and Profile for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <MdNotifications size={24} className="text-white cursor-pointer" />
            {/* Profile Icon */}
            <FaUserCircle size={24} className="text-white cursor-pointer" />
          </div>
        </header>

        <div className="flex items-center justify-center min-h-full p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
              Seller Registration
            </h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>

              <div className="text-center">
                <span className="text-black">If you have an account?</span>{" "}
                <Link
                  to="/seller_login"
                  className="text-sm text-blue-600 no-underline hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>


      {/* Overlay for Sidebar (Mobile Only) */}
    
    </div>
  );
};

export default Seller;
