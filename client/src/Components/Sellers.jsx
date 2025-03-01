import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserCircle, FaArrowUp } from "react-icons/fa";
import { MdDashboard, MdNotifications } from "react-icons/md";

const SellerPage = () => {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");

  // Fetch sellers from the backend
  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/sellers");
      setSellers(response.data);
    } catch (err) {
      setError("Failed to fetch sellers data.");
    }
  };

  // Function to suspend a seller
  const suspendSeller = async (id) => {
    try {
      await axios.patch(`http://localhost:4001/sellers/${id}/status`, { status: "suspended" });
      setSellers(sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "suspended" } : seller
      ));
    } catch (err) {
      setError("Failed to suspend seller.");
    }
  };

  // Function to activate a seller
  const activateSeller = async (id) => {
    try {
      await axios.patch(`http://localhost:4001/sellers/${id}/status`, { status: "active" });
      setSellers(sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "active" } : seller
      ));
    } catch (err) {
      setError("Failed to activate seller.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-6">UzaNow</h1>
          <nav className="space-y-6">
            <Link to="/dashboard" className="flex items-center py-2 text-white hover:bg-blue-700 px-4 rounded">
              <MdDashboard size={20} className="mr-3" /> Dashboard
            </Link>
            <Link to="/sellers" className="flex items-center py-2 text-white hover:bg-blue-700 px-4 rounded">
              <FaUserCircle size={20} className="mr-3" /> Sellers
            </Link>
          </nav>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="self-center mt-auto bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          <FaArrowUp size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-white">
        <header className="flex justify-between items-center bg-blue-600 p-4 text-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Manage Sellers</h2>
          <MdNotifications size={24} className="cursor-pointer" />
        </header>

        <section className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          <h3 className="text-xl font-semibold mb-4">Sellers List</h3>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border rounded-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{seller.id}</td>
                    <td className="py-3 px-4">{seller.username}</td>
                    <td className="py-3 px-4">{seller.email}</td>
                    <td className="py-3 px-4">{seller.phoneNumber}</td>
                    <td className="py-3 px-4">{seller.status}</td>
                    <td className="py-3 px-4 flex space-x-3">
                      {seller.status === "active" ? (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                          onClick={() => suspendSeller(seller.id)}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                          onClick={() => activateSeller(seller.id)}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerPage;
