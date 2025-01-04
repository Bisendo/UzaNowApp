import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle} from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdNotifications } from "react-icons/md";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Admin authentication logic (replace with real authentication)
    if (email === "admin@gmail.com" && password === "password") {
      navigate("/admin");
    } else {
      setError("Invalid email or password.");
    }
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
        <nav className="space-y-2">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white transition text-white duration-200 flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Home
          </Link>

          <Link
            to="/aboutus"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdContactMail className="mr-2" size={20} />
            About Us
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
      <main className="flex-1 bg-gray-100 relative">
        {/* Navbar */}
        <header className="bg-blue-500 shadow flex justify-between items-center px-4 py-4">
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

          <div className="flex items-center space-x-4">
            <MdNotifications size={24} className="text-white md:hidden cursor-pointer" />
            <FaUserCircle size={24} className="text-white md:hidden cursor-pointer" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <MdNotifications size={24} className="text-white cursor-pointer" />
            <FaUserCircle size={24} className="text-white cursor-pointer" />
          </div>
        </header>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-full p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Admin Login</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
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

export default AdminLogin;
