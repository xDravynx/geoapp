const GeoData = require('../MODELS/GeoData');
const { fetchExternalGeoData } = require('../SERVICES/geoApiService');

/**
 * GET /api/geo-data
 * - If ?source=live: Fetches live data from the Open-Meteo API
 * - Default: Retrieves all stored documents from MongoDB with optional filters
 */
const getGeoData = async (req, res) => {
    try {
        const { source, latitude, longitude, locationName, startDate } = req.query;

        // Req 3a: Live external API fetch
        if (source === 'live'){
            if (!latitude || !longitude) {
                return res.status(400).json({ error: 'Both latitude and longitude query parameters are required.'})
            }

            const liveData = await fetchExternalGeoData(latitude, longitude);
            return res.status(200).json(liveData);
        }

        // Req 3c: Stored database data retrieval with filtering
            const dbQuery = {};
            if (locationName) {
                dbQuery.locationName = new RegExp(locationName, 'i');
            }
            if (startDate) {
                dbQuery.recordedAt = {$gte: new Date(startDate)}
            }
            const storedData = await GeoData.find(dbQuery);
            return res.status(200).json(storedData)
    } catch (error) {
        console.error('getGeoData error:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching geospatial data.'})
    }
};

/**
 * POST /api/geo-data
 * Saves geospatial data sent in the request body to MongoDB
 */

const createGeoData = async (req, res) => {
    try {
        const { locationName, latitude, longitude, temperature, windspeed } = req.body;

        if (!locationName || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                error: 'locationName, latitude, and longitude are required fields.'
            });
        }

        const newRecord = new GeoData({
            locationName,
            latitude,
            longitude,
            temperature,
            windspeed
        });

        const savedRecord = await newRecord.save();

        return res.status(201).json({
            message: 'Geospatial data saved successfully.',
            id: savedRecord._id
        });
    } catch (error) {
        console.error('createGeoData error:', error.message);
        return res.status(500).json({error: 'Failed to save geospatial record'})
    }
};

/**
 * GET /api/geo-data/:id
 * Retrieves a single stored doc by its MongoDB ObjectId
 */

const getGeoDataById = async (req, res) => {
    try {
        const record = await GeoData.findById(req.params.id)

        if (!record) {
            return res.status(404).json({
                error: 'No record found with that ID'
            })
        }

        return res.status(200).json(record);
    } catch (error) {
        console.error('getGeoDataById error:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json ({ error: 'Invalid MongoDB ID format.'})
        }

        return res.status(500).json({ error: 'An error occurred while retrieving the record.'})
    }
};

module.exports = {
    getGeoData,
    createGeoData,
    getGeoDataById
};