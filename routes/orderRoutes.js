// Import the Express framework
const express = require('express');

// Import the order controller function
const { placeOrder } = require('../controllers/orderController');

// Create a new Express router instance
const router = express.Router();

// Route to handle placing an order
// Handles POST requests to the root path ("/")
// Expects order details in the request body
router.post('/', placeOrder);

// Export the router to be used in the main application or other modules
module.exports = router;
