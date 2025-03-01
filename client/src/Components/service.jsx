import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaShoppingCart,
} from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdNotifications } from "react-icons/md";
import axios from "axios";

const ServicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]); // Cart state for storing items
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Add product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Fetch user details and products on initial render
  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }

    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data : error.message);
      }
    };

    fetchProducts();
  }, []); // Fetch products only once on mount

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Please login to access services</h2>
          <Link
            to="/login"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

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
            to="/manage-product"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 text-white transition duration-200 flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Seller Management
          </Link>
          <Link
            to="/aboutus"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 text-white transition duration-200 flex items-center"
          >
            <MdContactMail className="mr-2" size={20} />
            About Us
          </Link>
          <Link
            to="/login"
            className="block py-2.5 px-4 rounded hover:bg-blue-700 text-white transition duration-200 flex items-center"
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

            {/* Cart Icon with item count */}
            <div className="relative">
              <FaShoppingCart size={24} className="text-white cursor-pointer" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="text-lg font-semibold mb-4">
            Welcome, {username || "User"}! {/* Display the username */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Map through fetched products and display them */}
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-full overflow-hidden rounded-t-lg">
                    <img
                      src={`http://localhost:4001/uploads/${
                        product.image || "default-image.jpg"
                      }`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-black font-bold text-center">
                      {product.name}
                    </p>
                    <p className="text-black font-semibold text-center">
                      Quantity:{" "}
                      <span className="font-bold text-blue-700">
                        {product.quantity}
                      </span>
                    </p>
                    <p className="text-black font-semibold text-center">
                      Phone Number: <br />
                      <span className="text-blue-700">
                        {product.phoneNumber}
                      </span>
                    </p>
                    <p className="text-gray-600 font-semibold text-center">
                      Tsh {product.price}/=
                    </p>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Add <FaShoppingCart size={16} className="inline ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products available.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
