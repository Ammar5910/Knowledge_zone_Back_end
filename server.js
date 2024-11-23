require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const path = require("path");

const lessonRoutes = require('./routes/lessonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { loggerMiddleware } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


// Static Middleware for serving images
app.use("/static/images", express.static(path.join(__dirname, "public", "images")));

// Connect to Database
connectDB();

// Routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling for Missing Static Files
app.use("/static/images", (req, res) => {
    res.status(404).json({ error: "Image not found" });
  });
  
  // Default error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});