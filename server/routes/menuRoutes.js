const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem'); // Adjust path as needed
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Apply rate limiting to all menu routes
const menuLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: { message: 'Too many requests, please try again later.' }
});
router.use(menuLimiter);

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/menu/:id
// @desc    Get a single menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid menu item ID format.' });
  }
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    console.error('Error fetching menu item:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Add other menu-related routes here later (e.g., POST /, PUT /:id, DELETE /:id)

module.exports = router;
