const express = require('express');
const multer = require('multer');
const { Products, Sellers } = require('../models'); // Correctly import the models
const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // You might want to specify storage options

// Create a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { name, quantity, price, phoneNumber, seller_id } = req.body;

  if (!name || !quantity || !price || !phoneNumber || !seller_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // If there's an uploaded file, save the image path to the database
    const image = req.file ? req.file.path : null;

    const newProduct = await Products.create({
      name,
      quantity,
      price,
      phoneNumber,
      seller_id,
      image, // Store the image path
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error submitting product:', err); // Logs detailed error
    res.status(500).json({ error: 'Failed to Create Product', message: err.message });
  }
});

// Get all products for a specific seller
router.get('/:seller_id', async (req, res) => {
  const sellerId = req.params.seller_id;

  try {
    const products = await Products.findAll({
      where: { seller_id: sellerId }, // Corrected column name to `seller_id`
      include: {
        model: Sellers, // Include the seller's info in the result
        attributes: ['id', 'username'], // Adjust according to your seller model attributes
      },
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a product by ID, including associated seller information
router.get('/', async (req, res) => {
  const sellerId = req.query.seller_id;

  // Ensure that sellerId is present
  if (!sellerId) {
    return res.status(400).json({ error: "Seller ID is required" });
  }

  try {
    // Query products based on seller_id and include seller details
    const products = await Products.findAll({
      where: {
        seller_id: sellerId, // Ensure seller_id is correctly passed in the query
      },
      include: {
        model: Sellers, // Include seller details
        attributes: ['id', 'username'], // Select only necessary fields from the Sellers table
      },
    });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for this seller" });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});



// Update a product by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, phoneNumber, seller_id } = req.body;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    // If there's an uploaded image, update the image path
    const image = req.file ? req.file.path : product.image;

    await product.update({
      name,
      quantity,
      price,
      phoneNumber,
      seller_id,
      image, // Update the image path
    });

    res.json({ message: 'Product Updated Successfully', product });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to Update Product' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Products.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.json({ message: 'Product Deleted Successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to Delete Product' });
  }
});

module.exports = router;
