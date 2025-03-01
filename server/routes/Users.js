const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// Get all users (for debugging or admin purposes)
router.get('/', async (req, res) => {
  try {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Register a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json("Registration successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route to authenticate the user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await Users.findOne({ where: { username } });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect username or password" });
    }

    // Return success message along with user info (id and username)
    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
