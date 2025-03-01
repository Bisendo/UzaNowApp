import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../images/login.jpg";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginTypeSelection = (type) => {
    if (type === "seller") {
      navigate("/seller|login");
    } else {
      navigate("/admin_login");
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
      const response = await axios.post("http://localhost:4001/auth/login", loginData);
      const { username, id } = response.data; // Extract user data from response

      // Store the username and userId in localStorage for later use
      localStorage.setItem("username", username);
      localStorage.setItem("userId", id);

      // Redirect to the service page (or wherever the user should go)
      navigate("/service");
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-lg font-semibold">
            <Link to="/" className="hover:text-gray-200">
              UzaNow
            </Link>
          </div>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginImage}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form & Selection Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Select Login Type or Login Below
          </h2>

          {/* Login Type Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleLoginTypeSelection("seller")}
              className="py-2 px-4 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Login as Seller
            </button>
            <button
              onClick={() => handleLoginTypeSelection("admin")}
              className="py-2 px-4 font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
            >
              Login as Admin
            </button>
          </div>

          {/* Normal User Login Form */}
          <form onSubmit={handleUserLogin}>
            {/* Username Input */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Username"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Password"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login as User
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/register"
              className="text-sm text-blue-600 no-underline hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
