require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');

const lessonRoutes = require('./routes/lessonRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const PORT = process.env.PORT || 3000;


// Connect to Database
connectDB();


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
