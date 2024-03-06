const mongoose = require('mongoose');

// Defines the structure for menu items stored in MongoDB
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Menu item category is required'],
    trim: true,
    enum: [ // Allowed categories
      'Starters',
      'Soups',
      'Main Course - Veg',
      'Main Course - Non-Veg',
      'Breads',
      'Rice & Biryani',
      'Desserts',
      'Beverages',
    ],
  },
  imageUrl: {
    type: String,
    trim: true,
    // Expecting a URL, e.g., from a CDN or image hosting service
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  spiceLevel: {
    type: String,
    trim: true,
    enum: ['Mild', 'Medium', 'Spicy', null], // Use null if spice level isn't applicable
    default: null,
  },
  // Automatically add createdAt and updatedAt timestamps
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
