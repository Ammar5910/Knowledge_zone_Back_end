// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules and libraries
const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const { connectDB } = require('./config/db'); // Function to connect to the MongoDB database
const path = require("path"); // Module for working with file and directory paths

// Import route handlers
const lessonRoutes = require('./routes/lessonRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Import custom middleware
const { loggerMiddleware } = require('./middleware/logger');

// Create an Express application
const app = express();

// Set the port for the server to run on (default is 3000 if not specified in .env)
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Middleware for logging HTTP requests in development format
app.use(morgan('dev'));

// Custom middleware for logging details of each request
app.use(loggerMiddleware);

// Middleware to handle Cross-Origin Resource Sharing (CORS)
// Allows requests from any origin and enables specific HTTP methods and headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        return res.sendStatus(200);
    }
    next(); // Continue to the next middleware or route handler
});

// Middleware to serve static image files from the "public/images" directory
app.use("/static/images", express.static(path.join(__dirname, "public", "images")));

// Connect to the MongoDB database
connectDB();

// Define routes for the application
// Routes for lesson-related operations
app.use('/api/lessons', lessonRoutes);

// Routes for order-related operations
app.use('/api/orders', orderRoutes);

// Error handling for missing static image files
app.use("/static/images", (req, res) => {
    res.status(404).json({ error: "Image not found" });
});

// Default error handler for handling unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ error: "Something went wrong!" }); // Respond with a generic error message
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
