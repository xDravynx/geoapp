require('dotenv').config();
const express = require('express');
const connectDB = require('./server/CONFIG/db')
const apiLimiter = require('./server/MIDDLEWARE/rateLimiter')
const geoDataRoutes = require('./server/ROUTES/geoDataRoutes')


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json());

// Apply rate limiter to geo endpoints
app.use('/api/geo-data', apiLimiter);

// Mount router
app.use('/api/geo-data', geoDataRoutes);

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found.'});
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});