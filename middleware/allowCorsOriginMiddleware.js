const allowCorsOriginMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        return res.sendStatus(200);
    }
    next(); // Continue to the next middleware or route handler
}

module.exports = { allowCorsOriginMiddleware };