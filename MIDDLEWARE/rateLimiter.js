const rateLimit = require('express-rate-limit');

// Limit each IP to 30 requests per 15-min window
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many requests from this IP. Please try again after 15 minutes.'
    }
});

module.exports = apiLimiter;