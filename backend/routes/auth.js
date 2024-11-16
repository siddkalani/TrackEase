const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const jwt = require('jsonwebtoken'); // For token generation

const JWT_SECRET = 'House123#';

router.post('/createUser', async (req, res) => {
    try {
      const { name, password, Wallet } = req.body;
  
      // Validate the input
      if (!name || !password) {
        return res.status(400).json({ error: 'Name and Password are required.' });
      }
  
      // Create the user
      const newUser = new User({ name, password, Wallet: Wallet || 0 });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 11000) { // Duplicate key error for unique fields
        res.status(400).json({ error: 'Password must be unique.' });
      } else {
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { name, password } = req.body;
  
      // Validate input
      if (!name || !password) {
        return res.status(400).json({ error: 'Name and Password are required.' });
      }
  
      // Find the user by name
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the password matches
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });


module.exports=router;