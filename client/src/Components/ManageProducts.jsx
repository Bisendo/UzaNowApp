import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaArrowUp, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

const ManageProduct = () => {
  const location = useLocation();
  const sellerId = location.state?.sellerId || '';
  const sellerName = location.state?.sellerName || '';
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    phoneNumber: '',
    seller_id: sellerId,
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products when sellerId changes
  useEffect(() => {
    if (sellerId) {
      axios.get(`http://localhost:4001/products?seller_id=${sellerId}`)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, [sellerId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit (add or edit product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('seller_id', formData.seller_id);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingProduct) {
        // Edit product
        await axios.put(`http://localhost:4001/products/${editingProduct.id}`, data);
        alert('Product updated successfully!');
      } else {
        // Add new product
        await axios.post('http://localhost:4001/products', data);
        alert('Product added successfully!');
      }
      // Re-fetch products after an action
      fetchProducts();
      // Reset the form after submitting
      resetForm();
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  // Fetch products from the backend
  const fetchProducts = () => {
    setLoading(true);
    axios.get(`http://localhost:4001/products?seller_id=${sellerId}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  // Reset the form to its initial state
  const resetForm = () => {
    setFormData({
      name: '',
      quantity: '',
      price: '',
      phoneNumber: '',
      seller_id: sellerId,
      image: null,
    });
    setEditingProduct(null); // Clear the editing product
  };

  // Delete a product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      alert('Product deleted successfully!');
      fetchProducts();  // Refresh product list after deletion
      resetForm();  // Reset the form after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      phoneNumber: product.phoneNumber,
      seller_id: product.seller_id,
      image: null,
    });
    setEditingProduct(product);
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl text-white font-bold">Manage Products</h1>
        <div className="flex items-center space-x-4">
          <MdNotifications size={24} className="text-white cursor-pointer" />
          <FaUserCircle size={24} className="text-white cursor-pointer" />
          <p className="text-white">{sellerName}, (ID: {sellerId})</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>

          {/* Product List */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Product List</h3>

            {loading ? (
              <p className="text-center text-gray-600">Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
                    >
                      <div className="text-center">
                        <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                        <p className="text-gray-600">Price: Tsh {product.price}</p>
                        <p className="text-gray-600">Phone: {product.phoneNumber}</p>
                        {product.image && (
                          <div className="mt-4">
                            <img
                              src={`http://localhost:4001/${product.image}`}
                              alt="Product"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No products found for this seller.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
      >
        <FaArrowUp size={24} />
      </button>
    </div>
  );
};

export default ManageProduct;
