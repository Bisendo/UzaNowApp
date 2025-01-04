import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdExitToApp } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const SellerLoginForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", { email, password });
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
            to="/dashboard"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdDashboard className="mr-2" size={20} />
            Dashboard
          </Link>
         
         
          <Link
            to="/setting"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <FiSettings className="mr-2" size={20} color="white" />
            Setting
          </Link>
          <Link
            to="/admin_login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 hover:text-white text-white transition duration-200 flex items-center"
          >
            <MdExitToApp className="mr-2 hover:text-white" size={20} />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
            Seller Login
          </h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>

          <div className="text-center mt-4">
              <span className="text-black">Don't have an account? </span>
              <Link
                to="/Seller_register"
                className="text-sm text-blue-600 no-underline hover:underline"
              >
                Register
              </Link>
            </div>
        </form>
      </main>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default SellerLoginForm;
