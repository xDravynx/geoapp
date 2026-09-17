require('dotenv').config();
const express = require('express');
const connectDB = require('./CONFIG/db')
const apiLimiter = require('./MIDDLEWARE/rateLimiter')
const geoDataRoutes = require('./ROUTES/geoDataRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json());

// Apply rate limiter to geo endpoints
app.use('/api/geodata', apiLimiter);

// Mount router
app.use('/api/geodata', geoDataRoutes);

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found.'});
})