import React from "react";

const products = [
  { id: 1, name: "Product 1", price: "$50", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: "$75", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", price: "$100", image: "https://via.placeholder.com/150" },
];

function SellerMessage() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Seller Info Section */}
      <div className="text-center mb-10">
        <img
          src="https://via.placeholder.com/100"
          alt="Seller"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">John's Electronics</h2>
        <p className="text-gray-500">⭐⭐⭐⭐ (150 reviews)</p>
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerMessage;
