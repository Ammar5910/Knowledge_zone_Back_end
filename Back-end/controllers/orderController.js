const { createOrder } = require('../models/orderModel');

const placeOrder = async (req, res) => {
    const orderData = req.body;

    try {
        await createOrder(orderData);
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

module.exports = { placeOrder };
