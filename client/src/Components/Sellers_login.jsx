import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import axios from "axios";

const SellerLoginForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const login = async () => {
    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:4001/sellers/login", data);

      if (response.data.error) {
        alert(response.data.error);
      } else if (response.data.accessToken) {
        // Store access token, seller ID, and seller username in session storage
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("sellerId", response.data.id); // Save seller's ID
        sessionStorage.setItem("sellerName", response.data.username); // Save seller's name

        // You can optionally log the seller info to confirm it's saved correctly
        console.log("Seller ID:", response.data.id);
        console.log("Seller Name:", response.data.username);

        navigate("/seller/dashboard");
      } else {
        alert("Unexpected response format. Token not found.");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Seller does not exist! Please check your credentials.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-500">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-600 text-white flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20 shadow-lg`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">UzaNow</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/setting"
            className="block py-3 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <FiSettings className="mr-2" size={20} />
            Settings
          </Link>
          <Link
            to="/admin_login"
            className="block py-3 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <MdExitToApp className="mr-2" size={20} />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4 md:p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-6">
            Seller Login
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={login}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all font-semibold shadow-md"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/Seller_register" className="text-blue-600 font-medium hover:underline">
              Register
            </Link>
          </div>
        </div>
      </main>

      {/* Sidebar Overlay (for mobile) */}
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
