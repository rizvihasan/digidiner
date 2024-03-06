const express = require('express');
const pgPool = require('../db');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order (customer info + items)
// @access  Public
router.post('/', async (req, res) => {
  let { customerName, customerEmail, customerPhone, items, totalAmount } = req.body;

  // Normalize phone and email
  customerPhone = (customerPhone || '').replace(/\D/g, '');
  customerEmail = customerEmail ? customerEmail.trim().toLowerCase() : null;

  // Basic validation for required fields
  if (!customerName || !customerPhone || !items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'Missing required order data (customerName, customerPhone, items, totalAmount).' });
  }

  // Use a client from the pool for transaction safety
  const client = await pgPool.connect();

  try {
    // Start database transaction
    await client.query('BEGIN');

    // 1. Insert the main order details into the 'orders' table
    const orderInsertQuery = `
      INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING order_id;
    `;
    const orderValues = [customerName, customerEmail, customerPhone, totalAmount, 'pending']; // Default status is 'pending'
    const orderResult = await client.query(orderInsertQuery, orderValues);
    const newOrderId = orderResult.rows[0].order_id;

    // 2. Insert each item from the order into the 'order_items' table
    const itemInsertQuery = `
      INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, price_at_order)
      VALUES ($1, $2, $3, $4, $5);
    `;
    
    // Prepare and execute all item insert queries concurrently
    const itemInsertPromises = items.map(item => {
      const itemValues = [
        newOrderId,
        item._id,       // The MongoDB _id of the menu item
        item.name,      // Store name at time of order
        item.quantity,
        item.price      // Store price at time of order
      ];
      return client.query(itemInsertQuery, itemValues);
    });
    await Promise.all(itemInsertPromises);

    // If all inserts were successful, commit the transaction
    await client.query('COMMIT');

    res.status(201).json({ 
      message: 'Order created successfully!', 
      orderId: newOrderId // Return the new order ID to the client
    });

  } catch (err) {
    // If any error occurred during the transaction, roll it back
    await client.query('ROLLBACK');
    console.error('Error creating order (transaction rolled back):', err.stack);
    res.status(500).json({ message: 'Failed to create order due to a server error.' });
  } finally {
    // Always release the client back to the pool
    client.release();
  }
});

// @route   GET /api/orders/lookup
// @desc    Fetch orders by customer phone number or email
// @access  Public
router.get('/lookup', async (req, res) => {
  let { phone, email } = req.query;
  const client = await pgPool.connect();
  try {
    let ordersResult;
    if (phone) {
      phone = String(phone).replace(/\D/g, '');
      ordersResult = await client.query(
        `SELECT * FROM orders WHERE customer_phone = $1 ORDER BY created_at DESC`,
        [phone]
      );
    } else if (email) {
      email = String(email).trim().toLowerCase();
      ordersResult = await client.query(
        `SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC`,
        [email]
      );
    } else {
      return res.status(400).json({ message: 'Phone number or email is required.' });
    }
    const orders = Array.isArray(ordersResult.rows) ? ordersResult.rows : [];
    for (const order of orders) {
      const itemsResult = await client.query(
        `SELECT menu_item_id, menu_item_name, quantity, price_at_order 
         FROM order_items 
         WHERE order_id = $1`,
        [order.order_id]
      );
      order.items = itemsResult.rows;
    }
    return res.json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return res.status(500).json({ 
      message: 'Failed to fetch orders.',
      error: err.message 
    });
  } finally {
    client.release();
  }
});

// TODO: Add routes for getting orders (GET /, GET /:id)

module.exports = router;
