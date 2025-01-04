import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for HTTP requests
import registerImage from "../images/image1.jpg"; // Adjust path as needed
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react"; // Import useState for mobile menu toggle

const RegisterPage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You must input a username"),
    email: Yup.string().required("You must input an email"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .max(15, "Password cannot exceed 15 characters")
      .required("You must input a password"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4001/auth", data).then((response) => {
      console.log("It worked");
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-lg font-semibold">
            <Link to="/" className="hover:text-gray-200">
              UzaNow
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
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
          </div>

          {/* Navbar Links for Desktop */}
          <div className="hidden lg:flex space-x-4">
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

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-blue-600 text-white py-4 px-6`}
        >
          <Link to="/" className="block py-2 hover:text-gray-200">
            Home
          </Link>
          <Link to="/login" className="block py-2 hover:text-gray-200">
            Login
          </Link>
          <Link to="/register" className="block py-2 hover:text-gray-200">
            Register
          </Link>
        </div>
      </nav>

      {/* Register Form Section */}
      <div className="flex flex-col lg:flex-row max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={registerImage}
            alt="Register Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          {/* Register Form */}
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Sign up to Your Account
          </h2>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
               Username
                </label>
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-600"
                />
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Username"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600"
                />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-600"
                />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign up
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-black">Already have an account? </span>{" "}
                <Link
                  to="/login"
                  className="text-sm text-blue-600 no-underline hover:underline"
                >
                  Login
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
