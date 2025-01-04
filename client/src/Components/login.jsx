import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Import lock icon
import loginImage from "../images/login.jpg"; // Adjust path as needed
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); // To store error message
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:4001/auth/login", data)
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Check if it's a response error and set the error message
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error); // Set error message from the server
        } else {
          setErrorMessage("An error occurred. Please try again."); // Default error message
        }
      });
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
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </div>
        </div>
      </nav>

      {/* Login Form Section */}
      <div className="flex flex-col lg:flex-row max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginImage}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login to Your Account
          </h2>
          
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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
              onClick={login}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

          {/* Links for 'Forgot Password?' and 'Login as Admin' */}
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <FaLock className="mr-2" />
              Forgot Password?
            </Link>
            <Link
              to="/admin_login"
              className="text-blue-700 no-underline hover:underline text-sm"
            >
              Login as Admin
            </Link>
          </div>

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
