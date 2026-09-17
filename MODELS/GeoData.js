const mongoose = require('mongoose');

const getDataSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number
    },
    windspeed: {
        type: Number
    },
    recordedAt: {
        type: Data,
        default: Date.now
    },
});

module.exports = mongoose.model('GeoData', geoDataSchema);