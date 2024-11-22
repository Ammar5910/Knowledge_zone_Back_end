const collectionName = 'orders';

const createOrder = async (orderData) => {
    return await global.db.collection(collectionName).insertOne(orderData);
};

module.exports = { createOrder };
