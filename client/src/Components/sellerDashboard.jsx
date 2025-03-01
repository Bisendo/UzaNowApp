import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaServicestack,
  FaUserCircle,
  FaStore,
  FaArrowUp,
} from "react-icons/fa";
import { MdContactMail, MdExitToApp, MdNotifications } from "react-icons/md";
import axios from "axios";

const SellerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerId, setSellerId] = useState(""); // Store the seller's id

  useEffect(() => {
    const id = sessionStorage.getItem("sellerId");
    const username = sessionStorage.getItem("sellerUsername");

    if (id && username) {
      setSellerId(id);
      setSellerName(username); // Set the seller's name from sessionStorage
    } else if (id) {
      // Fetch seller data from backend if username is not in sessionStorage
      axios
        .get(`http://localhost:4001/sellers/${id}`)
        .then((response) => {
          setSellerName(response.data.username); // Update with fetched username
          setSellerId(response.data.id); // Ensure id is also fetched and updated
        })
        .catch((error) => {
          console.error("Error fetching seller data:", error);
        });
    }

    // Cleanup on unmount
    return () => {
      setSellerName(""); // Reset seller data on unmount
      setSellerId(""); // Reset seller ID on unmount
    };
  }, []); // Empty array ensures this effect runs only once when the component mounts

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-blue-700 text-white flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="p-6 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        </div>
        <nav className="space-y-4">
          <Link
            to="/seller_home"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaHome size={20} className="mr-2" />
            Home
          </Link>

          <Link
            to="/seller/manage-products"
            state={{ sellerId, sellerName }} // Passing sellerId and sellerName
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaStore size={20} className="mr-2" />
            Manage Products
          </Link>

          <Link
            to="/orders"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <FaServicestack size={20} className="mr-2" />
            Orders
          </Link>

          <Link
            to="/messages"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <MdContactMail size={20} className="mr-2" />
            Messages
          </Link>

          <Link
            to="/login"
            className="block py-2.5 px-4 rounded-lg hover:bg-blue-800 transition text-white flex items-center"
          >
            <MdExitToApp size={20} className="mr-2" />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 relative px-4 py-6">
        {/* Navbar */}
        <header className="bg-blue-700 shadow-md flex justify-between items-center p-4 rounded-lg">
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

          {/* Notification and Profile for desktop */}
          <div className="ml-auto flex items-center space-x-4">
            <MdNotifications size={24} className="text-white cursor-pointer" />
            <FaUserCircle size={24} className="text-white cursor-pointer" />
            {/* Display Seller's Name and ID */}
            <span className="text-white text-lg">
              {sellerName} (ID: {sellerId ? sellerId : "Loading..."})
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards for Manage Products, Orders, etc. */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Manage Products</h3>
            <p className="text-gray-700 mb-4">
              View and manage your products here. Add, update, or remove items
              from your store.
            </p>
            <Link
              to="/seller/manage-products"
              state={{ sellerId, sellerName }} // Passing sellerId and sellerName
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Go to Manage Products
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Orders</h3>
            <p className="text-gray-700 mb-4">
              View and manage the orders placed by your customers. Check order
              status, shipment, etc.
            </p>
            <Link
              to="/orders"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Go to Orders
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Messages</h3>
            <p className="text-gray-700 mb-4">
              Stay connected with your customers through messages. Respond to
              inquiries and feedback.
            </p>
            <Link
              to="/messages"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Go to Messages
            </Link>
          </div>
        </div>

        {/* Scroll-to-top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-200"
        >
          <FaArrowUp size={24} />
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

export default SellerDashboard;
