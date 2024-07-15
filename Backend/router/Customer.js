const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Customer, HouseOwner } = require("../models"); // Ensure this matches your model name

const saltRounds = 10;
const jwtSecret = "683dd20d4bb0c4ebd7a44130c4f1b0020cce0405a71d4ab25708b61981d75b7247a9b274d3994d1954d52fd3888c986ddebc187cf4b2e5c63737caf94da5c0c4";

// Function to generate JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1d' });
}

// HouseOwner and Customer signup routes
router.post("/signup", async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check if email already exists
    const existingUser = await Customer.findOne({ where: { email } });
    const existingUser1 = await HouseOwner.findOne({ where: { mobile_number: number } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    if (existingUser1) {
      return res.status(400).json({ message: 'Mobile Number is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = await Customer.create({
      customer_name: name,
      email,
      mobile_number: number,
      password: hashedPassword,
    });
    console.log('New user created:', newUser); // Debugging line

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to log in after registration' });
      }
      const token = generateToken(newUser);
      res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          id: newUser.id,
          customer_name: newUser.customer_name,
          email: newUser.email,
          mobile_number: newUser.mobile_number,
        },
      });
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// HouseOwner and Customer login routes
router.post("/login", passport.authenticate('customer-local'), (req, res) => {
  console.log('User authenticated:', req.user); // Log authenticated user
  const token = generateToken(req.user);
  res.json({
    message: 'Login successful',
    token,
    user: req.user,
  });
});

module.exports = router;
