const { createOrder } = require('../models/orderModel');

const placeOrder = async (req, res) => {
    const {
        customer,
        lessons,
        paymentMethod
    } = req.body;

    if (!customer || !lessons || !paymentMethod) {
        return res.status(400).json({ error: "Invalid order details" });
    }

    try {
        await createOrder(customer, lessons, paymentMethod);
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

module.exports = { placeOrder };
