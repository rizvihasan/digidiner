const request = require('supertest');
const express = require('express');
const menuRoutes = require('../routes/menuRoutes');
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
let testMenuItemId;

const app = express();
app.use(express.json());
app.use('/api/menu', menuRoutes);

// Mock MongoDB connection for testing
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Insert a test menu item
  const testItem = await MenuItem.create({
    name: 'Test Dish',
    description: 'A test dish',
    price: 9.99,
    category: 'Starters',
    isVegetarian: true
  });
  testMenuItemId = testItem._id.toString();
});
afterAll(async () => {
  await MenuItem.deleteMany({ name: 'Test Dish' });
  await mongoose.connection.close();
});

describe('GET /api/menu', () => {
  it('should return an array of menu items', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/menu/:id', () => {
  it('should return 400 for invalid ID', async () => {
    const res = await request(app).get('/api/menu/invalidid');
    expect(res.statusCode).toBe(400);
  });
  it('should return 404 for non-existent valid ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/menu/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
  });
  it('should return the menu item for a valid ID', async () => {
    const res = await request(app).get(`/api/menu/${testMenuItemId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Test Dish');
  });
});
