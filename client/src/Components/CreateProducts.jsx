import React, { useState } from "react";
import axios from "axios";

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    phoneNumber: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change for image
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit product data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);
    formData.append("phoneNumber", productData.phoneNumber);
    if (imageFile) {
      formData.append("imageUrl", imageFile); // Using "imageUrl" field for image upload
    }

    try {
      await axios.post("http://localhost:4001/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product created successfully!");
      setProductData({
        name: "",
        quantity: "",
        price: "",
        phoneNumber: "",
      });
      setImageFile(null);
    } catch (err) {
      setMessage("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Create New Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={productData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Product
          </button>
        </form>

        {/* Display message */}
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default CreateProductForm;
