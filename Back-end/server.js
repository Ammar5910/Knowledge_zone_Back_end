require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');

const lessonRoutes = require('./routes/lessonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { loggerMiddleware } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);
app.use('/static', express.static('public')); // Serve static files

// Connect to Database
connectDB();

// Routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/orders', orderRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
