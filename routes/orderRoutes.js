// Import the Express framework
const express = require('express');

// Import the order controller functions
const { placeOrder, getOrders } = require('../controllers/orderController');

// Create a new Express router instance
const router = express.Router();

// Route to handle placing an order
// Handles POST requests to the root path ("/")
// Expects order details in the request body
router.post('/', placeOrder);

// Route to handle fetching all orders
// Handles GET requests to the root path ("/")
// Responds with a list of all orders in the database
router.get('/', getOrders);

// Export the router to be used in the main application or other modules
module.exports = router;
