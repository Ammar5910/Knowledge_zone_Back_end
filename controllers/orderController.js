// Import the createOrder function from the order model
const { createOrder } = require('../models/orderModel');

// Controller to handle placing an order
const placeOrder = async (req, res) => {
    // Destructure the necessary fields from the request body
    const {
        customer, // Customer details (e.g., name, contact information)
        lessons, // Array of lesson IDs or objects to be included in the order
        paymentMethod // Payment method (e.g., "credit card", "PayPal")
    } = req.body;

    // Validate the input: Ensure all required fields are present
    if (!customer || !lessons || !paymentMethod) {
        // If any field is missing, send a 400 Bad Request response with an error message
        return res.status(400).json({ error: "Invalid order details" });
    }

    try {
        // Call the createOrder function to save the order in the database
        await createOrder(customer, lessons, paymentMethod);

        // Respond with a 201 Created status and a success message
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        // Handle errors, such as database issues, and send a 500 Internal Server Error response
        res.status(500).json({ error: 'Failed to place order' });
    }
};

// Export the placeOrder controller to make it available for use in other parts of the application
module.exports = { placeOrder };
