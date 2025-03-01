const express = require("express");
const router = express.Router();
const { Sellers } = require("../models"); // Ensure the Sellers model is defined in models
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// SELLER REGISTER
router.post("/", async (req, res) => {
  try {
    const { phoneNumber, username, email, password } = req.body;

    // Validate input
    if (!phoneNumber || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Hash the password with a stronger salt rounds (optional)
    const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds is a good default

    // Create the seller
    const newSeller = await Sellers.create({
      phoneNumber,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Seller registered successfully!",
      seller: newSeller,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to register seller." });
  }
});

// LOGIN SELLERS
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find the seller by email
    const seller = await Sellers.findOne({ where: { email } });
    if (!seller) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate a token (set an expiration of 1 hour)
    const accessToken = sign(
      { email: seller.email, id: seller.id },
      "importantsecret",
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({
      success: true,
      message: "Login successful",
      accessToken, // Send the access token back
      id: seller.id, // Send seller id
      username: seller.username, // Send seller username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});


// FETCH ALL SELLERS
router.get("/", async (req, res) => {
  try {
    const sellers = await Sellers.findAll(); // Fetch all sellers
    res.status(200).json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sellers." });
  }
});

// FETCH SINGLE SELLER BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Sellers.findByPk(id);
    
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }

    res.status(200).json(seller); // Send back the seller data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch seller." });
  }
});

// DELETE A SELLER
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Sellers.findByPk(id); // Find seller by primary key (ID)

    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }

    await seller.destroy(); // Delete the seller
    res.status(200).json({ success: true, message: "Seller deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete seller." });
  }
});

// UPDATE SELLER STATUS (Activate / Suspend)
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate that the status is one of the allowed values
  if (!["active", "inactive", "pending", "banned", "suspended"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    // Find the seller by ID
    const seller = await Sellers.findByPk(id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }

    // Check if the status is changing to "active" and handle accordingly
    if (status === "active" && seller.status === "active") {
      return res.status(400).json({ error: "Seller is already active." });
    }

    // Update the seller's status
    seller.status = status;
    await seller.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: `Seller status updated to ${status}`,
      seller: seller, // Optionally return the updated seller object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update seller status." });
  }
});

module.exports = router;
