const express = require('express');
const router = express.Router();
const {
    getGeoData,
    createGeoData,
    getGeoDataById
} = require('../CONTROLLERS/geoDataController')

// Routes mapped to /api/geo-data
router.route('/')
    .get(getGeoData)
    .post(createGeoData)

router.route('/:id')
    .get(getGeoDataById);

module.exports = router