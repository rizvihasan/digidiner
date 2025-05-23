require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pgPool = require('./db');

const app = express();
app.set('trust proxy', 1); // Trust first proxy for correct rate limiting on Render/Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// --- Database Connections ---

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Verify PostgreSQL connection on startup
pgPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL Connection Error:', err.stack);
  } else {
    console.log('PostgreSQL Connected:', res.rows[0].now);
  }
}); 

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for frontend requests

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://digidiner.netlify.app'
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount the routers on their respective base paths
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Simple root route to check if the API is alive
app.get('/', (req, res) => {
  res.send('digidiner API is running!');
});

// Global error handler to always return JSON
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
