// Middleware function to log details of incoming HTTP requests
const loggerMiddleware = (req, res, next) => {
    // Log the HTTP method, request URL, and the current timestamp in ISO format
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Pass control to the next middleware or route handler in the stack
    next();
};

// Export the loggerMiddleware function for use in other parts of the application
module.exports = { loggerMiddleware };
